import React from 'react'
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native'

export interface IIconListItemProps {
  item: any
}

export class IconListItem extends React.Component<IIconListItemProps, {}> {
  constructor(props: IIconListItemProps) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity style={this.styles.container}>
        <View style={this.styles.innerContainer}>
          <Image source={this.props.item.image} style={this.styles.image} />
        </View>
      </TouchableOpacity>
    )
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10
    },
    innerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingStart: 20,
      paddingEnd: 20,
      paddingTop: 10,
      paddingBottom: 10,

      borderRadius: 60 / 2,
      borderWidth: 1,
      borderColor: '#ddd',
      borderBottomWidth: 2,
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.9,
      shadowRadius: 10
    },
    image: {
      width: 50,
      height: 25,
      resizeMode: 'contain'
    }
  })
}
