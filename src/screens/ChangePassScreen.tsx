import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Image, Text, TouchableOpacity } from 'react-native';


function RecoveryScreen () {
  const [password, setPassword] = useState('');
  

  const handlePass = () => {
    // Aquí puedes agregar la lógica para registrar al usuario, por ejemplo, utilizando Firebase.
    // Después de registrar al usuario con éxito, puedes navegar a la pantalla de inicio de sesión.
    // navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image 
            source={require('./../public/pass.png')}
            style={styles.logo}
      />
      <View style={styles.container2}>
        <Text style={styles.title}>Ingrese su nueva contraseña</Text>
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Repita su contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity        
            style={[styles.button]} 
            >
          <Text style={styles.buttonText}>Listo</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color:'#85828a',
    fontWeight: 'bold',
    textAlign:'center',
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
    height: 200, // Ajusta el tamaño de la imagen según tus necesidades
    marginBottom: 16,
  },
});

export default RecoveryScreen;