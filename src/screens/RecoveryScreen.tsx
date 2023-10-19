import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { RecoveryScreenProps } from '../../types/types';


const RecoveryScreen: React.FC<RecoveryScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmail = async (email:string) => {
    setError(false);
    try{
      const response = await axios.post(`http://10.0.2.2:3000/user/resetPassword`, {
        email,
      });
      navigation.navigate("Login")
    }
    catch (e:any){
      setError(true);
      setErrorMessage(e?.response?.data.message);
      console.log(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
            source={require('./../public/gira.png')}
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
        <TouchableOpacity onPress ={()=> handleEmail(email)} style={[styles.button]} >
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
    backgroundColor: '#0747a6',
  },
  container2:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    padding: 16,
    color:'#494848',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    color:'#85828a',
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
  button:{
    backgroundColor: '#0052cc',
    borderRadius: 15,
    alignItems: 'center',
    height: 40,
    width: 150,
    marginBottom: 10,
  },
  buttonText:{
    color:'white',
    textAlign:'center',
    marginTop: 5,
    fontSize: 20,
  },
  logo: {
    width: 150, // Ajusta el tamaño de la imagen según tus necesidades
    height: 150, // Ajusta el tamaño de la imagen según tus necesidades
    marginBottom: 16,
  },
});

export default RecoveryScreen;