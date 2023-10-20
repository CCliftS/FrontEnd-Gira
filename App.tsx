import { StyleSheet } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import SignInScreen from './src/screens/SignInScreen';
import RecoveryScreen from './src/screens/RecoveryScreen';
import ChangePassScreen from './src/screens/ChangePassScreen';
import RecoveryCodeScreen from './src/screens/RecoveryCodeScreen';
import TeamsScreen from './src/screens/TeamsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/types';
import HomePage from './src/screens/HomePage';
import navbar from './src/screens/navbar';
import UserPage from './src/screens/UserPage'
import UserEdit from './src/screens/UserEdit';
import EditEmailPage from './src/screens/EditEmailPage';
import EditPassPage from './src/screens/EditPassPage';
import AddPage from './src/screens/AddPage';
import MyTeamsPage from './src/screens/MyTeamsPage';
import DataTeamPage from './src/screens/DataTeamPage';




const RootStack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={
        {
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: 'transparent'
          },
          headerTransparent: true,
          headerTitle: '',
        }
      } initialRouteName='Login'>
        <RootStack.Screen name='Login' component={LoginScreen} />
        <RootStack.Screen name='SignIn' component={SignInScreen} />
        <RootStack.Screen name='Recovery' component={RecoveryScreen} />
        <RootStack.Screen name='RecoveryCode' component={RecoveryCodeScreen} />
        <RootStack.Screen name='ChangePass' component={ChangePassScreen} />
        <RootStack.Screen name='Teams' component={TeamsScreen} />
        <RootStack.Screen name='HomePage' component={HomePage} />
        <RootStack.Screen name='navbar' component={navbar} />
        <RootStack.Screen name='UserPage' component={UserPage} />
        <RootStack.Screen name='EditEmailPage' component={EditEmailPage} />
        <RootStack.Screen name='EditPassPage' component={EditPassPage} />
        <RootStack.Screen name='AddPage' component={AddPage} />
        <RootStack.Screen name='UserEdit' component={UserEdit} />
        <RootStack.Screen name='MyTeamsPage' component={MyTeamsPage} />
        <RootStack.Screen name='DataTeamPage' component={DataTeamPage} />
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



