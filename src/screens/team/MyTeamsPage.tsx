import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import { MyTeamsPageProps } from "../../../types/types";
import styleGeneral from "../../public/styles/StyleGeneral";
import NavigationBar from "../common/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import styleMyTeamsPage from "../../public/styles/StyleMyTeamsPage";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyTeamsPage: React.FC<MyTeamsPageProps> = ({ navigation }) => {
    const [nameTeams, setNameTeams] = useState([]);
    const [idTeams, setIdTeams] = useState([]);

    const loadTeams = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const response = await axios.post(`http://10.0.2.2:3001/Member/memberData`, {
                email
            });
            setNameTeams(response.data.teamsName);
            setIdTeams(response.data.teamsId);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadTeams();
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
                            <Text style={styleMyTeamsPage.textData}>{nameTeams[index]}</Text>
                            <TouchableOpacity
                                style={styleGeneral.icon}
                                onPress={() => { navigation.navigate("DataTeamPage"), AsyncStorage.setItem('idTeam', item), AsyncStorage.setItem('nameTeam', nameTeams[index]) }}
                            >
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