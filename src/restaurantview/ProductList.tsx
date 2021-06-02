import React from 'react'
import {FlatList, View, Text, StyleSheet} from 'react-native'
import {Product} from './Product'

export interface IProductList {
  items: any
}

export class ProductList extends React.Component<IProductList, {}> {
  constructor(props: IProductList) {
    super(props)
  }

  render() {
    return (
      <View style={this.styles.container}>
        {this.props.items.map((item: any, key: any) => (
          <View style={{width: '49%'}} key={item.id}>
            <Product {...item} />
          </View>
        ))}
      </View>
    )
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  })
}
