import React from 'react'
import {FlatList} from 'react-native'
import {IconListItem} from './IconListItem'

export interface IHorizontalIconListProps {
  items : any
}
export interface IHorizontalIconListState{
  items : any
}

export class HorizontalIconList extends React.Component<
  IHorizontalIconListProps,
  IHorizontalIconListState
> {
  constructor(props: IHorizontalIconListProps) {
    super(props)
    this.state ={
      items:[
        {
          id: "0",
          image: require('../../assets/burger.png')
        },
        {
          id: "1",
          image: require('../../assets/pizza.png')
        },
        {
          id: "2",
          image: require('../../assets/salad.png')
        },
        {
          id: "3",
          image: require('../../assets/soda.png')
        },
        {
          id: "4",
          image: require('../../assets/summer.png')
        }
      ]
    } 
  }


  
  render() {
    return (
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={this.state.items}
        renderItem={({item}) => <IconListItem item={item} />}
      />
    )
  }
}
