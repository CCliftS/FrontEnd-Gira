import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }: any) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (email: string, password: string) => {
    setError(false);
    try {
      const response = await axios.post('http://10.0.2.2:3000/auth/Login', {
        email,
        password,
      });
      navigation.navigate("Teams")

    }
    catch (e: any) {
      setError(true);
      setErrorMessage(e?.response?.data?.message);
      twoOptionAlertHandler();
    }
  }

  const twoOptionAlertHandler = () => {
    //function to make two option alert
    Alert.alert(
      //title
      'Alerta!',
      //body
      'No se ha podido ingresar',
      [
        { text: 'Reintentar', onPress: () => navigation.navigate('Login') },
        {
          text: 'Crear Cuenta',
          onPress: () => navigation.navigate('SignIn'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./../public/gira_logo.png')}
        style={styles.logo}
      />
      <View style={styles.container2}>
        <Text style={styles.title}>Bienvenido a Gira</Text>
        <TextInput
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity onPress={() => handleLogin(email, password)} style={[styles.button]} >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate("SignIn")} style={styles.link}>
          ¿No tienes una cuenta? Regístrate aquí.
        </Text>
        <Text onPress={() => navigation.navigate("Recovery")} style={styles.link}>
          Olvide mi contraseña.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0747a6'
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    padding: 16,
    color: '#85828a',
  },
  input: {
    width: 240,
    marginBottom: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#F3f3f3',
    borderRadius: 2,
  },
  logo: {
    width: 150, // Ajusta el tamaño de la imagen según tus necesidades
    height: 150, // Ajusta el tamaño de la imagen según tus necesidades
    marginBottom: 16,
  },
  link: {
    marginTop: 16,
    color: 'blue',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0052cc',
    borderRadius: 15,
    alignItems: 'center',
    height: 40,
    width: 150,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 20,
  }
});


export default LoginScreen;