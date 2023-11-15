import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import { MyTeamsPageProps } from "../../../types/types";
import styleGeneral from "../../public/styles/StyleGeneral";
import NavigationBar from "../common/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import styleMyTeamsPage from "../../public/styles/StyleMyTeamsPage";
import { useLocalStorage } from "../../utils/localStorage";
import { useFocusEffect } from "@react-navigation/native";

const MyTeamsPage: React.FC<MyTeamsPageProps> = ({ navigation }) => {
    const email = useLocalStorage('email');
    const [nameTeams, setNameTeams] = useState([]);
    const [idTeams, setIdTeams] = useState([]);
    const [teams, setTeams] = useState([]); // Estado para los nombres de los equipos


    const getTeamData = async (id: string) => {
        try {
            const response = await axios.post(`http://10.0.2.2:3001/Member/findTeamById`, {
                id
            });
            console.log(response.data);
            setTeams(response.data.name); // Devuelve el nombre del equipo
        } catch (error) {
            console.log(error);
        }
    }

    const loadTeams = async (email: string) => {
        try {
            const response = await axios.post(`http://10.0.2.2:3001/Member/memberData`, {
                email
            });
            setNameTeams(response.data.teamsName);
            setIdTeams(response.data.teamsId);
            await Promise.all(idTeams.map(item => getTeamData(item)));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadTeams(email);
        console.log(teams);
    }, []);

    return (
        <View style={styleGeneral.container}>
            <View style={styleGeneral.boxHeader}>
                <Text style={styleGeneral.titleHeader}> Equipos </Text>
            </View>
            <View style={styleMyTeamsPage.boxContainer}>
                <ScrollView>
                    {idTeams.map((item, index) => (
                        <View style={styleMyTeamsPage.boxItem} key={index}>
                            <Text style={styleMyTeamsPage.textData}>{teams[index]}</Text>
                            <TouchableOpacity style={styleGeneral.icon} onPress={() => navigation.navigate("DataTeamPage")} >
                                <Image
                                    source={require('../../public/icons/angulo-circulo-derecha.png')}
                                    style={styleMyTeamsPage.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View >
            <View style={styleGeneral.footer}>
                <NavigationBar navigation={navigation} />
            </View>
        </View >
    );
}

export default MyTeamsPage;