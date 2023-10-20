import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import { MyTeamsPageProps } from "../../types/types";
import styleGeneral from "../public/styles/StyleGeneral";
import NavigationBar from "./navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import styleMyTeamsPage from "../public/styles/StyleMyTeamsPage";

const MyTeamsPage: React.FC<MyTeamsPageProps> = ({ navigation, route }) => {
    const email = route.params?.data;
    const [nameTeams, setNameTeams] = useState([]);
    const [idTeams, setIdTeams] = useState([]);
    const [teams, setTeam] = useState([]); // Estado para los nombres de los equipos

    useEffect(() => {
        loadTeams(email);
    }, []);

    const getTeamData = async (id: string) => {
        try {
            const response = await axios.post(`http://10.0.2.2:3001/Member/findTeamById`, {
                id
            });
            return response.data.nameTeam; // Devuelve el nombre del equipo
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

            // Obtiene los nombres de los equipos y actualiza el estado
            const teamArray = await Promise.all(idTeams.map(item => getTeamData(item)));
            setTeam(teamArray);
        } catch (error) {
            console.log(error);
        }
    }

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
                            <TouchableOpacity style={styleGeneral.icon} onPress={() => navigation.navigate("Login")}>
                                <Image
                                    source={require('./../public/icons/angulo-circulo-derecha.png')}
                                    style={styleMyTeamsPage.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styleGeneral.footer}>
                <NavigationBar navigation={navigation} route={route} data={email} />
            </View>
        </View>
    );
}

export default MyTeamsPage;