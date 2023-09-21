import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import SignInScreen from './src/screens/SignInScreen';
import RecoveryScreen from './src/screens/RecoveryScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName='Login'>
        <RootStack.Screen name='Login' component={LoginScreen}/>
        <RootStack.Screen name='SignIn' component={SignInScreen}/>
        <RootStack.Screen name='Recovery' component={RecoveryScreen}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
