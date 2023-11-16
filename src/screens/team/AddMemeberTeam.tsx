import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { AddMemberTeamProps } from "../../../types/types";
import styleGeneral from "../../public/styles/StyleGeneral";
import styleTeamPage from "../../public/styles/StyleTeamPage";
import NavigationBar from "../common/navbar";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AddMemberTeam: React.FC<AddMemberTeamProps> = ({ navigation }) => {
    const [emailMember, setEmailMember] = useState('');
    const [role, setRole] = useState('');

    const hanleAddMember = async (email: string, role: string) => {
        try {

            const idTeam = await AsyncStorage.getItem('idTeam');
            const nameTeam = await AsyncStorage.getItem('nameTeam');
            const response = await axios.post(`http://10.0.2.2:3001/Member/addMemberTeam`, {
                email,
                role,
                idTeam,
                nameTeam
            });
            navigation.navigate("MyTeamsPage");
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
                    <Text style={styleTeamPage.textBox1}>Nombre del integrante</Text>
                    <TextInput
                        style={[styleTeamPage.boxDataItem2, styleGeneral.textSecundary]}
                        value={emailMember}
                        onChangeText={(text: string) => setEmailMember(text)}
                    />
                </View>
                <View style={styleTeamPage.boxDataItem}>
                    <Text style={styleTeamPage.textBox1}>Rol del integrante</Text>
                    <TextInput
                        style={[styleTeamPage.boxDataItem2, styleGeneral.textSecundary]}
                        value={role}
                        onChangeText={(text: string) => setRole(text)}
                    />
                </View>
                <TouchableOpacity style={styleGeneral.boxBottom1} onPress={() => hanleAddMember(emailMember, role)}>
                    <Text style={styleGeneral.texBottom}>Agregar miembro al equipo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleGeneral.boxBottom2} onPress={() => navigation.navigate("DataTeamPage")}>
                    <Text style={styleGeneral.texBottom}>Volver</Text>
                </TouchableOpacity>
            </View>
            <View style={styleGeneral.footer}>
                <NavigationBar navigation={navigation} />
            </View>
        </View>
    );
}
export default AddMemberTeam;