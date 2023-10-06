import React from 'react'
import { StyleSheet, Text, View,TextInput, Button,Image, TouchableOpacity } from 'react-native';


const TeamsScreen = ({navigation}: any) => {


    return (
        <View style={styles.container}>
          <View style={styles.container2}>
            <Text style={styles.title}>Bienvenido!!</Text>
          </View>
        </View>
      );
    };
    
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#0747a6'
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
    }
  });


export default TeamsScreen;