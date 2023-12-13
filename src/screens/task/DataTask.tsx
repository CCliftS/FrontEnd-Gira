import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { DataTaskProps } from "../../../types/types";
import styleBox from "../../public/styles/styleBox";
import { Ionicons, FontAwesome5, MaterialIcons, AntDesign, FontAwesome } from "@expo/vector-icons";
import styleText from "../../public/styles/styleText";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface Task {
    __v: number;
    _id: string;
    description: string;
    email_user: string;
    finish_date: string;
    id_project: string;
    id_team: string;
    name: string;
    start_date: string;
    status: string;
}
const DataTask: React.FC<DataTaskProps> = ({ navigation }) => {


    const [estado, setEstado] = useState("");
    const [option, setOption] = useState("");

    const loadData = async () => {
        setOption(await AsyncStorage.getItem('option') ?? '');

    };
    const [idTask, setIdTask] = useState([]);
    const [descriptionTask, setDescriptionTask] = useState([]);
    const [emailUserTask, setEmailUserTask] = useState([]);
    const [finishDateTask, setFinishDateTask] = useState([]);
    const [idProjectTask, setIdProjectTask] = useState([]);
    const [idTeamTask, setIdTeamTask] = useState([]);
    const [nameTask, setNameTask] = useState([]);
    const [startDateTask, setStartDateTask] = useState([]);
    const [statusTask, setStatusTask] = useState([]);

    const fecthTaskStatus = async () => {
        try {
            const idProject = await AsyncStorage.getItem('idProject');
            const response = await axios.get(`http://10.0.2.2:3002/Tasks/getProjectTasks/${idProject}`);
            setIdTask(response.data.taskId);
            setDescriptionTask(response.data.taskDescription);
            setEmailUserTask(response.data.taskEmailUser);
            setFinishDateTask(response.data.taskFinishDate);
            setIdProjectTask(response.data.taskIdProject);
            setIdTeamTask(response.data.taskIdTeam);
            setNameTask(response.data.taskName);
            setStartDateTask(response.data.taskStartDate);
            setStatusTask(response.data.taskStatus);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        loadData();
        fecthTaskStatus();
    }, []);
    return (
        <View style={styleBox.containerPage}>
            <View style={styleBox.headerPage}>
                <TouchableOpacity onPress={() => navigation.navigate("DataProject")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 60 }} />
                </TouchableOpacity>
                <Text style={styleText.header}>Gestión Tareas</Text>
            </View>
            <View style={styleBox.contentPage}>
                <View style={{ width: 225, justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={[styleBox.option, { marginRight: 10 }]}>
                        <TouchableOpacity onPress={() => setEstado("Pendiente")}>
                            <Text style={styleText.titleOne}>Pendiente</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styleBox.option, { marginRight: 10 }]}>
                        <TouchableOpacity onPress={() => setEstado("Proceso")}>
                            <Text style={styleText.titleOne}>Proceso</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styleBox.option, { marginRight: 10 }]}>
                        <TouchableOpacity onPress={() => setEstado("Terminado")}>
                            <Text style={styleText.titleOne}>Terminado</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    {/* True para participantes, false para Owner */}
                    {option === 'true' ? (
                        <View>
                            {estado === "Pendiente" && <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styleText.titleOne}>Lista de Tareas {estado}</Text>
                                </View>
                                <View style={styleBox.listTask}></View>
                            </View>}
                            {estado === "Proceso" && <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styleText.titleOne}>Lista de Tareas {estado}</Text>
                                </View>
                            </View>}
                            {estado === "Terminado" && <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styleText.titleOne}>Lista de Tareas {estado}</Text>
                                </View>
                            </View>}
                            {/* Aqui deben ir todas las tareas del proyecto*/}
                        </View>
                    ) : (
                        <View>
                            {estado === "Pendiente" && <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styleText.titleOne}>Lista de Tareas {estado}</Text>
                                </View>
                                <View style={styleBox.listTask}>
                                    {/* Hacer el map de la lista */}
                                    <ScrollView>
                                        {nameTask.map((item, index) => (

                                            <View key={index}>
                                                {statusTask[index] === "Pendiente" && <View style={styleBox.dataTask}>
                                                    <Text style={{ fontSize: 25, fontWeight: '800', marginBottom: 5 }}>{nameTask[index]}</Text>
                                                    <Text style={{ fontSize: 15, marginBottom: 10 }}>{ }</Text>
                                                    <View style={[{ flexDirection: 'row', marginBottom: 10 }, styleBox.infoTask]}>
                                                        <FontAwesome5 name="user-alt" size={20} color="black" />
                                                        <Text style={{ fontSize: 15, justifyContent: 'center', marginLeft: 10 }}>{ }</Text>
                                                    </View>
                                                    <View style={[{ flexDirection: 'row', marginBottom: 10 }, styleBox.infoTask]}>
                                                        <MaterialIcons name="group" size={24} color="black" />
                                                        <Text style={{ fontSize: 15, justifyContent: 'center', marginLeft: 10 }}>Nombre equipo ? </Text>
                                                    </View>
                                                    <View style={[{ flexDirection: 'row', marginBottom: 10 }, styleBox.infoTask]}>
                                                        <MaterialIcons name="date-range" size={24} color="black" />
                                                        <Text style={{ fontSize: 15, justifyContent: 'center', marginLeft: 10 }}>17-10-2023</Text>
                                                        <Text style={{ fontSize: 15, justifyContent: 'center', marginLeft: 10 }}>27-12-2023</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                                        <TouchableOpacity style={{ backgroundColor: '#ffc107', borderRadius: 10, width: 80, alignItems: 'center', height: 40, justifyContent: 'center' }} onPress={() => navigation.navigate("DataProject")}>
                                                            <MaterialIcons name="edit" size={24} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ backgroundColor: '#da1a29', borderRadius: 10, width: 80, alignItems: 'center', height: 40, justifyContent: 'center' }} onPress={() => navigation.navigate("DataProject")}>
                                                            <FontAwesome5 name="trash" size={24} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ backgroundColor: '#0c04b6', borderRadius: 10, width: 80, alignItems: 'center', height: 40, justifyContent: 'center' }} onPress={() => navigation.navigate("CommentTask")}>
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
                                    <Text style={styleText.titleOne}>Lista de Tareas {estado}</Text>
                                </View>
                            </View>}
                            {estado === "Terminado" && <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styleText.titleOne}>Lista de Tareas {estado}</Text>
                                </View>
                            </View>}
                            {/* Aqui deben ir todas las tareas del proyecto*/}
                            <TouchableOpacity style={styleBox.botonEdit} onPress={() => navigation.navigate("CreateTask")}>
                                <Text style={styleText.titleOne}>Agregar nueva tarea</Text>
                            </TouchableOpacity>
                        </View>

                    )
                    }
                </View>

            </View>

        </View>

    );
};
export default DataTask;
