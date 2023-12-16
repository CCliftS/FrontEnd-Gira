import { View, Text, Image, TouchableOpacity, ScrollView, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { HomePageScreenProps } from "../../../types/types";
import styleHomePage from "../../public/styles/StyleHomePage";
import NavigationBar from "../common/navbar";
import styleGeneral from "../../public/styles/StyleGeneral";
import styleBox from "../../public/styles/styleBox";
import styleText from "../../public/styles/styleText";
import { Ionicons, AntDesign, MaterialIcons, Feather, FontAwesome5, Fontisto, Zocial } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { id } from "date-fns/locale";


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
    const [idTask, setIdTask] = useState([]);
    const [descriptionTask, setDescriptionTask] = useState([]);
    const [finishDateTask, setFinishDateTask] = useState([]);
    const [idTeamTask, setIdTeamTask] = useState([]);
    const [nameTask, setNameTask] = useState([]);
    const [startDateTask, setStartDateTask] = useState([]);
    const [statusTask, setStatusTask] = useState([]);
    const [nameTeamTask, setNameTeamTask] = useState([]);
    const [emailUserTask, setEmailUserTask] = useState([]);

    const fecthTaskUser = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const response = await axios.get(`http://10.0.2.2:3002/Tasks/findTaskByUser/${email}`);
            setIdTask(response.data.taskId);
            setDescriptionTask(response.data.taskDescription);
            setFinishDateTask(response.data.taskFinishDate);
            setIdTeamTask(response.data.taskIdTeam);
            setEmailUserTask(response.data.taskEmailUser);
            setNameTask(response.data.taskName);
            setStartDateTask(response.data.taskStartDate);
            setStatusTask(response.data.taskStatus);
            setNameTeamTask(response.data.taskTeamName);
        } catch (error) {
            //setError("No se pudo cargar las tareas");
            //setModalVisible(true);
        }
    };
    useEffect(() => {
        fetchDataUser();
        fetchOwnerProjectsUser();
        fechtTeamUser();
        fecthTaskUser();
    }, []);
    useEffect(() => {
        fetchDataUser();
    }, [userName]);
    useEffect(() => {
        fetchOwnerProjectsUser();
    }, [nameProject]);
    useEffect(() => {
        fechtTeamUser();
    }, [nameTeam]);
    useEffect(() => {
        fecthTaskUser();
    }, [nameTask]);

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
                            <Text style={styleText.header}>{userName} {userLastName}</Text>
                        </View>
                        <View style={styleBox.iconHeader}>
                            <Ionicons name="notifications" size={30} color="#0c04b6" />
                        </View>
                    </View>
                </View>
                {/* Contenedor de Mis Proyectos */}

                <View style={styleBox.dataHome}>
                    {/* Titulo del contenedor */}
                    <View style={styleBox.dataTitle}>
                        <Text style={styleText.titleOne}>Mis Proyectos</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("ProjectUser")}>
                            <Text style={styleText.titleTwo}>Ver Todos</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Componentes del contenedor */}

                    {idProject.length === 0 ? (
                        <View>
                            <View style={[styleBox.infoBoton]}>
                                <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                    <Feather name="alert-triangle" size={34} color="#da1a29" style={{ marginRight: 10 }} />
                                    <Text style={styleText.titleOne}>No tienes proyectos como Owner</Text>
                                </View>

                            </View>
                            <Text style={{ marginTop: 10 }}>Nota: Para crear un proyecto, dirigete a "Ver todos"</Text>
                        </View>


                    ) : (
                        <ScrollView horizontal>
                            <View>
                                {idProject.slice(0, 3).map((item, index) => (
                                    <View key={index}>
                                        <View style={styleBox.dataBox} key={index}>
                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 15, width: 350 }}>
                                                <View style={{ width: 260 }}>
                                                    <Text style={{ fontSize: 30 }}>{nameProject[index]}</Text>
                                                    <View style={[{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }, styleBox.infoTask]}>
                                                        <Ionicons name="ios-qr-code" size={24} color="black" style={{ marginRight: 5 }} />
                                                        <Text>{idProject[index]}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <TouchableOpacity style={{ backgroundColor: '#0c04b6', borderRadius: 5, width: 40, alignItems: 'center', height: 90, justifyContent: 'center' }} onPress={() => {
                                                        navigation.navigate("DataProject");
                                                        AsyncStorage.setItem('idProject', idProject[index]);
                                                        AsyncStorage.setItem('option', 'false');
                                                    }}>
                                                        <AntDesign name="caretright" size={30} color="white" />
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    )}


                </View>
                {/* Contenedor de Mis Equipos */}
                <View style={styleBox.dataHome}>
                    {/* Titulo del contenedor */}
                    <View style={styleBox.dataTitle}>
                        <Text style={styleText.titleOne}>Mis Equipos</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("MyTeamsPage")}>
                            <Text style={styleText.titleTwo}>Ver Todos</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        {/* Componentes del contenedor : Mis Equipos */}
                        {idTeam.length === 0 ? (
                            <View>
                                <View style={[styleBox.infoBoton]}>
                                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                        <Feather name="alert-triangle" size={34} color="#da1a29" style={{ marginRight: 10 }} />
                                        <Text style={styleText.titleOne}>No tienes equipos</Text>
                                    </View>

                                </View>
                                <Text style={{ marginTop: 10 }}>Nota: Para crear un equipo, dirigete a "Ver todos"</Text>
                            </View>
                        ) : (
                            <ScrollView horizontal>
                                {idTeam.slice(0, 3).map((item, index) => (
                                    <View key={index}>
                                        <View style={styleBox.dataBox}>
                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 15, width: 350 }}>
                                                <View style={{ width: 260 }}>
                                                    <Text style={{ fontSize: 25 }}>{nameTeam[index]}</Text>
                                                    <View style={[{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }, styleBox.infoTask]}>
                                                        <Ionicons name="ios-qr-code" size={24} color="black" style={{ marginRight: 5 }} />
                                                        <Text>{idTeam[index]}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <TouchableOpacity style={{ backgroundColor: '#0c04b6', borderRadius: 5, width: 40, alignItems: 'center', height: 70, justifyContent: 'center' }} onPress={() => {
                                                        navigation.navigate("DataTeamPage");
                                                        AsyncStorage.setItem('nameTeam', nameTeam[index]);
                                                        AsyncStorage.setItem('idTeam', idTeam[index]);
                                                    }}>
                                                        <AntDesign name="caretright" size={35} color="white" />
                                                    </TouchableOpacity>
                                                </View>

                                            </View>

                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        )}

                    </View>
                </View>
                {/* Contenedor de Mis Tareas */}
                <View style={styleBox.dataHomeTask}>
                    {/* Titulo del contenedor */}
                    <View style={styleBox.dataTitle}>
                        <Text style={styleText.titleOne}>Mis Tareas</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("UserTask")}>
                            <Text style={styleText.titleTwo}>Ver Todos</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {idTask.length === 0 ? (
                            <View>
                                <View style={[styleBox.infoBoton]}>
                                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                        <Feather name="alert-triangle" size={34} color="#da1a29" style={{ marginRight: 10 }} />
                                        <Text style={styleText.titleOne}>No tienes tareas</Text>
                                    </View>

                                </View>
                                <Text style={{ marginTop: 10 }}>Nota: Para crear una tarea, debes crear un proyecto primero</Text>
                            </View>
                        ) : (
                            <View style={styleBox.listTask}>
                                {/* Hacer el map de la lista */}
                                <ScrollView horizontal>
                                    {idTask.map((item, index) => (
                                        <View key={index}>
                                            <View style={[styleBox.dataTask, { marginRight: 20 }]}>
                                                <Text style={{ fontSize: 25, fontWeight: '800', marginBottom: 5 }}>{nameTask[index]}</Text>
                                                <Text style={{ fontSize: 15, marginBottom: 10 }}>{descriptionTask[index]}</Text>
                                                <View style={[{ flexDirection: 'row', marginBottom: 10 }, styleBox.infoTask]}>
                                                    <FontAwesome5 name="user-alt" size={20} color="black" />
                                                    <Text style={{ fontSize: 15, justifyContent: 'center', marginLeft: 10 }}>{emailUserTask[index]}</Text>
                                                </View>
                                                <View style={[{ flexDirection: 'row', marginBottom: 10 }, styleBox.infoTask]}>
                                                    <MaterialIcons name="group" size={24} color="black" />
                                                    <Text style={{ fontSize: 15, justifyContent: 'center', marginLeft: 10 }}>{nameTeam[index]}</Text>
                                                </View>
                                                <View style={[{ flexDirection: 'row', marginBottom: 10 }, styleBox.infoTask]}>
                                                    <Zocial name="statusnet" size={22} color="black" />
                                                    <Text style={{ fontSize: 15, justifyContent: 'center', marginLeft: 10 }}>{statusTask[index]}</Text>
                                                </View>
                                                <View style={[{ flexDirection: 'row', marginBottom: 10 }, styleBox.infoTask]}>
                                                    <MaterialIcons name="date-range" size={24} color="black" />
                                                    <Text style={{ fontSize: 15, justifyContent: 'center', marginLeft: 10 }}>{startDateTask[index]}</Text>
                                                </View>
                                                <View style={[{ flexDirection: 'row', marginBottom: 10 }, styleBox.infoTask]}>
                                                    <Fontisto name="date" size={24} color="black" />
                                                    <Text style={{ fontSize: 15, justifyContent: 'center', marginLeft: 10 }}>{finishDateTask[index]}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </View>
                </View>
                <View style={{ height: 100 }}></View>
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