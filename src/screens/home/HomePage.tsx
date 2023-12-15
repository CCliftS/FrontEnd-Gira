import { View, Text, Image, TouchableOpacity, ScrollView, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { HomePageScreenProps } from "../../../types/types";
import styleHomePage from "../../public/styles/StyleHomePage";
import NavigationBar from "../common/navbar";
import styleGeneral from "../../public/styles/StyleGeneral";
import styleBox from "../../public/styles/styleBox";
import styleText from "../../public/styles/styleText";
import { Ionicons, AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const HomePage: React.FC<HomePageScreenProps> = ({ navigation }) => {
    {/* Datos del usuario */ }
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');

    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');

    const fetchDataUser = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const response = await axios.get(`http://10.0.2.2:3000/user/getUser/${email}`);

            setUserName(response.data.name);
            setUserLastName(response.data.lastName);
        } catch (error) {
            setError("No se pudo cargar los datos del usuario");
            setModalVisible(true);
        }
    };
    {/* Proyectos del usuario Owner */ }
    const [nameProject, setNameProject] = useState([]);
    const [idProject, setIdProject] = useState([]);

    const fetchOwnerProjectsUser = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const response = await axios.get(`http://10.0.2.2:3001/Project/findProjectOwner/${email}`);

            setNameProject(response.data.nameProjects);
            setIdProject(response.data.idProjects);
        } catch (error) {
            setError("No se pudo cargar los datos de los proyectos");
            setModalVisible(true);
        }
    }
    {/* Equipos del usuario */ }
    const [nameTeam, setNameTeam] = useState([]);
    const [idTeam, setIdTeam] = useState([]);

    const fechtTeamUser = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const response = await axios.post(`http://10.0.2.2:3001/Member/memberData`, {
                email
            });
            setNameTeam(response.data.teamsName);
            setIdTeam(response.data.teamsId);
        } catch (error) {
            setError("No se pudo cargar los datos de los equipos");
            setModalVisible(true);
        }
    };

    useEffect(() => {
        fetchDataUser();
        fetchOwnerProjectsUser();
        fechtTeamUser();
    }, []);
    useEffect(() => {
        fetchDataUser();
    }, [userName]);
    return (
        <View style={styleBox.container}>
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
            <ScrollView>
                <View style={{ marginTop: 25 }}>
                    <View style={styleBox.header} >
                        <View>
                            <Text style={styleText.header}>Bienvenido</Text>
                            <Text style={styleText.secundaryHeader}>{userName} {userLastName}</Text>
                        </View>
                        <View style={styleBox.iconHeader}>
                            <Ionicons name="notifications" size={30} color="#0c04b6" />
                        </View>
                    </View>
                </View>
                {/* Contenedor de Mis Proyectos */}

                <View style={styleBox.dataContainer}>
                    {/* Titulo del contenedor */}
                    <View style={styleBox.dataTitle}>
                        <Text style={styleText.titleOne}>Mis Proyectos</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("ProjectUser")}>
                            <Text style={styleText.titleTwo}>Ver Todos</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Componentes del contenedor */}
                    <ScrollView horizontal>
                        {idProject.slice(0, 3).map((item, index) => (
                            <View key={index}>
                                <View style={styleBox.dataBox}>
                                    {/* Titulo e icono*/}
                                    <Text style={{ fontSize: 25, fontWeight: '800', textAlign: 'center' }}>{nameProject[index]}</Text>
                                    <View style={styleBox.line}></View>
                                    <Text>Aqui va una pequeña descrición del proyecto, la funciona que cumple y el objetivo que tiene en la empresa, cuales son sus aspraciones, no mas de 150 caracteres.</Text>
                                    <View style={styleBox.codeBoton}>
                                        <Text>codigo : {idProject[index]}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <View style={styleBox.goBoton}>
                                            <AntDesign name="caretright" size={24} color="white" />
                                        </View>
                                    </View>

                                </View>
                            </View>
                        ))}
                    </ScrollView>

                </View>
                {/* Contenedor de Mis Equipos */}
                <View style={styleBox.dataContainer}>
                    {/* Titulo del contenedor */}
                    <View style={styleBox.dataTitle}>
                        <Text style={styleText.titleOne}>Mis Equipos</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("MyTeamsPage")}>
                            <Text style={styleText.titleTwo}>Ver Todos</Text>
                        </TouchableOpacity>

                    </View>

                    <View>
                        {/* Componentes del contenedor : Mis Equipos */}
                        <ScrollView horizontal>
                            {idTeam.slice(0, 3).map((item, index) => (
                                <View key={index}>
                                    <View style={styleBox.dataBox}>
                                        {/* Titulo e icono*/}
                                        <Text style={{ fontSize: 25, fontWeight: '800', textAlign: 'center' }}>{nameTeam[index]}</Text>
                                        <View style={styleBox.line}></View>
                                        <Text>Aqui va una pequeña descrición del proyecto, la funciona que cumple y el objetivo que tiene en la empresa, cuales son sus aspraciones, no mas de 150 caracteres.</Text>
                                        <View style={styleBox.codeBoton}>
                                            <Text>codigo : {idTeam[index]}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                            <View style={styleBox.goBoton}>
                                                <AntDesign name="caretright" size={24} color="white" />
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                {/* Contenedor de Mis Tareas */}
                <View style={styleBox.dataContainer}>
                    {/* Titulo del contenedor */}
                    <View style={styleBox.dataTitle}>
                        <Text style={styleText.titleOne}>Mis Tareas</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("UserTask")}>
                            <Text style={styleText.titleTwo}>Ver Todos</Text>
                        </TouchableOpacity>

                    </View>
                </View>


            </ScrollView >
            <View style={styleGeneral.footer}>
                <NavigationBar navigation={navigation} />
            </View>
        </View >

    );
}


export default HomePage;

/*
    <View style={styleGeneral.container}>
        <View style={styleHomePage.boxHeader}>
            <Text style={styleHomePage.titleHeader}>Bienvenido 👋</Text>
            <Image
                source={require('../../public//icons/gira_logo.png')}
                style={styleHomePage.logo} />
        </View>
        <View style={styleGeneral.boxContainer}>
            <Text style={styleGeneral.textSecundary}>MIS EQUIPOS</Text>
            <View style={styleHomePage.boxTeam}>
                <TouchableOpacity onPress={() => navigation.navigate("MyTeamsPage")}>
                    <Image
                        source={require('../../public/icons/equipo-de-usuarios.png')}
                        resizeMode="contain"
                        style={styleHomePage.icon} />
                </TouchableOpacity>
            </View>
            <Text style={styleGeneral.textSecundary}>MIS PROYECTOS</Text>
            <View style={styleHomePage.boxProyect}>
                <TouchableOpacity onPress={() => navigation.navigate("ProjectUser")}>
                    <Image
                        source={require('../../public/icons/proyecto-de-diagrama.png')}
                        resizeMode="contain"
                        style={styleHomePage.icon} />
                </TouchableOpacity>
            </View>
            <Text style={styleGeneral.textSecundary}>MIS TAREAS</Text>
            <View style={styleHomePage.boxTask}>
                <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
                    <Image
                        source={require('../../public/icons/comprobacion-de-lista.png')}
                        resizeMode="contain"
                        style={styleHomePage.icon} />
                </TouchableOpacity>
            </View>

        </View>
        <View style={styleGeneral.footer}>
            <NavigationBar navigation={navigation} />
        </View>
    </View>
    */