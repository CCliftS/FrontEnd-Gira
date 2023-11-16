import { View, Text, ScrollView } from "react-native";
import { DataTeamPageProps } from "../../../types/types";
import styleGeneral from "../../public/styles/StyleGeneral";
import NavigationBar from "../common/navbar";
import styleDataTeamPage from "../../public/styles/StyleDataTeam";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const DataTeamPage: React.FC<DataTeamPageProps> = ({ navigation }) => {
    const [role, setRole] = useState('');
    const [membersTeam, setMembersTeam] = useState([]);
    const [nameTeam, setNameTeam] = useState('');


    const loadMembersTeam = async () => {
        try {
            const idTeam = await AsyncStorage.getItem('idTeam');
            const response = await axios.get(`http://10.0.2.2:3001/Member/getMemberTeam/${idTeam}`);
            setMembersTeam(response.data.TeamsEmails);
            setNameTeam(response.data.nameTeam.slice(0, 1));


        } catch (error) {
            console.log(error);
        }
    };
    const loadDataUser = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const response = await axios.get(`http://10.0.2.2:3001/Member/findMemberByEmail/${email}`);
            setRole(response.data.role);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadMembersTeam();
        loadDataUser();
    }, []);

    return (
        <View style={styleGeneral.container}>
            <View style={styleGeneral.boxHeader}>
                <Text style={styleGeneral.titleHeader}>Equipo {nameTeam}</Text>
            </View>
            <View style={styleDataTeamPage.boxMembers}>
                <Text style={styleGeneral.titleHeader}>Miebros del equipo</Text>
                <View style={styleDataTeamPage.boxDataMembers}>
                    {/* Aqui se deben mostrtar los miembros del equip*/}
                    <ScrollView>
                        {membersTeam.map((item, index) => (
                            <View key={index}>
                                <Text style={styleGeneral.textSecundary}>{item}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>

            {role === "administrador" ? (
                <View style={styleDataTeamPage.containerBottom}>
                    <View style={styleDataTeamPage.boxBottom}>
                        <Text style={styleGeneral.textSecundary} onPress={() => navigation.navigate("AddMemberTeam")}>Agregar Miembro</Text>
                    </View>

                    <View style={styleDataTeamPage.boxBottom}>
                        <Text style={styleGeneral.textSecundary} onPress={() => navigation.navigate("EditTeam")}>Editar equipo</Text>
                    </View>
                </View>
            ) : (
                <View style={styleDataTeamPage.containerBottom}>
                    <Text style={styleGeneral.textBody}>
                        Rol : {role}
                    </Text>
                    <View style={styleDataTeamPage.boxBottom}>
                        <Text style={styleGeneral.textSecundary}>Salir del equipo</Text>
                    </View>
                    <View style={styleDataTeamPage.boxBottom}>
                        <Text style={styleGeneral.textSecundary}>Volver</Text>
                    </View>
                </View>
            )}

            <View style={styleGeneral.footer}>
                <NavigationBar navigation={navigation} />
            </View>
        </View>
    );

}
export default DataTeamPage;  