import React from 'react'
import 'react-native-gesture-handler'
import CameraPermission from './src/cameraqr/CameraPermission'
import Camera, {ICameraProps} from './src/cameraqr/Camera'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Home, IHomeProps} from './src/restaurantview/Home'

export const Stack = createStackNavigator()

export type RootStackParamList = {
  CameraPermission: undefined
  Camera: ICameraProps
  Home: IHomeProps
}

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CameraPermission"
            component={CameraPermission}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Camera"
            component={Camera}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
