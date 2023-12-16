import { View, Text, ScrollView, TouchableOpacity, Image, Modal } from "react-native";
import { ProjectUserProps } from "../../../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import styleBox from "../../public/styles/styleBox";
import { Ionicons, AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import styleText from "../../public/styles/styleText";
import { ENDPOINT_MS_TEMAMS } from "react-native-dotenv";



const ProjectUser: React.FC<ProjectUserProps> = ({ navigation }) => {
    const [option, setOption] = useState<boolean>(false);

    const [nameProjects, setNameProjects] = useState<string[]>([]);
    const [idProjects, setIdProjects] = useState<string[]>([]);


    const [participedProjects, setParticipedProjects] = useState<string[]>([]);
    const [idParticipedProjects, setIdParticipedProjects] = useState<string[]>([]);

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    /* Aqui pido los projects del Owner*/

    const loadMyProjects = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const response = await axios.get(`${ENDPOINT_MS_TEMAMS}/Project/findProjectOwner/${email}`);

            setNameProjects(response.data.nameProjects);
            setIdProjects(response.data.idProjects);


        } catch (error) {
            setError("No se pudo cargar los proyectos");
            setModalVisible(true);
        }
    }
    const loadParticipatesProjects = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const response = await axios.get(`${ENDPOINT_MS_TEMAMS}/Project/findAllParticipatedProjects/${email}`);

            setParticipedProjects(response.data.participedProjects);
            setIdParticipedProjects(response.data.idParticipedProjects);

        } catch (error) {
            setError("No se pudo cargar los proyectos");
            setModalVisible(true);
        }
    }
    useEffect(() => {
        loadMyProjects();
        loadParticipatesProjects();
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
                <Text style={styleText.header}>Proyectos Usuario</Text>
            </View>
            <View style={styleBox.contentPage}>
                <View style={styleBox.dataTitle}>
                    {option == false && <View style={styleBox.option2}>
                        <TouchableOpacity onPress={() => setOption(false)}>
                            <Text style={styleText.confirmEdit}>Owner</Text>
                        </TouchableOpacity>
                    </View>}
                    {option == true && <View style={styleBox.option}>
                        <TouchableOpacity onPress={() => setOption(false)}>
                            <Text style={styleText.titleOne}>Owner</Text>
                        </TouchableOpacity>
                    </View>}
                    {option == false && <View style={styleBox.option}>
                        <TouchableOpacity onPress={() => setOption(true)}>
                            <Text style={styleText.titleOne}>Participante</Text>
                        </TouchableOpacity>
                    </View>}
                    {option == true && <View style={styleBox.option2}>
                        <TouchableOpacity onPress={() => setOption(true)}>
                            <Text style={styleText.confirmEdit}>Participante</Text>
                        </TouchableOpacity>
                    </View>}
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
                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 15, width: 350 }}>
                                                <View style={{ width: 260 }}>
                                                    <Text style={{ fontSize: 30 }}>{item}</Text>
                                                    <View style={[{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }, styleBox.infoTask]}>
                                                        <Ionicons name="ios-qr-code" size={24} color="black" style={{ marginRight: 5 }} />
                                                        <Text>{idProjects[index]}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <TouchableOpacity style={{ backgroundColor: '#0c04b6', borderRadius: 5, width: 40, alignItems: 'center', height: 90, justifyContent: 'center' }} onPress={() => {
                                                        navigation.navigate("DataProject");
                                                        AsyncStorage.setItem('idProject', idProjects[index]);
                                                        AsyncStorage.setItem('option', 'false');
                                                    }}>
                                                        <AntDesign name="caretright" size={30} color="white" />
                                                    </TouchableOpacity>
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
                                    {participedProjects.map((item, index) => (
                                        <View style={styleBox.listBoton} key={index}>
                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 15, width: 350 }}>
                                                <View style={{ width: 260 }}>
                                                    <Text style={{ fontSize: 30 }}>{item}</Text>
                                                    <View style={[{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }, styleBox.infoTask]}>
                                                        <Ionicons name="ios-qr-code" size={24} color="black" style={{ marginRight: 5 }} />
                                                        <Text>{idParticipedProjects[index]}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <TouchableOpacity style={{ backgroundColor: '#0c04b6', borderRadius: 5, width: 40, alignItems: 'center', height: 90, justifyContent: 'center' }} onPress={() => {
                                                        navigation.navigate("DataProject");
                                                        AsyncStorage.setItem('idProject', idParticipedProjects[index]);
                                                        AsyncStorage.setItem('option', 'true');
                                                    }}>
                                                        <AntDesign name="caretright" size={30} color="white" />
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
