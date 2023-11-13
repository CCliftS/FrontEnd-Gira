import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { TeamsScreenProps } from '../../../types/types';
import styleTeamPage from '../../public/styles/StyleTeamPage';
import NavigationBar from '../common/navbar';
import styleGeneral from '../../public/styles/StyleGeneral';
import axios from 'axios';


const TeamsScreen: React.FC<TeamsScreenProps> = ({ navigation, route }) => {
  const email = route.params?.data;
  const [nameTeam, setNameTeam] = useState('');
  const hanleCreateFirtsMember = async (email: string, role: string, idTeam: string, nameTeam: string) => {
    try {
      const response = await axios.post(`http://10.0.2.2:3001/Member/addMemberTeam`, {
        email,
        role,
        idTeam,
        nameTeam
      })
      navigation.navigate("AddPage", { data: email });
    } catch (error) {
      console.log(error, "No se creo el miembro");
    }
  }
  const handleCreateTeam = async (email: string, nameTeam: string) => {
    try {
      const response = await axios.post(`http://10.0.2.2:3001/Teams/createTeam`, {
        nameTeam
      })

      const idTeam = response.data?._id;
      const role: string = "administrador";

      hanleCreateFirtsMember(email, role, idTeam, nameTeam);
    } catch (error) {
      console.log(error), "No se creo el equipo";
    }
  }


  return (
    <View style={styleGeneral.container}>
      <View style={styleGeneral.boxHeader}>
        <Text style={styleGeneral.titleHeader}>Creación de equipo</Text>
      </View>
      <View style={styleGeneral.boxContainer}>
        <View style={styleTeamPage.boxDataItem}>
          <Text style={styleTeamPage.textBox1}>Nombre de Equipo</Text>
          <TextInput
            style={[styleTeamPage.boxDataItem2, styleGeneral.textSecundary]}
            value={nameTeam}
            onChangeText={(text: string) => setNameTeam(text)}
          />
        </View>
        <TouchableOpacity style={styleTeamPage.boxBottom1} onPress={() => handleCreateTeam(email, nameTeam)}>
          <Text style={styleTeamPage.textBox1}>Crear equipo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styleTeamPage.boxBottom2} onPress={() => navigation.navigate("AddPage", { data: email })}>
          <Text style={styleTeamPage.textBox1}>Eliminar ??</Text>
        </TouchableOpacity>
      </View>
      <View style={styleGeneral.footer}>
        <NavigationBar navigation={navigation} route={route} data={email} />
      </View>
    </View>
  )
};
export default TeamsScreen;