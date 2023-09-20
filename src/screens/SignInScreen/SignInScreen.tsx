import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';


function SignInScreen () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');

  const handleRegister = () => {
    // Aquí puedes agregar la lógica para registrar al usuario, por ejemplo, utilizando Firebase.
    // Después de registrar al usuario con éxito, puedes navegar a la pantalla de inicio de sesión.
    // navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
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

      <Button title="Registrarse" onPress={handleRegister} />
      <Text style={styles.link}>
        ¿Ya tienes una cuenta? Inicia sesión aquí.
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
    width: '80%',
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  link: {
    marginTop: 16,
    color: 'blue',
  },
});

export default SignInScreen;