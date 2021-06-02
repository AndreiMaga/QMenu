import AsyncStorage from '@react-native-async-storage/async-storage'
import {IProduct} from '../restaurantview/product'

interface IFavorites {
  products: IProduct[]
}

interface ICachedItem extends Partial<IFavorites> {}

export class Cache {
  cache: {[key: string]: ICachedItem} = {}

  private static cacheInstance: Cache | undefined

  public static getInstance(): Cache {
    if (Cache.cacheInstance === undefined) {
      Cache.cacheInstance = new Cache()
    }
    return Cache.cacheInstance
  }

  public async getCachedItems<T>(key: string) {
    if (this.cache === {}) {
      await this.loadCachedValues()
    }

    return this.cache[key] as T
  }

  async saveCachedValues() {
    await this.saveFav()
  }

  async loadCachedValues() {
    let favorites = await AsyncStorage.getItem('favorites')
    if (favorites !== null) {
      this.registerCachedValue('favorites', favorites)
    }
  }

  private registerCachedValue(key: string, value: string) {
    this.cache[key] = JSON.parse(value)
  }

  //#region favorites
  async saveFav() {
    await AsyncStorage.setItem(
      'favorites',
      JSON.stringify(this.cache['favorites'])
    )
  }
  public async addFav(product: IProduct) {
    (await this.getFavProducts()).push(product)
    await this.saveFav()
  }

  public async removeFav(product: IProduct){
    let array = await this.getFavProducts()
    let index = array.indexOf(product)
    if(index > -1)
    {
      array.splice(index, 1)
    }
  }

  public async getFavProducts(){
    return (await this.getCachedItems<IFavorites>('favorites')).products
  }
  //#endregion

  private constructor() {}
}
