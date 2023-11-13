import { useState } from 'react';
import { View, StyleSheet, TextInput, Image, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { SignInScreenProps } from '../../../types/types';
import { ENDPOINT_MS_USER } from 'react-native-dotenv';
import styleGeneral from '../../public/styles/StyleGeneral';

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  const handleRegister = async (
    email: string,
    password: string,
    name: string,
    lastName: string
  ) => {
    setIsButtonDisabled(true);
    setError(false);

    try {
      const response = await axios.post(`http://10.0.2.2:3000/auth/singIn`, {
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
    finally {
      setIsButtonDisabled(false);
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
      <View style={styleGeneral.boxContainer}>
        <Image
          source={require('../../public/icons/gira_logo.png')}
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
            disabled={isButtonDisabled}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#44749d',
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebe8e8',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 30,
    padding: 16,
    color: 'gray',
    fontWeight: 'bold',
  },
  input: {
    width: 240,
    marginBottom: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#F3f3f3',
    borderRadius: 2,
  },
  link: {
    marginTop: 16,
    color: 'blue',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#d9bf56',
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