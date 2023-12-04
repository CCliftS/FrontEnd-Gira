import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import { MyTeamsPageProps } from "../../../types/types";
import styleGeneral from "../../public/styles/StyleGeneral";
import NavigationBar from "../common/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import styleMyTeamsPage from "../../public/styles/StyleMyTeamsPage";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styleBox from "../../public/styles/styleBox";
import styleText from "../../public/styles/styleText";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const MyTeamsPage: React.FC<MyTeamsPageProps> = ({ navigation }) => {
    const [option, setOption] = useState(false);

    const [nameTeams, setNameTeams] = useState([]);
    const [idTeams, setIdTeams] = useState([]);

    const fetchOwnerTeam = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const response = await axios.get(`http://10.0.2.2:3001/Member/getTeamIfAdmin/${email}`);
            setNameTeams(response.data.teams);
            setIdTeams(response.data.teamsId);

        } catch (error) {
            console.log(error);
        }
    };

    const [nameTeamMember, setNameTeamMember] = useState([]);
    const [idTeamMember, setIdTeamMember] = useState([]);

    const fetchTeamMember = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const response = await axios.get(`http://10.0.2.2:3001/Member/getTeamIfMember/${email}`);
            setNameTeamMember(response.data.teams);
            setIdTeamMember(response.data.teamsId);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOwnerTeam();
        fetchTeamMember();
    }, []);

    return (
        <View style={styleBox.containerPage}>
            <View style={styleBox.headerPage}>
                <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 50 }} />
                </TouchableOpacity>
                <Text style={styleText.header}>Equipos Usuario</Text>
            </View>
            <View style={styleBox.contentPage}>
                <View style={styleBox.dataTitle}>
                    <View style={styleBox.option}>
                        <TouchableOpacity onPress={() => setOption(false)}>
                            <Text style={styleText.titleOne}>Owner</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styleBox.option}>
                        <TouchableOpacity onPress={() => setOption(true)}>
                            <Text style={styleText.titleOne}>Participante</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    {option == false ? (
                        <View>
                            <View style={styleBox.dataTitle}>
                                <Text style={styleText.titleOne}>Mis equipos como Owner</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("EditEmailPage")}>
                                    <Ionicons name="md-add-circle-sharp" size={40} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={styleBox.dataList}>
                                <ScrollView>
                                    {nameTeams.map((item, index) => (
                                        <View style={styleBox.listBoton} key={index}>
                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 20, width: 350 }}>
                                                <View style={{ width: 260 }}>
                                                    <Text style={{ fontSize: 25 }}>{item}</Text>
                                                    <View style={styleBox.codeBoton}>
                                                        <Text>Codigo: {idTeams[index]}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <TouchableOpacity onPress={() => {
                                                        navigation.navigate("DataTeamPage");
                                                        AsyncStorage.setItem('nameTeam', item);
                                                        AsyncStorage.setItem('idTeam', idTeams[index]);
                                                        AsyncStorage.setItem('option', 'false');
                                                    }}>
                                                        <AntDesign name="caretright" size={35} color="black" style={{ paddingBottom: 5 }} />
                                                    </TouchableOpacity>
                                                    <MaterialIcons name="edit" size={35} color="black" style={{ paddingBottom: 5 }} />

                                                </View>

                                            </View>
                                            <View style={{ paddingHorizontal: 20 }}>
                                                <View style={styleBox.line}></View>
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>

                    ) : (
                        <View>
                            <View style={styleBox.dataTitle}>
                                <Text style={styleText.titleOne}>Mis Equipos como Miembro</Text>
                            </View>
                            <View style={styleBox.dataList}>
                                <ScrollView>
                                    {nameTeamMember.map((item, index) => (
                                        <View style={styleBox.listBoton} key={index}>
                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 20, width: 350 }}>
                                                <View style={{ width: 260 }}>
                                                    <Text style={{ fontSize: 25 }}>{item}</Text>
                                                    <View style={styleBox.codeBoton}>
                                                        <Text>Codigo: {idTeamMember[index]}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <TouchableOpacity onPress={() => {
                                                        navigation.navigate("DataTeamPage");
                                                        AsyncStorage.setItem('nameTeam', item);
                                                        AsyncStorage.setItem('idTeam', idTeamMember[index]);
                                                        AsyncStorage.setItem('option', 'true');
                                                    }}>
                                                        <AntDesign name="caretright" size={35} color="black" style={{ paddingBottom: 5 }} />
                                                    </TouchableOpacity>

                                                </View>

                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>

                    )}
                </View>

            </View>

        </View>
    );
}

export default MyTeamsPage;
{/**
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
*/}