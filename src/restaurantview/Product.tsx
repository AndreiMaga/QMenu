import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Cache} from '../cache/Cache'
import {images} from './Images'
export interface IProductBase{
  name: string
  price: number
  // image: string
  description: string
  ingredients: {[key: string]: string}
  photoid: number
  id: number
}

export interface IProduct {
  product: IProductBase
  openModalCallback?: (product: IProductBase) => void
}



interface IProductState {
  favorited: boolean
}

export class Product extends React.Component<IProduct, IProductState> {
  constructor(props: IProduct) {
    super(props)
    this.state = {
      favorited: false
    }
  }

  async componentDidMount() {
    let fav = await Cache.getInstance().isFav(this.props.product)
    this.setState({favorited: fav})
  }

  addToFav() {
    this.state.favorited
      ? Cache.getInstance().removeFav(this.props.product)
      : Cache.getInstance().addFav(this.props.product)

    this.setState({favorited: !this.state.favorited})
  }

  onPressProduct(){
    if(this.props.openModalCallback)
      this.props.openModalCallback(this.props.product)
  }

  

  render() {
    return (
      <TouchableOpacity style={this.styles.container} onPress={this.onPressProduct.bind(this)}>
        <View style={this.styles.innerContainer}>
          <View style={this.styles.image}>
            <View style={this.styles.circlecontainer}>
              <Image
                style={this.styles.circleinnerContainer}
                source={images[this.props.product.photoid - 1]}
              />
            </View>
          </View>

          <View style={{flex: 1}}>
            <Text style={this.styles.title}>{this.props.product.name}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={this.styles.subtitle}>{this.props.product.description}</Text>
          </View>
          <View style={this.styles.bottom}>
            <Text style={this.styles.price}>${this.props.product.price}</Text>
            <TouchableOpacity onPress={this.addToFav.bind(this)}>
              <Icon
                name="heart"
                size={20}
                color={this.state.favorited ? 'pink' : 'black'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  styles = StyleSheet.create({
    container: {
      flex: 1,
      shadowColor: 'black',
      padding: 10
    },
    innerContainer: {
      flex: 1,
      borderWidth: 1,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      backgroundColor: 'white',
      borderColor: '#ddd',
      borderBottomWidth: 2,
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.9,
      shadowRadius: 10,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '100%'
    },
    image: {
      flex: 2,
      padding: 5
    },
    title: {
      textAlign: 'center',
      flex: 1,
      fontSize: 20,
      fontWeight: 'bold',
      justifyContent: 'center',
      alignContent: 'center'
    },
    subtitle: {
      textAlign: 'center',
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      fontSize: 15
    },
    bottom: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      padding: 20,
      width: '100%'
    },
    price: {
      fontSize: 15,
      fontWeight: 'bold'
    },
    circlecontainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      shadowColor: 'black',
      padding: 10
    },
    circleinnerContainer: {
      width: 120,
      height: 120,
      borderRadius: 120 / 2
    }
  })
}
