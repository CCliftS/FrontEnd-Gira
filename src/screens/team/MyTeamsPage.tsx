import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, Modal } from "react-native";
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
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';

const MyTeamsPage: React.FC<MyTeamsPageProps> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');

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
            setError("No se pudo cargar los equipos");
            setModalVisible(true);
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
            setError("No se pudo cargar los equipos");
            setModalVisible(true);
        }
    };

    useEffect(() => {
        fetchOwnerTeam();
        fetchTeamMember();
    }, []);

    return (
        <View style={styleBox.containerPage}>
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
            >
                <View style={styleBox.modalCenter}>
                    <View style={styleBox.modalError}>
                        <Feather name="alert-triangle" size={54} color="#da1a29" />
                        <Text style={styleText.titleOne}>{error}</Text>
                        <TouchableOpacity style={styleBox.botonDelete} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styleText.confirmEdit}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styleBox.headerPage}>
                <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 50 }} />
                </TouchableOpacity>
                <Text style={styleText.header}>Equipos Usuario</Text>
            </View>
            <View style={styleBox.contentPage}>
                <View style={styleBox.dataTitle}>
                    {option == false && <View style={styleBox.option2}>
                        <TouchableOpacity onPress={() => setOption(false)}>
                            <Text style={styleText.confirmEdit}>Owner</Text>
                        </TouchableOpacity>
                    </View>}
                    {option == true && <View style={styleBox.option}>
                        <TouchableOpacity onPress={() => setOption(false)}>
                            <Text style={styleText.titleOne}>Owner</Text>
                        </TouchableOpacity>
                    </View>}
                    {option == false && <View style={styleBox.option}>
                        <TouchableOpacity onPress={() => setOption(true)}>
                            <Text style={styleText.titleOne}>Participante</Text>
                        </TouchableOpacity>
                    </View>}
                    {option == true && <View style={styleBox.option2}>
                        <TouchableOpacity onPress={() => setOption(true)}>
                            <Text style={styleText.confirmEdit}>Participante</Text>
                        </TouchableOpacity>
                    </View>}
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
                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 15, width: 350 }}>
                                                <View style={{ width: 260 }}>
                                                    <Text style={{ fontSize: 25 }}>{item}</Text>
                                                    <View style={[{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }, styleBox.infoTask]}>
                                                        <Ionicons name="ios-qr-code" size={24} color="black" style={{ marginRight: 5 }} />
                                                        <Text>{idTeams[index]}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <TouchableOpacity style={{ backgroundColor: '#0c04b6', borderRadius: 5, width: 40, alignItems: 'center', height: 70, justifyContent: 'center' }} onPress={() => {
                                                        navigation.navigate("DataTeamPage");
                                                        AsyncStorage.setItem('nameTeam', item);
                                                        AsyncStorage.setItem('idTeam', idTeams[index]);
                                                        AsyncStorage.setItem('option', 'false');
                                                    }}>
                                                        <AntDesign name="caretright" size={35} color="white" />
                                                    </TouchableOpacity>
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
                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 15, width: 350 }}>
                                                <View style={{ width: 260 }}>
                                                    <Text style={{ fontSize: 25 }}>{item}</Text>
                                                    <View style={[{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }, styleBox.infoTask]}>
                                                        <Ionicons name="ios-qr-code" size={24} color="black" style={{ marginRight: 5 }} />
                                                        <Text>{idTeamMember[index]}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <TouchableOpacity style={{ backgroundColor: '#0c04b6', borderRadius: 5, width: 40, alignItems: 'center', height: 70, justifyContent: 'center' }} onPress={() => {
                                                        navigation.navigate("DataTeamPage");
                                                        AsyncStorage.setItem('nameTeam', item);
                                                        AsyncStorage.setItem('idTeam', idTeamMember[index]);
                                                        AsyncStorage.setItem('option', 'true');
                                                    }}>
                                                        <AntDesign name="caretright" size={35} color="white" />
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