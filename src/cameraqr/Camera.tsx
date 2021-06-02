import React from 'react'

import {BarCodeReadEvent} from 'react-native-camera'
import QRCodeScanner from 'react-native-qrcode-scanner'
import {decoder} from '../docoder/Decoder'
import database from '@react-native-firebase/database'
import {StyleSheet} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParamList} from '../../App'
import {IProduct} from '../restaurantview/product'
import {RouteProp} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface ICameraProps {
  codescanner?:
    | string
    | ((instance: QRCodeScanner | null) => void)
    | React.RefObject<QRCodeScanner>
    | null
    | undefined
}

type CameraScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Camera'
>
type CameraScreenRouteProp = RouteProp<RootStackParamList, 'Camera'>

type CameraProps = {
  route: CameraScreenRouteProp
  navigation: CameraScreenNavigationProp
}

export default class Camera extends React.Component<CameraProps, {}> {
  constructor(props: CameraProps) {
    super(props)
    decoder.encode()
  }

  reactivate(){
    if (this.props.route.params.codescanner instanceof QRCodeScanner) {
      this.props.route.params.codescanner.reactivate()
    }
  }

  async onSuccess(e: BarCodeReadEvent) {
    let res = decoder.decode(e.data)

    if (res === undefined) {
      this.reactivate()
      return
    }

    let restaurant = `restaurants/${res.restaurantID}/${res.menuID}`

    // cache it
    let storage = await AsyncStorage.getItem(restaurant)

    if (storage !== null) {
      let storagedata = JSON.parse(storage)
      if (
        new Date().getUTCSeconds() - (storagedata['time'] as number) >
        86400
      ) {
        if (storagedata !== undefined) {
          delete storagedata.time
          this.props.navigation?.navigate('Home', {
            data: this.getDataFromSnapshot(storagedata)
          })
          this.reactivate()
          return // so if something happens, don't continue
        }
      }
    }

    let ref = database().ref(restaurant)

    let data: IProduct[] = []

    ref.on(
      'value',
      async (snapshot) => {
        let json = snapshot.toJSON()
        if (json !== null) {
          ;(json as any)['time'] = new Date().getUTCSeconds()
          await AsyncStorage.setItem(restaurant, JSON.stringify(json))
        }
        data = this.getDataFromSnapshot(json)
        this.props.navigation?.navigate('Home', {data: data})
        this.reactivate()
      },
      (error: any) => {
        data = []
      }
    )
  }

  getDataFromSnapshot(json: any): IProduct[] {
    let result: IProduct[] = []

    if (json === null) {
      return result
    }

    Object.keys(json).forEach((key) => {
      let value: IProduct = this.convertObjectToIProduct(json[key])
      result.push(value)
    })

    return result
  }

  convertObjectToIProduct(obj: any): IProduct {
    return {
      name: obj.name,
      description: obj.description,
      price: obj.price,
      ingredients: obj.ingredients,
      photoid: obj.photoid,
      id: obj.id ? obj.id : 0
    }
  }

  onError(e: BarCodeReadEvent) {}

  render() {
    return (
      <QRCodeScanner
        ref={this.props.route.params.codescanner}
        onRead={this.onSuccess.bind(this)}
        fadeIn={false}
        reactivateTimeout={1000}
        topViewStyle={this.styles.top}
        bottomViewStyle={this.styles.top}
        showMarker={true}
      />
    )
  }

  styles = StyleSheet.create({
    top: {
      backgroundColor: '#454545',
      marginLeft: 0,
      flex: 1,
      paddingRight: 0,
      width: '100%'
    }
  })
}
