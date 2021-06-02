import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Cache} from '../cache/Cache'

export interface IProduct {
  name: string
  price: number
  // image: string
  description: string
  ingredients: {[key: string]: string}
  photoid: number
  id: number
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

  async componentDidMount() {}

  addToFav() {
    this.state.favorited
      ? Cache.getInstance().removeFav(this.props)
      : Cache.getInstance().addFav(this.props)

    this.setState({favorited: !this.state.favorited})
  }

  render() {
    return (
      <TouchableOpacity style={this.styles.container}>
        <View style={this.styles.innerContainer}>
          <View style={this.styles.image}>
            <View style={this.styles.containerCircle}>
              {/* <Image
                style={this.styles.innerContainerCircle}
                source={this.props.image}
              /> */}
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text style={this.styles.title}>{this.props.name}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={this.styles.subtitle}>{this.props.description}</Text>
          </View>
          <View style={this.styles.bottom}>
            <Text style={this.styles.price}>{this.props.price}</Text>
            <TouchableOpacity onPress={this.addToFav.bind(this)}>
              <Icon name="heart-o" size={20} color={this.state.favorited ? 'pink' : 'white'} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  styles = StyleSheet.create({
    containerCircle: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      shadowColor: 'black',
      padding: 10
    },
    innerContainerCircle: {
      width: 120,
      height: 120,
      borderRadius: 120 / 2
    },

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
      flex: 1,
      fontSize: 20,
      fontWeight: 'bold'
    },
    subtitle: {
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
    fav:{
      color: 'pink'
    }
  })
}
