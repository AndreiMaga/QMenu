import {FirebaseDatabaseTypes} from '@react-native-firebase/database'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {RootStackParamList} from '../../App'
import {HorizontalIconList} from './HorizontalIconList'
import {IProductBase} from './product'
import {ProductList} from './ProductList'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>

export interface IHomeProps {
  data: IProductBase[]
}

type HomeProps = {
  route: HomeScreenRouteProp
  navigation: HomeScreenNavigationProp
}

interface IHomeState {
  loading: boolean
  items: IProductBase[]
  modalVisible: boolean
  modalItem: IProductBase | null
}

export class Home extends React.Component<HomeProps, IHomeState> {
  constructor(props: HomeProps) {
    super(props)
    this.state = {
      loading: false,
      items: this.props.route.params.data,
      modalVisible: false,
      modalItem: null
    }
  }

  componentDidMount() {}

  render() {
    return this.state.loading ? (
      <ActivityIndicator />
    ) : (
      <ScrollView style={this.styles.container}>
        <Modal
          animationType="slide"
          style={this.styles.modal}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({
              modalVisible: !this.state.modalVisible
            })
          }}>
          <TouchableOpacity onPress={this.closeModal.bind(this)}>
            <Text style={this.styles.close}>✖</Text>
          </TouchableOpacity>
{
  this.renderIngredients()
}
        </Modal>
        <View style={this.styles.topBar}></View>
        <View style={this.styles.titleContainer}>
          <Text style={this.styles.subtitle}>{this.getSubtitleText()}</Text>
        </View>

        <View>
          <HorizontalIconList items={this.state.items} />
        </View>
        <Text style={this.styles.subtitle}>Recommended</Text>
        <View style={this.styles.container}>
          <ProductList
            items={this.state.items}
            openModalCallback={this.openModal.bind(this)}
          />
        </View>
      </ScrollView>
    )
  }

  toTitleCase(str:string) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  renderIngredients(){
    if(this.state.modalItem?.ingredients === undefined){
      return
    }
    let items: any[] = []
    Object.keys(this.state.modalItem?.ingredients).forEach((key,index) =>{
      items.push({id: index * 2, name: this.toTitleCase(key)})
      let value = this.state.modalItem?.ingredients[key]
      items.push({id: index * 2 + 1, name: value})
    });


    return(
      <FlatList
        data={items}
        numColumns= {2}
        renderItem={({item}) => <View style={this.styles.item}>
          <Text >{item.name}</Text>
          </View>}
        keyExtractor={item => item.id}
      />
    )
  }

  openModal(product: IProductBase) {
    this.setState({
      modalVisible: true,
      modalItem: product
    })
  }
  closeModal() {
    this.setState({
      modalVisible: false,
      modalItem: null
    })
  }

  getSubtitleText(): string {
    let time = new Date().getHours()
    return `What do you want for ${this.getMealText(time)}?`
  }

  getMealText(time: number) {
    if (time <= 10) {
      return 'breakfast'
    }
    if (time <= 15) {
      return 'lunch'
    }
    if (time <= 24) {
      return 'dinner'
    }
  }

  styles = StyleSheet.create({
    modal: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '75%',
      height: '60%',
      backgroundColor: '#f5f5f5'
    },
    item: {
      padding: 12,
      marginVertical: 8,
      marginHorizontal: 16,
      textAlign: "center",
      justifyContent: "center",
      flex: 1,
      alignContent: "center"
    },
    close: {
      color: '#c0c5cb',
      alignSelf: 'flex-end',
      backgroundColor: 'transparent'
    },
    cookiesContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
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
      fontSize: 20,
      marginStart: 15,
      width: '70%',
      fontWeight: 'bold'
    },
    profile: {
      justifyContent: 'flex-end'
    }
  })
}
