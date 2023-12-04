import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { ProjectUserProps } from "../../../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import styleBox from "../../public/styles/styleBox";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import styleText from "../../public/styles/styleText";



const ProjectUser: React.FC<ProjectUserProps> = ({ navigation }) => {
    const [option, setOption] = useState(false);

    const [nameProjects, setNameProjects] = useState([]);
    const [idProjects, setIdProjects] = useState([]);


    const [participesProjects, setParticipesProjects] = useState([]);
    const [idParticipesProjects, setIdParticipesProjects] = useState([]);

    /* Aqui pido los projects del Owner*/

    const loadMyProjects = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const response = await axios.get(`http://10.0.2.2:3001/Project/findProjectOwner/${email}`);

            setNameProjects(response.data.nameProjects);
            setIdProjects(response.data.idProjects);


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
        <View style={styleBox.containerPage}>
            <View style={styleBox.headerPage}>
                <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 50 }} />
                </TouchableOpacity>
                <Text style={styleText.header}>Proyectos Usuario</Text>
            </View>
            <View style={styleBox.contentPage}>
                <View style={styleBox.dataTitle}>
                    <View style={styleBox.option}>
                        <TouchableOpacity onPress={() => setOption(false)}>
                            <Text style={styleText.titleOne}>Owner</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styleBox.option}>
                        <TouchableOpacity onPress={() => setOption(true)}>
                            <Text style={styleText.titleOne}>Participante</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>

                    {/* Projectos como Owner */}

                    {option == false ? (
                        <View>
                            <View style={styleBox.dataTitle}>
                                <Text style={styleText.titleOne}>Mis proyectos como Owner</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("CreateProject")}>
                                    <Ionicons name="md-add-circle-sharp" size={40} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={styleBox.dataList}>
                                <ScrollView>
                                    {nameProjects.map((item, index) => (
                                        <View style={styleBox.listBoton} key={index}>
                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 20, width: 350 }}>
                                                <View style={{ width: 260 }}>
                                                    <Text style={{ fontSize: 30 }}>{item}</Text>
                                                    <View style={styleBox.codeBoton}>
                                                        <Text>Codigo: {idProjects[index]}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <TouchableOpacity onPress={() => {
                                                        navigation.navigate("DataProject");
                                                        AsyncStorage.setItem('idProject', idProjects[index]);
                                                        AsyncStorage.setItem('option', 'false');
                                                    }}>
                                                        <AntDesign name="caretright" size={35} color="black" style={{ paddingBottom: 5 }} />
                                                    </TouchableOpacity>
                                                    <MaterialIcons name="edit" size={35} color="black" style={{ paddingBottom: 5 }} />

                                                </View>

                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>

                        </View>
                    ) : (

                        <View>

                            {/* Projectos como Miembro */}

                            <View style={styleBox.dataTitle}>
                                <Text style={styleText.titleOne}>Mis Proyectos como Miembro</Text>
                            </View>
                            <View style={styleBox.dataList}>
                                <ScrollView>
                                    {participesProjects.map((item, index) => (
                                        <View style={styleBox.listBoton} key={index}>
                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 20, width: 350 }}>
                                                <View style={{ width: 260 }}>
                                                    <Text style={{ fontSize: 30 }}>{item}</Text>
                                                    <View style={styleBox.codeBoton}>
                                                        <Text>Codigo: {idParticipesProjects[index]}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <TouchableOpacity onPress={() => {
                                                        navigation.navigate("DataProject");
                                                        AsyncStorage.setItem('idProject', idParticipesProjects[index]);
                                                        AsyncStorage.setItem('option', 'true');
                                                    }}>
                                                        <AntDesign name="caretright" size={35} color="black" style={{ paddingBottom: 5 }} />
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
export default ProjectUser;

/*
*
 
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
                                            onPress={() => { navigation.navigate("DataProject"), AsyncStorage.setItem('idProject', idProjects[index]), console.log(idProjects[index]) }}
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
                </ScrollView>
            </View>
        </View>
  
  
 */