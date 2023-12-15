import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import axios from 'axios';
import { LoginScreenProps } from '../../../types/types';
import styleGeneral from '../../public/styles/StyleGeneral';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styleBox from '../../public/styles/styleBox';
import { Feather, Fontisto, MaterialIcons } from '@expo/vector-icons';
import styleText from '../../public/styles/styleText';


const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsButtonDisabled(true); // Deshabilita el botón al inicio
    try {
      const response = await axios.post(`http://10.0.2.2:3000/auth/Login`, {
        email,
        password,
      });
      await AsyncStorage.setItem('email', email);
      navigation.navigate("HomePage");
    } catch (error) {
      setError("Correo o contraseña incorrectos");
      setModalVisible(true);
    } finally {
      setIsButtonDisabled(false); // Habilita el botón después de que la operación esté completa
    }
  };



  return (
    <View style={[styleBox.containerPage, { alignItems: 'center', justifyContent: 'center' }]}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
      >
        <View style={styleBox.modalCenter}>
          <View style={styleBox.modalError}>
            <Feather name="alert-triangle" size={54} color="#da1a29" />
            <Text style={styleText.titleOne}>{error}</Text>
            <TouchableOpacity style={styleBox.botonDelete} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styleText.confirmEdit}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Fontisto name="jira" size={134} color="#f5f5f5" style={{ marginBottom: 20 }} />
      <View style={styleBox.boxHome}>
        <Text style={styleText.textHome}>Bienvenido a Jira</Text>
        <View style={styleBox.infoBoton}>
          <TextInput
            placeholder="Correo Electrónico"
            value={email}
            onChangeText={(text: string) => setEmail(text)}
          />
        </View>
        <View style={styleBox.infoBoton}>
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          disabled={isButtonDisabled}
          onPress={() => handleLogin(email, password)}
          style={styleBox.botonEdit}
        >
          <Text style={styleText.titleOne}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate("SignIn")} style={[styleText.titleTwo, { marginTop: 15 }]}>
          ¿No tienes una cuenta? Regístrate aquí.
        </Text>
        <Text onPress={() => navigation.navigate("Recovery")} style={[styleText.titleTwo, { marginTop: 15 }]}>
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
    backgroundColor: '#44749d'
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
  }
});


export default LoginScreen;

