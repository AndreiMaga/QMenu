import React from 'react'
import {View, StyleSheet} from 'react-native'
import {IProductBase, Product} from './Product'

export interface IProductList {
  items: IProductBase[],
  openModalCallback: (product: IProductBase) => void
}

export class ProductList extends React.Component<IProductList, {}> {
  constructor(props: IProductList) {
    super(props)
  }

  render() {
    return (
      <View style={this.styles.container}>
        {this.props.items.map((item: IProductBase, key: any) => (
          <View style={{width: '49%'}} key={item.id}>
            <Product product={item} openModalCallback={this.props.openModalCallback} />
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
