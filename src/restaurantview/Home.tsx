import {FirebaseDatabaseTypes} from '@react-native-firebase/database'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {RootStackParamList} from '../../App'
import {HorizontalIconList} from './HorizontalIconList'
import {IProduct} from './product'
import {ProductList} from './ProductList'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>

export interface IHomeProps {
  data: IProduct[]
}

type HomeProps = {
  route: HomeScreenRouteProp
  navigation: HomeScreenNavigationProp
}

interface IHomeState {
  loading: boolean
  item?: IProduct | undefined
}

export class Home extends React.Component<HomeProps, IHomeState> {
  constructor(props: HomeProps) {
    super(props)
    this.state = {
      loading: false,
      item: this.props.route.params.data[0]
    }
  }

  componentDidMount() {}

  render() {
    return this.state.loading ? (
      <ActivityIndicator />
    ) : (
      <ScrollView style={this.styles.container}>
        <View style={this.styles.topBar}></View>
        <View style={this.styles.titleContainer}>
          <Text style={this.styles.subtitle}>{this.getSubtitleText()}</Text>
        </View>
        {/* <View>
          <HorizontalIconList items={[this.state.item]} />
        </View> */}
        <Text style={this.styles.subtitle}>Recommended</Text>
        <View style={this.styles.container}>
          <ProductList items={[this.state.item]} />
        </View>
      </ScrollView>
    )
  }

  getSubtitleText():string{
    let time = new Date().getHours()
    return `What do you want for ${this.getMealText(time)}?`
  }

  getMealText(time: number){
    if(time <= 10)
    {
      return 'breakfast'
    }
    if(time <= 15)
    {
      return 'lunch'
    }
    if(time <= 24)
    {
      return 'dinner'
    }
  }

  styles = StyleSheet.create({
    container: {
      flex: 1
    },
    topBar: {
      flexDirection: 'row',
      padding: 10,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    titleContainer: {
      fontSize: 26,
      padding: 10,
      justifyContent: 'flex-start',
      alignSelf: 'flex-start'
    },
    subtitle: {
      fontSize: 25,
      marginStart: 15,
      width: '70%',
      fontWeight: 'bold'
    },
    profile: {
      justifyContent: 'flex-end'
    }
  })
}
