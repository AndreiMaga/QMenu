import React from 'react'
import {FlatList} from 'react-native'
import {IconListItem} from './IconListItem'

export interface IHorizontalIconListProps {
  items: any
}

export class HorizontalIconList extends React.Component<
  IHorizontalIconListProps,
  {}
> {
  constructor(props: IHorizontalIconListProps) {
    super(props)
  }

  render() {
    return (
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={this.props.items}
        renderItem={({item}) => <IconListItem item={item} />}
      />
    )
  }
}
