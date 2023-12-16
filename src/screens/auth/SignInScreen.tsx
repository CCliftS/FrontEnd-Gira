import { useState } from 'react';
import { View, StyleSheet, TextInput, Image, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import axios from 'axios';
import { SignInScreenProps } from '../../../types/types';
import { ENDPOINT_MS_USER } from 'react-native-dotenv';
import styleBox from '../../public/styles/styleBox';
import { Feather, Fontisto } from '@expo/vector-icons';
import styleText from '../../public/styles/styleText';

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleRegister = async (
    email: string,
    password: string,
    name: string,
    lastName: string
  ) => {
    setIsButtonDisabled(true);

    try {
      const response = await axios.post(`${ENDPOINT_MS_USER}/auth/singIn`, {
        email,
        password,
        name,
        lastName,
      });
      navigation.navigate('Login');
    } catch (error) {
      setError('Error al registrar');
      setModalVisible(true);
    }
    finally {
      setIsButtonDisabled(false);
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
        <Text style={styleText.textHome}>Registro</Text>
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
        <View style={styleBox.infoBoton}>
          <TextInput
            placeholder="Nombre"
            value={name}
            onChangeText={(text: string) => setName(text)}
          />
        </View>
        <View style={styleBox.infoBoton}>
          <TextInput
            placeholder="Apellido"
            value={lastname}
            onChangeText={(text: string) => setLastname(text)}
          />
        </View>
        <TouchableOpacity
          disabled={isButtonDisabled}
          style={styleBox.botonEdit}
          onPress={() => handleRegister(email, password, name, lastname)}
        >
          <Text style={styleText.titleOne}>Registrarse</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate("Login")} style={[styleText.titleTwo, { marginTop: 15 }]}>
          Ya tienes una cuenta? Inicia Sesión.
        </Text>
      </View>
    </View>
  );
};
export default SignInScreen;