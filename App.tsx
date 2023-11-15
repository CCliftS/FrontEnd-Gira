import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/types';

import LoginScreen from './src/screens/auth/LoginScreen';
import SignInScreen from './src/screens/auth/SignInScreen';
import RecoveryScreen from './src/screens/auth/RecoveryScreen';
import TeamsScreen from './src/screens/team/TeamsScreen';
import HomePage from './src/screens/home/HomePage';
import navbar from './src/screens/common/navbar';
import UserPage from './src/screens/user/UserPage'
import UserEdit from './src/screens/user/UserEdit';
import EditEmailPage from './src/screens/user/EditEmailPage';
import EditPassPage from './src/screens/user/EditPassPage';
import AddPage from './src/screens/home/AddPage';
import MyTeamsPage from './src/screens/team/MyTeamsPage';
import DataTeamPage from './src/screens/team/DataTeamPage';
import AddProject from './src/screens/project/AddProject';
import CreateProject from './src/screens/project/CreateProject';




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
        <RootStack.Screen name='Teams' component={TeamsScreen} />
        <RootStack.Screen name='HomePage' component={HomePage} />
        <RootStack.Screen name='navbar' component={navbar} />
        <RootStack.Screen name='UserPage' component={UserPage} />
        <RootStack.Screen name='EditEmailPage' component={EditEmailPage} />
        <RootStack.Screen name='EditPassPage' component={EditPassPage} />
        <RootStack.Screen name='AddPage' component={AddPage} />
        <RootStack.Screen name='MyTeamsPage' component={MyTeamsPage} />
        <RootStack.Screen name='DataTeamPage' component={DataTeamPage} />
        <RootStack.Screen name='UserEdit' component={UserEdit} />
        <RootStack.Screen name='AddProject' component={AddProject} />
        <RootStack.Screen name='CreateProject' component={CreateProject} />
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



