import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <SignInScreen></SignInScreen>
    </View>
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
