import { FlatList, ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { DataProjectProps } from "../../../types/types";
import styleGeneral from "../../public/styles/StyleGeneral";
import NavigationBar from "../common/navbar";
import styleProjectUser from "../../public/styles/StyleProject";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";

const DataProject: React.FC<DataProjectProps> = ({ navigation }) => {


    const [nameProject, setNameProject] = useState("");
    const [teamsProject, setTeamsProject] = useState<string[]>([]);

    const loadDataProject = async () => {
        try {
            const idProject = await AsyncStorage.getItem('idProject');
            console.log(idProject);
            const response = await axios.get(`http://10.0.2.2:3001/Project/findOneProject/${idProject}`);
            console.log(response.data);
            setNameProject(response.data.nameProject);
            setTeamsProject(response.data.teamsProject);


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadDataProject();
    }, []);

    return (
        <View style={styleGeneral.container}>
            <View style={styleProjectUser.boxHeader}>
                <Text style={styleGeneral.titleHeader}>Proyecto {nameProject}</Text>
                <TouchableOpacity style={styleGeneral.icon} onPress={() => navigation.navigate("EditProject")}>
                    <Image
                        source={require('../../public/icons/cuadrado-de-la-pluma.png')}
                        style={styleGeneral.icon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <ScrollView style={styleProjectUser.boxContainer2}>
                <TouchableOpacity style={styleProjectUser.boxBottom} onPress={() => navigation.navigate("HomePage")}>
                    <Text style={styleGeneral.texBottom}>Agregar equipo</Text>
                </TouchableOpacity>
                <Text style={styleProjectUser.textTitle2}>Equipos</Text>
                <View style={styleProjectUser.boxList}>
                    <ScrollView>
                        {teamsProject.map((item, index) => (
                            <View key={index}>
                                <View style={styleGeneral.boxItemList}>
                                    <Text style={styleGeneral.textSecundary}>{item}</Text>
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
                    <Text style={styleGeneral.texBottom}>Agregar Tareas</Text>
                </TouchableOpacity>
                <Text style={styleProjectUser.textTitle}>Tareas</Text>
                <View style={styleProjectUser.boxList}>
                    <ScrollView>

                    </ScrollView>

                </View>

            </ScrollView>




            <View style={styleGeneral.footer}>
                <NavigationBar navigation={navigation} />
            </View>
        </View>
    );

}
export default DataProject;