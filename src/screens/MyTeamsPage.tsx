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

    useEffect(() => {
        loadTeams(email);
    }, []);
    const loadTeams = async (email: string) => {
        try {
            const response = await axios.post(`http://10.0.2.2:3001/Member/memberData`, {
                email
            });
            setNameTeams(response.data.teamsName);
            setIdTeams(response.data.teamsId);

        } catch (error) {
            console.log(error);
        }
    }
    console.log(nameTeams, idTeams);
    return (
        <View style={styleGeneral.container}>
            <View style={styleGeneral.boxHeader}>
                <Text style={styleGeneral.titleHeader}> Equipos </Text>
            </View>
            <View style={styleMyTeamsPage.boxContainer}>
                <ScrollView>
                    {nameTeams.map((item, index) => (
                        <View style={styleMyTeamsPage.boxItem}>
                            <Text style={styleMyTeamsPage.textData} key={index}>{item}</Text>
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