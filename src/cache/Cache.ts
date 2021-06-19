import AsyncStorage from '@react-native-async-storage/async-storage'
import {IProduct, IProductBase} from '../restaurantview/product'

interface IFavorites {
  products: number[]
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
    if (Object.keys(this.cache).length === 0) {
      await this.loadCachedValues()
    }

    return this.cache[key] as T
  }

  async saveCachedValues() {
    await this.saveFav()
  }

  async loadCachedValues() {
    let favorites = await AsyncStorage.getItem('favorites')
    this.registerCachedValue('favorites', favorites === null ? "{\"products\":[]}" : favorites)

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
  public async addFav(product: IProductBase) {
    (await this.getFavProducts()).push(product.id)
    await this.saveFav()
  }

  public async removeFav(product: IProductBase){
    let array = await this.getFavProducts()
    let index = array.indexOf(product.id)
    if(index > -1)
    {
      array.splice(index, 1)
    }
  }

  public async getFavProducts(){
    return (await this.getCachedItems<IFavorites>('favorites')).products
  }

  public async isFav(product: IProductBase){
    if((await this.getFavProducts()).indexOf(product.id) !== -1){
      return true
    }
    return false
  }
  //#endregion

  private constructor() {}
}
