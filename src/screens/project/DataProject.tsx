import { FlatList, ScrollView, View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { DataProjectProps } from "../../../types/types";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styleBox from "../../public/styles/styleBox";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import styleText from "../../public/styles/styleText";


const DataProject: React.FC<DataProjectProps> = ({ navigation }) => {
    const [option, setOption] = useState("");
    const [idProject, setIdProject] = useState("");

    const [nameProject, setNameProject] = useState("");
    const [teamProjects, setTeamProjects] = useState([]);
    const [idTeams, setIdTeams] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');

    const loadDataProject = async () => {
        try {
            const idProject = await AsyncStorage.getItem('idProject');
            const response = await axios.get(`http://10.0.2.2:3001/Project/findOneProject/${idProject}`);
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
            const response = await axios.delete(`http://10.0.2.2:3001/Project/removeTeam/${idProject}/${idTeam}`);
            navigation.navigate("DataProject");
        } catch (error) {
            setError("No se elimino el equipo");
            setModalVisible(true);
        }

    };
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
                                                    <TouchableOpacity onPress={() => handleDeleteTeam(idTeams[index])}>
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
                            <View style={styleBox.botonDelete}>
                                <Text style={styleText.titleOne}>Eliminar Proyecto</Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </View>

    );


}
export default DataProject;

{/**
    <View style={styleGeneral.container}>
            <View style={styleProjectUser.boxHeader}>
                <Text style={styleGeneral.titleHeader}>Proyecto " {nameProject} "</Text>
                <TouchableOpacity style={styleGeneral.icon} onPress={() => navigation.navigate("EditProject")}>
                    <Image
                        source={require('../../public/icons/cuadrado-de-la-pluma.png')}
                        style={styleGeneral.icon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <ScrollView style={styleProjectUser.boxContainer2}>
                <Text style={styleProjectUser.textTitle2}>Equipos</Text>
                <View style={styleProjectUser.boxList}>
                    <ScrollView>
                        {teamProjects.map((item, index) => (
                            <View key={index}>
                                <View style={styleGeneral.boxItemList}>
                                    <Text style={styleGeneral.textSecundary}>{item}</Text>
                                    <TouchableOpacity
                                        style={styleGeneral.icon}
                                        onPress={() => handleDeleteTeam(idTeams[index])}
                                    >
                                        <Image
                                            source={require('../../public/icons/circulo-cruzado.png')}
                                            style={styleGeneral.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}


                    </ScrollView>

                </View>
                <TouchableOpacity style={styleProjectUser.boxBottom} onPress={() => navigation.navigate("AddTeamProject")}>
                    <Text style={styleGeneral.texBottom}>Agregar equipo</Text>
                </TouchableOpacity>

                <Text style={styleProjectUser.textTitle}>Tareas</Text>
                <View style={styleProjectUser.boxList}>
                    <ScrollView>

                    </ScrollView>

                </View>
                <TouchableOpacity style={styleProjectUser.boxBottom} onPress={() => navigation.navigate("HomePage")}>
                    <Text style={styleGeneral.texBottom}>Agregar Tareas</Text>
                </TouchableOpacity>

                <View style={styleProjectUser.boxBottom}></View>

            </ScrollView>
        </View>
*/}