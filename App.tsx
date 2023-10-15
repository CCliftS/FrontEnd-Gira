import { StyleSheet} from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import SignInScreen from './src/screens/SignInScreen';
import RecoveryScreen from './src/screens/RecoveryScreen';
import ChangePassScreen from './src/screens/ChangePassScreen';
import RecoveryCodeScreen from './src/screens/RecoveryCodeScreen';
import TeamsScreen from './src/screens/TeamsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/types';



const RootStack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={
       {
        headerStyle:{
          backgroundColor:'transparent'
        },
        headerTransparent: true,
        headerTitle: '',
       }
      } initialRouteName='Login'>
        <RootStack.Screen name='Login' component={LoginScreen}/>
        <RootStack.Screen name='SignIn' component={SignInScreen}/>
        <RootStack.Screen name='Recovery' component={RecoveryScreen}/>
        <RootStack.Screen name='RecoveryCode' component={RecoveryCodeScreen}/>
        <RootStack.Screen name='ChangePass' component={ChangePassScreen}/>
        <RootStack.Screen name='Teams' component={TeamsScreen}/>
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



