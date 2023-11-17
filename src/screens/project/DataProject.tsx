import { FlatList, ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { DataProjectProps } from "../../../types/types";
import styleGeneral from "../../public/styles/StyleGeneral";
import NavigationBar from "../common/navbar";
import styleProjectUser from "../../public/styles/StyleProject";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const DataProject: React.FC<DataProjectProps> = ({ navigation }) => {


    const [nameProject, setNameProject] = useState("");
    const [teamProjects, setTeamProjects] = useState([]);
    const [idTeams, setIdTeams] = useState([]);

    const loadDataProject = async () => {
        try {
            const idProject = await AsyncStorage.getItem('idProject');
            const response = await axios.get(`http://10.0.2.2:3001/Project/findOneProject/${idProject}`);
            setNameProject(response.data.nameProject);
            setTeamProjects(response.data.teamsNames);
            setIdTeams(response.data.teamProjects);

        } catch (error) {
            console.log(error);
        }
    }
    const handleDeleteTeam = async (idTeam: string) => {
        try {
            const idProject = await AsyncStorage.getItem('idProject');
            console.log(idTeam, idProject);
            const response = await axios.delete(`http://10.0.2.2:3001/Project/removeTeam/${idProject}/${idTeam}`);
            navigation.navigate("DataProject");
        } catch (error) {
            console.log(error);
        }

    }
    useFocusEffect(
        useCallback(() => {
            loadDataProject();
        }, [teamProjects])
    );

    return (
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




            <View style={styleGeneral.footer}>
                <NavigationBar navigation={navigation} />
            </View>
        </View>
    );

}
export default DataProject;