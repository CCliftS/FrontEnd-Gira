import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { ProjectUserProps } from "../../../types/types";
import styleGeneral from "../../public/styles/StyleGeneral";
import styleProjectUser from "../../public/styles/StyleProject";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import styleMyTeamsPage from "../../public/styles/StyleMyTeamsPage";


const ProjectUser: React.FC<ProjectUserProps> = ({ navigation }) => {

    const [nameProjects, setNameProjects] = useState([]);
    const [idProjects, setIdProjects] = useState([]);
    const [teamProjects, setTeamProjects] = useState([]);

    const [participesProjects, setParticipesProjects] = useState([]);
    const [idParticipesProjects, setIdParticipesProjects] = useState([]);

    /* Aqui pido los projects del Owner*/

    const loadMyProjects = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const response = await axios.get(`http://10.0.2.2:3001/Project/findProjectOwner/${email}`);

            setNameProjects(response.data.nameProjects);
            setIdProjects(response.data.idProjects);
            setTeamProjects(response.data.teamProjects);

        } catch (error) {
            console.log(error);
        }
    }
    const loadParticipatesProjects = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const response = await axios.get(`http://10.0.2.2:3001/Project/findAllParticipatedProjects/${email}`);

            setParticipesProjects(response.data.participesProjects);
            setIdParticipesProjects(response.data.idParticipesProjects)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadMyProjects();
        loadParticipatesProjects();
    }, []);

    return (
        <View style={styleGeneral.container}>
            <View style={styleProjectUser.boxContainer}>
                <ScrollView>
                    <Text style={styleProjectUser.textTitle}>Mis proyectos</Text>
                    <View style={styleProjectUser.boxList}>
                        <ScrollView>
                            {idProjects.map((item, index) => (
                                <View key={index}>
                                    <View style={styleGeneral.boxItemList}>
                                        <Text style={styleGeneral.textSecundary}>{nameProjects[index]}</Text>
                                        <TouchableOpacity
                                            style={styleGeneral.icon}
                                            onPress={() => { navigation.navigate("DataProject"), AsyncStorage.setItem('idProject', item), AsyncStorage.setItem('nameProject', nameProjects[index]) }}
                                        >
                                            <Image
                                                source={require('../../public/icons/angulo-circulo-derecha.png')}
                                                style={styleGeneral.icon}

                                            />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            ))}
                        </ScrollView>
                    </View>
                    <Text style={styleProjectUser.textTitle}>Proyectos participes</Text>
                    <View style={styleProjectUser.boxList}>
                        <ScrollView>
                            {idParticipesProjects.map((item, index) => (
                                <View key={index}>
                                    <View style={styleGeneral.boxItemList}>
                                        <Text style={styleGeneral.textSecundary}>{participesProjects[index]}</Text>
                                        <TouchableOpacity
                                            style={styleGeneral.icon}
                                        //onPress={() => navigation.navigate("DataProject")}
                                        >
                                            <Image
                                                source={require('../../public/icons/angulo-circulo-derecha.png')}
                                                style={styleGeneral.icon}

                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                    <TouchableOpacity style={styleProjectUser.boxBottom} onPress={() => navigation.navigate("HomePage")}>
                        <Text style={styleGeneral.texBottom}>Volver</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}
export default ProjectUser;