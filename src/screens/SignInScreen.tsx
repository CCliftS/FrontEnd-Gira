import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SignInScreen () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  
  const navigation = useNavigation();

  const handleRegister = () => {
    // Aquí puedes agregar la lógica para registrar al usuario, por ejemplo, utilizando Firebase.
    // Después de registrar al usuario con éxito, puedes navegar a la pantalla de inicio de sesión.
    // navigation.navigate('Login');
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
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Apellido"
          value={lastname}
          onChangeText={setLastname}
          style={styles.input}
        />

        <TouchableOpacity        
            style={[styles.button]} 
            >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <Text onPress={()=> navigation.navigate("Login")} style={styles.link}>
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
    backgroundColor:'#0747a6',
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

export default SignInScreen;