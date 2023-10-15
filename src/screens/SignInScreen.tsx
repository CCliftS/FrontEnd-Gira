import { useState } from 'react';
import { View, StyleSheet, TextInput, Image, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { SignInScreenProps } from '../../types/types';
import { ENDPOINT_MS_USER } from 'react-native-dotenv';

const SignInScreen: React.FC <SignInScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleRegister = async (
    email: string,
    password: string,
    name: string,
    lastName: string
  ) => {
    setError(false);

    try {
      const response = await axios.post(`${ENDPOINT_MS_USER}//auth/singIn`, {
        email,
        password,
        name,
        lastName,
      });
      navigation.navigate('Login');
    } catch (e: any) {
      setError(true);
      setErrorMessage(e?.response?.data?.message);
      twoOptionAlertHandler();
    }
  };

  const twoOptionAlertHandler = () => {
    //function to make two option alert
    Alert.alert(
      //title
      'Alerta!',
      //body
      'Registro Incorrecto',
      [
        { text: 'Reintentar', onPress: () => navigation.navigate('SignIn') },
        {
          text: 'Iniciar Sesión',
          onPress: () => navigation.navigate('Login'),
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
        source={require('./../public/gira.png')}
        style={styles.logo}
      />
      <View style={styles.container2}>
        <Text style={styles.title}>Registro</Text>
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
        <TextInput
          placeholder="Nombre"
          value={name}
          onChangeText={(text: string) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Apellido"
          value={lastname}
          onChangeText={(text: string) => setLastname(text)}
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.button]}
          onPress={() => handleRegister(email, password, name, lastname)}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate("Login")} style={styles.link}>
          Ya tienes una cuenta? Inicia Sesión.
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
    backgroundColor: '#0747a6',
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
  },
  logo: {
    width: 150, // Ajusta el tamaño de la imagen según tus necesidades
    height: 150, // Ajusta el tamaño de la imagen según tus necesidades
    marginBottom: 16,
  },
});

export default SignInScreen;