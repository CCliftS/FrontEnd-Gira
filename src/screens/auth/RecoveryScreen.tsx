import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Image, Text, TouchableOpacity, Modal } from 'react-native';
import { RecoveryScreenProps } from '../../../types/types';
import styleBox from '../../public/styles/styleBox';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import styleText from '../../public/styles/styleText';


const RecoveryScreen: React.FC<RecoveryScreenProps> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleEmail = async (email: string) => {
    setIsButtonDisabled(true);
    try {
      const response = await axios.put(`http://10.0.2.2:3000/user/resetPassword/${email}`);
      navigation.navigate("Login")
    }
    catch (error) {
      setError("Correo no registrado");
      setModalVisible(true);
    }
    finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <View style={styles.container}>
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
      <Image
        source={require('../../public/icons/pass.png')}
        style={styles.logo}
      />
      <View style={styles.container2}>
        <Text style={styles.title}>Olvide mi contraseña</Text>
        <Text style={styles.subtitle}>Ingrese su correo electronico</Text>
        <TextInput
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TouchableOpacity
          disabled={isButtonDisabled}
          onPress={() => handleEmail(email)}
          style={[styles.button]}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
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
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: '#85828a',
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
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 20,
  },
  logo: {
    width: 150, // Ajusta el tamaño de la imagen según tus necesidades
    height: 200, // Ajusta el tamaño de la imagen según tus necesidades
    marginBottom: 16,
  },
});

export default RecoveryScreen;