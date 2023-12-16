import { FlatList, ScrollView, View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { DataProjectProps } from "../../../types/types";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styleBox from "../../public/styles/styleBox";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import styleText from "../../public/styles/styleText";
import { ENDPOINT_MS_TEMAMS } from "react-native-dotenv";


const DataProject: React.FC<DataProjectProps> = ({ navigation }) => {
    const [option, setOption] = useState<string>("");
    const [idProject, setIdProject] = useState<string>("");

    const [nameProject, setNameProject] = useState<string>("");
    const [teamProjects, setTeamProjects] = useState<string[]>([]);
    const [idTeams, setIdTeams] = useState<string[]>([]);

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [modalDeleteTeam, setModalDeleteTeam] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<string>('');

    const [modalDeleteProject, setModalDeleteProject] = useState<boolean>(false);

    const loadDataProject = async () => {
        try {
            const idProject = await AsyncStorage.getItem('idProject');
            const response = await axios.get(`${ENDPOINT_MS_TEMAMS}/Project/findOneProject/${idProject}`);
            setNameProject(response.data.nameProject);
            setTeamProjects(response.data.teamsNames);
            setIdTeams(response.data.teamProjects);

        } catch (error) {
            setError("No se cargaron los datos del proyecto");
            setModalVisible(true);

        }
    }
    const handleDeleteTeam = async (idTeam: string) => {
        try {
            const idProject = await AsyncStorage.getItem('idProject');
            console.log(idTeam, idProject);
            const response = await axios.delete(`${ENDPOINT_MS_TEMAMS}/Project/removeTeam/${idProject}/${idTeam}`);
            navigation.navigate("ProjectUser");
        } catch (error) {
            setError("No se elimino el equipo");
            setModalVisible(true);
        }

    };
    const handleDeleteProject = async () => {
        try {
            const id = await AsyncStorage.getItem('idProject');
            console.log(id);
            const response = await axios.delete(`${ENDPOINT_MS_TEMAMS}/Project/removeProject/${id}`);
            AsyncStorage.removeItem('idProject');
            navigation.navigate("ProjectUser");
        } catch (error) {
            setError("No se elimino el proyecto");
            setModalVisible(true);
        };
    }
    const loadData = async () => {
        setOption(await AsyncStorage.getItem('option') ?? '');
        setIdProject(await AsyncStorage.getItem('idProject') ?? '');
    };

    useEffect(() => {
        loadDataProject();
        loadData();
    }, []);
    useEffect(() => {
        loadDataProject();
    }, [teamProjects]);
    useEffect(() => {
        loadDataProject();
    }, [nameProject]);

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
            <Modal
                animationType="slide"
                visible={modalDeleteTeam}
                transparent={true}
            >
                <View style={styleBox.modalCenter}>
                    <View style={styleBox.modalDelete}>
                        <MaterialCommunityIcons name="delete-restore" size={54} color="#da1a29" />
                        <Text style={styleText.titleOne}>¿Estas seguro de eliminar?</Text>
                        <TouchableOpacity style={styleBox.botonDelete} onPress={() => { setModalDeleteTeam(false); handleDeleteTeam(idDelete) }}>
                            <Text style={styleText.confirmEdit}>Si</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleBox.botonEdit} onPress={() => setModalDeleteTeam(false)}>
                            <Text style={styleText.confirmEdit}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                visible={modalDeleteProject}
                transparent={true}
            >
                <View style={styleBox.modalCenter}>
                    <View style={styleBox.modalDelete}>
                        <MaterialCommunityIcons name="delete-restore" size={54} color="#da1a29" />
                        <Text style={styleText.titleOne}>¿Estas seguro de eliminar?</Text>
                        <TouchableOpacity style={styleBox.botonDelete} onPress={() => { setModalDeleteProject(false); handleDeleteProject() }}>
                            <Text style={styleText.confirmEdit}>Si</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleBox.botonEdit} onPress={() => setModalDeleteProject(false)}>
                            <Text style={styleText.confirmEdit}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styleBox.headerPage}>
                <TouchableOpacity onPress={() => navigation.navigate("ProjectUser")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 60 }} />
                </TouchableOpacity>
                <Text style={styleText.header}>Datos Proyecto</Text>
            </View>
            <View style={styleBox.contentPage}>
                <View style={{ marginTop: 20 }} >
                    {/* True para participantes, false para Owner */}
                    {option === 'true' ? (
                        <View>
                            <View>
                                <Text style={styleText.titleOne}>Nombre del Proyecto</Text>
                            </View>
                            <View style={styleBox.infoBoton}>
                                <Text style={{ fontSize: 20 }}>{nameProject}</Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styleText.titleOne}>Equipos del Proyecto</Text>
                            </View>
                            <View style={styleBox.listMember}>
                                <ScrollView style={{ paddingTop: 10 }}>
                                    {teamProjects.map((item: any, index: any) => (
                                        <View style={[styleBox.listBoton, { paddingHorizontal: 20 }]} key={index} >
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View>
                                                    <Text style={styleText.titleOne}>{item}</Text>
                                                    <Text style={{ fontSize: 15 }}> Codigo: {idTeams[index]} </Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                            <TouchableOpacity style={styleBox.botonEdit} onPress={() => navigation.navigate("DataTask")}>
                                <Text style={styleText.titleOne}>Tareas del Proyecto</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styleText.titleOne}>Nombre del Proyecto</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("EditProject")}>
                                    <MaterialIcons name="edit" size={30} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={styleBox.infoBoton}>
                                <Text style={{ fontSize: 20 }}>{nameProject}</Text>
                            </View>
                            <View style={[styleBox.dataTitle, { marginTop: 15 }]}>
                                <Text style={styleText.titleOne}>Equipos del Proyecto</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("AddTeamProject")}>
                                    <Ionicons name="md-add-circle-sharp" size={30} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={styleBox.listMember}>
                                <ScrollView style={{ paddingTop: 10 }}>
                                    {teamProjects.map((item: any, index: any) => (
                                        <View style={[styleBox.listBoton, { paddingHorizontal: 20 }]} key={index} >
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <View>
                                                    <Text style={styleText.titleOne}>{item}</Text>
                                                    <Text style={{ fontSize: 15 }}> Codigo: {idTeams[index]} </Text>
                                                </View>
                                                <View style={{ marginLeft: 20 }}>
                                                    <TouchableOpacity onPress={() => { setIdDelete(idTeams[index]); setModalDeleteTeam(true) }}>
                                                        <MaterialIcons name="delete" size={28} color="black" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                            <TouchableOpacity style={styleBox.botonEdit} onPress={() => navigation.navigate("DataTask")}>
                                <Text style={styleText.titleOne}>Gestionar Tareas</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styleBox.botonDelete} onPress={() => setModalDeleteProject(true)}>
                                <Text style={styleText.titleOne}>Eliminar Proyecto</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>

    );


}
export default DataProject;
