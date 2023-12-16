import { Feather, FontAwesome, FontAwesome5, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import styleBox from "../../public/styles/styleBox";
import styleText from "../../public/styles/styleText";
import { TeamTaskProps } from "../../../types/types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENDPOINT_MS_TASK } from "react-native-dotenv";


const TeamTask: React.FC<TeamTaskProps> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [estado, setEstado] = useState<string>("Pendiente");

    const [idTask, setIdTask] = useState<string[]>([]);
    const [descriptionTask, setDescriptionTask] = useState<string[]>([]);
    const [emailUserTask, setEmailUserTask] = useState<string[]>([]);
    const [finishDateTask, setFinishDateTask] = useState<string[]>([]);
    const [idProjectTask, setIdProjectTask] = useState<string[]>([]);
    const [idTeamTask, setIdTeamTask] = useState<string[]>([]);
    const [nameTask, setNameTask] = useState<string[]>([]);
    const [startDateTask, setStartDateTask] = useState<string[]>([]);
    const [statusTask, setStatusTask] = useState<string[]>([]);
    const [nameTeam, setNameTeam] = useState<string[]>([]);

    const fecthTaskUser = async () => {
        try {
            const idTeam = await AsyncStorage.getItem('idTeam');
            const response = await axios.get(`${ENDPOINT_MS_TASK}/Tasks/findTaskByTeam/${idTeam}`);
            setIdTask(response.data.taskId);
            setDescriptionTask(response.data.taskDescription);
            setEmailUserTask(response.data.taskEmailUser);
            setFinishDateTask(response.data.taskFinishDate);
            setIdProjectTask(response.data.taskIdProject);
            setIdTeamTask(response.data.taskIdTeam);
            setNameTask(response.data.taskName);
            setStartDateTask(response.data.taskStartDate);
            setStatusTask(response.data.taskStatus);
            setNameTeam(response.data.taskTeamName);
        } catch (error) {
            setError("No se pudo cargar las tareas del equipo");
            setModalVisible(true);
        }
    };
    useEffect(() => {
        fecthTaskUser();
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
                <Text style={styleText.header}>Tareas Usuario</Text>
            </View>
            <View style={styleBox.contentPage}>
                <View style={{ width: 225, justifyContent: 'space-between', flexDirection: 'row' }}>
                    {estado === "Pendiente" ? (
                        <View style={[styleBox.option2, { marginRight: 10 }]}>
                            <TouchableOpacity onPress={() => setEstado("Pendiente")}>
                                <Text style={styleText.confirmEdit}>Pendiente</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={[styleBox.option, { marginRight: 10 }]}>
                            <TouchableOpacity onPress={() => setEstado("Pendiente")}>
                                <Text style={styleText.titleOne}>Pendiente</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {estado === "Proceso" ? (
                        <View style={[styleBox.option2, { marginRight: 10 }]}>
                            <TouchableOpacity onPress={() => setEstado("Proceso")}>
                                <Text style={styleText.confirmEdit}>Proceso</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={[styleBox.option, { marginRight: 10 }]}>
                            <TouchableOpacity onPress={() => setEstado("Proceso")}>
                                <Text style={styleText.titleOne}>Proceso</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {estado === "Terminado" ? (
                        <View style={[styleBox.option2, { marginRight: 10 }]}>
                            <TouchableOpacity onPress={() => setEstado("Terminado")}>
                                <Text style={styleText.confirmEdit}>Terminado</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={[styleBox.option, { marginRight: 10 }]}>
                            <TouchableOpacity onPress={() => setEstado("Terminado")}>
                                <Text style={styleText.titleOne}>Terminado</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                {estado === "Pendiente" && <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styleText.titleOne, { marginTop: 10 }]}>Lista de Tareas {estado}</Text>
                    </View>
                    <View style={styleBox.listTask}>
                        {/* Hacer el map de la lista */}
                        <ScrollView>
                            {nameTask.map((item, index) => (
                                <View key={index}>
                                    {statusTask[index] === "Pendiente" && <View style={styleBox.dataTask}>
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
                                            <MaterialIcons name="date-range" size={24} color="black" />
                                            <Text style={{ fontSize: 15, justifyContent: 'center', marginLeft: 10 }}>{startDateTask[index]}</Text>
                                        </View>
                                        <View style={[{ flexDirection: 'row', marginBottom: 10 }, styleBox.infoTask]}>
                                            <Fontisto name="date" size={24} color="black" />
                                            <Text style={{ fontSize: 15, justifyContent: 'center', marginLeft: 10 }}>{finishDateTask[index]}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                            <TouchableOpacity style={{ backgroundColor: '#0c04b6', borderRadius: 10, width: 80, alignItems: 'center', height: 40, justifyContent: 'center' }} onPress={() => { navigation.navigate("CommentTask");; AsyncStorage.setItem('idTask', idTask[index]); AsyncStorage.setItem('nav', "TeamTask") }}>
                                                <FontAwesome name="comment" size={24} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>}

                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>}
                {estado === "Proceso" && <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styleText.titleOne, { marginTop: 10 }]}>Lista de Tareas {estado}</Text>
                    </View>
                    <View style={styleBox.listTask}>
                        {/* Hacer el map de la lista */}
                        <ScrollView>
                            {nameTask.map((item, index) => (
                                <View key={index}>
                                    {statusTask[index] === "Proceso" && <View style={styleBox.dataTask}>
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
                                            <MaterialIcons name="date-range" size={24} color="black" />
                                            <Text style={{ fontSize: 15, justifyContent: 'center', marginLeft: 10 }}>{startDateTask[index]}</Text>
                                        </View>
                                        <View style={[{ flexDirection: 'row', marginBottom: 10 }, styleBox.infoTask]}>
                                            <Fontisto name="date" size={24} color="black" />
                                            <Text style={{ fontSize: 15, justifyContent: 'center', marginLeft: 10 }}>{finishDateTask[index]}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                            <TouchableOpacity style={{ backgroundColor: '#0c04b6', borderRadius: 10, width: 80, alignItems: 'center', height: 40, justifyContent: 'center' }} onPress={() => { navigation.navigate("CommentTask"); AsyncStorage.setItem('idTask', idTask[index]); AsyncStorage.setItem('nav', "TeamTask") }}>
                                                <FontAwesome name="comment" size={24} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>}

                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>}
                {estado === "Terminado" && <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styleText.titleOne, { marginTop: 10 }]}>Lista de Tareas {estado}</Text>
                    </View>
                    <View style={styleBox.listTask}>
                        {/* Hacer el map de la lista */}
                        <ScrollView>
                            {nameTask.map((item, index) => (
                                <View key={index}>
                                    {statusTask[index] === "Terminado" && <View style={styleBox.dataTask}>
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
                                            <MaterialIcons name="date-range" size={24} color="black" />
                                            <Text style={{ fontSize: 15, justifyContent: 'center', marginLeft: 10 }}>{startDateTask[index]}</Text>
                                        </View>
                                        <View style={[{ flexDirection: 'row', marginBottom: 10 }, styleBox.infoTask]}>
                                            <Fontisto name="date" size={24} color="black" />
                                            <Text style={{ fontSize: 15, justifyContent: 'center', marginLeft: 10 }}>{finishDateTask[index]}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                            <TouchableOpacity style={{ backgroundColor: '#0c04b6', borderRadius: 10, width: 80, alignItems: 'center', height: 40, justifyContent: 'center' }} onPress={() => { navigation.navigate("CommentTask"); AsyncStorage.setItem('idTask', idTask[index]); AsyncStorage.setItem('nav', "TeamTask") }}>
                                                <FontAwesome name="comment" size={24} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>}

                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>}
            </View>
        </View>
    );
};
export default TeamTask;