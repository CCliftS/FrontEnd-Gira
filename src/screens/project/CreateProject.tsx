import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import { CreateProjectProps } from "../../../types/types";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import axios from "axios";
import styleBox from "../../public/styles/styleBox";
import styleText from "../../public/styles/styleText";

const CreateProject: React.FC<CreateProjectProps> = ({ navigation }) => {
    const [nameProject, setNameProject] = useState('');
    const [teams, setTeams] = useState<string[]>([]);
    const [teamCode, setTeamCode] = useState('');
    const [description, setDescription] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');

    const hanleCreateProyect = async (nameProject: string, teamCode: string) => {
        try {
            const idOwner = await AsyncStorage.getItem('email');
            setTeams([...teams, teamCode]);
            const response = await axios.post(`http://10.0.2.2:3001/Project/createProject`, {
                nameProject,
                idOwner,
                description,
                teams: [...teams, teamCode]
            });
            navigation.navigate("HomePage");
        } catch (error) {
            setError("No se creo el proyecto");
            setModalVisible(true);
        }
    }

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
                <Text style={styleText.header}>Nuevo Proyecto</Text>
            </View>
            <View style={styleBox.contentPage}>
                <Text style={styleText.titleOne}>Nombre del Proyecto *</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={nameProject}
                    onChangeText={(text: string) => setNameProject(text)}
                />
                <Text style={[styleText.titleOne, { marginTop: 20 }]}>Descripcion (opcional)</Text>
                <TextInput
                    style={[styleBox.listBoton, { paddingHorizontal: 20 }, styleText.input]}
                    value={description}
                    onChangeText={(text: string) => setDescription(text)}
                />
                <Text style={[styleText.titleOne, { marginTop: 20 }]}>Codigo del Equipo *</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={teamCode}
                    onChangeText={(text: string) => setTeamCode(text)}
                />
                <Text style={{ marginTop: 15, textAlign: 'justify' }}>Recuerda que al crear un nuevo proyecto, no es posible tener un proyecto sin equipos</Text>
                <TouchableOpacity style={styleBox.botonEdit} onPress={() => hanleCreateProyect(nameProject, teamCode)}>
                    <Text style={styleText.titleOne}>Crear Proyecto</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default CreateProject;