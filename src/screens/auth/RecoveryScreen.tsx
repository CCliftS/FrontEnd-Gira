import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Image, Text, TouchableOpacity, Modal } from 'react-native';
import { RecoveryScreenProps } from '../../../types/types';
import styleBox from '../../public/styles/styleBox';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import styleText from '../../public/styles/styleText';
import { ENDPOINT_MS_USER } from 'react-native-dotenv';


const RecoveryScreen: React.FC<RecoveryScreenProps> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const handleEmail = async (email: string) => {
    setIsButtonDisabled(true);
    try {
      const response = await axios.put(`${ENDPOINT_MS_USER}/user/resetPassword/${email}`);
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
    <View style={styleBox.container}>
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
      <View style={styleBox.headerPage}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Ionicons name="arrow-back-circle-sharp" size={45} color="#0c04b6" style={{ paddingRight: 60 }} />
        </TouchableOpacity>
      </View>
      <View style={styleBox.headerEdit}>
        <Text style={styleText.headerBlack}>Recuperar contraseña</Text>
        <Text style={styleText.infoEdit}>En esta ventana puedes recuperar tu contraseña, se enviara a tu email una nueva contraseña aleatoria, recomendamos cambiarla una vez ingresado.</Text>
      </View>
      <View style={styleBox.contentPage}>
        <Text style={styleText.titleOne}>Ingrese su correo electronico</Text>
        <TextInput
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          style={[styleBox.infoBoton, styleText.input]}
        />
        <TouchableOpacity
          disabled={isButtonDisabled}
          onPress={() => handleEmail(email)}
          style={styleBox.botonConfirm}
        >
          <Text style={styleText.confirmEdit}>Siguiente</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default RecoveryScreen;