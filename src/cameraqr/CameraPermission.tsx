import AsyncStorage from '@react-native-async-storage/async-storage'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {PermissionsAndroid} from 'react-native'
import {ActivityIndicator, TouchableOpacity} from 'react-native'
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native'
import {RootStackParamList} from '../../App'
import Icon from 'react-native-vector-icons/FontAwesome'

interface ICameraPermissionState {
  firstTime: boolean
  loading: boolean
  cameraGranted: boolean
}

type CameraPermissionProps = StackNavigationProp<
  RootStackParamList,
  'CameraPermission'
>

export interface INavigationProps {
  navigation: CameraPermissionProps
}

export default class CameraPermission extends React.Component<
  INavigationProps,
  ICameraPermissionState
> {
  constructor(props: INavigationProps) {
    super(props) // force super call

    this.state = {
      firstTime: true,
      loading: true,
      cameraGranted: false
    }
  }

  switchView() {
    this.props.navigation.navigate('Camera', {})
  }

  async componentDidMount() {
    const firstTime = await AsyncStorage.getItem('isFirstTime')

    this.setState({loading: false, firstTime: firstTime != null ? true : false})
    if (firstTime == null) {
      await AsyncStorage.setItem('isFirstTime', 'true')
    } else {
      // check camera
      const cameraGranted = await AsyncStorage.getItem('cameraGranted')
      if (cameraGranted != null && cameraGranted === 'true') {
        // switch to the other view
        this.switchView()
      }
    }
  }

  async requestCamera() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'QMenu Camera Permission',
          message:
            'QMenu needs to access the camera so it can read the QRCodes',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await AsyncStorage.setItem('cameraGranted', 'true')
        this.setState({
          cameraGranted: true
        })
        this.switchView()
      } else {
        await AsyncStorage.setItem('cameraGranted', 'false')
        this.setState({
          cameraGranted: false
        })
      }
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    return this.state.loading ? (
      <ActivityIndicator />
    ) : (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.sliderContainerStyle}>
            <View style={styles.slider}>
              <Image
                style={styles.image}
                source={require('../../assets/start.png')}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>A new way to see menus</Text>
          <Text style={styles.subtitle}>
            Press the button when you're ready.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this.requestCamera.bind(this)}>
            <Icon color="#fff" size={25} name={'chevron-right'} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    flex: 1.5,
    flexDirection: 'row',
    alignSelf: 'center',
    overflow: 'hidden',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 1.7,
    backgroundColor: '#E6E6E6'
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sliderContainerStyle: {
    borderRadius: Dimensions.get('window').width,
    width: Dimensions.get('window').width * 2,
    height: Dimensions.get('window').width * 2,
    marginLeft: -(Dimensions.get('window').width / 2),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: '#454545',
    elevation: 5
  },
  slider: {
    width: '100%',
    height: Dimensions.get('window').width / 1.1,
    position: 'absolute',
    bottom: 0,
    marginLeft: Dimensions.get('window').width / 2,
    padding: 10
  },
  image: {
    width: '50%',
    height: '100%'
  },
  title: {
    paddingTop: 40,
    width: '70%',
    fontSize: 25,
    fontWeight: 'bold',
    flex: 1
  },
  subtitle: {
    width: '70%',
    fontSize: 15,
    flex: 1
  },
  button: {
    backgroundColor: '#454545',
    borderRadius: 100,
    width: '16%',
    height: '80%',
    flex: 1,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
