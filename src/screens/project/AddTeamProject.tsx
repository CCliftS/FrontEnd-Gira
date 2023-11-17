import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AddTeamProjectProps } from "../../../types/types"
import styleGeneral from "../../public/styles/StyleGeneral";
import styleTeamPage from "../../public/styles/StyleTeamPage";
import { useState } from "react";
import NavigationBar from "../common/navbar";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddTeamProject: React.FC<AddTeamProjectProps> = ({ navigation }) => {
    const [idTeam, setIdTeam] = useState('');
    const hanleAddTeam = async (idTeam: string) => {
        try {

            const id = await AsyncStorage.getItem('idProject');
            const response = await axios.post(`http://10.0.2.2:3001/Project/addTeam`, {
                id,
                idTeam
            });
            navigation.navigate("DataProject");
        } catch (error) {
            console.log(error, "No se agrego al equipo  ");
        }
    }
    return (
        <View style={styleGeneral.container}>
            <View style={styleGeneral.boxHeader}>
                <Text style={styleGeneral.titleHeader}>Creación de proyecto</Text>
            </View>
            <View style={styleGeneral.boxContainer}>
                <View style={styleTeamPage.boxDataItem}>
                    <Text style={styleTeamPage.textBox1}>Id del equipo</Text>
                    <TextInput
                        style={[styleTeamPage.boxDataItem2, styleGeneral.textSecundary]}
                        value={idTeam}
                        onChangeText={(text: string) => setIdTeam(text)}
                    />
                </View>

                <TouchableOpacity style={styleGeneral.boxBottom1} onPress={() => hanleAddTeam(idTeam)}>
                    <Text style={styleGeneral.texBottom}>Agregar miembro al equipo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleGeneral.boxBottom2} onPress={() => navigation.navigate("DataProject")}>
                    <Text style={styleGeneral.texBottom}>Volver</Text>
                </TouchableOpacity>
            </View>
            <View style={styleGeneral.footer}>
                <NavigationBar navigation={navigation} />
            </View>
        </View>
    );
}
export default AddTeamProject