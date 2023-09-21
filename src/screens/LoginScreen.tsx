import React, { useState } from 'react'
import { StyleSheet, Text, View,TextInput, Button,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function LoginScreen () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleLogin = async () =>{
      
    }

    return (
        <View style={styles.container}>
          <Image 
            source={require('../public/gira.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Bienvenido a Gira</Text>
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
          <Button title="Iniciar Sesión"/>
          <Text onPress={()=> navigation.navigate("SignIn")} style={styles.link}>
            ¿No tienes una cuenta? Regístrate aquí.
          </Text>
          <Text onPress={()=> navigation.navigate("Recovery")} style={styles.link}>
            Olvide mi contraseña.
          </Text>
        </View>
      );
    };
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
    },
    input: {
      width: 240,
      marginBottom: 16,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 15,
    },
    logo: {
      width: 250, // Ajusta el tamaño de la imagen según tus necesidades
      height: 100, // Ajusta el tamaño de la imagen según tus necesidades
      marginBottom: 16,
    },
    link: {
      marginTop: 16,
      color: 'blue',
    },
  });


export default LoginScreen;