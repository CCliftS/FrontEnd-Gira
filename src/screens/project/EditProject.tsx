import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { EditEmailPageProps } from "../../../types/types";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styleBox from "../../public/styles/styleBox";
import { Feather, Ionicons } from "@expo/vector-icons";
import styleText from "../../public/styles/styleText";
import { set } from "date-fns";

const EditProject: React.FC<EditEmailPageProps> = ({ navigation }) => {
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');

    const hanleChangeProject = async (newName: string) => {
        try {
            const id = await AsyncStorage.getItem('idProject');
            const response = await axios.post(`http://10.0.2.2:3001/Project/updateProject`, {
                newName,
                id,
                newDescription,
            });
            navigation.navigate("DataProject");
        } catch (error) {
            setError("No se pudo actualizar el proyecto");
            setModalVisible(true);
        };
    }
    return (
        <View style={styleBox.container}>
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
                <TouchableOpacity onPress={() => navigation.navigate("DataProject")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="#0c04b6" style={{ paddingRight: 60 }} />
                </TouchableOpacity>
            </View>
            <View style={styleBox.headerEdit}>
                <Text style={styleText.headerBlack}>Editar Proyecto</Text>
                <Text style={styleText.infoEdit}>Aca puedes cambiar el nombre de tu proyecto y actualizar la descripción del mismo</Text>
            </View>
            <View style={styleBox.contentPage}>
                <Text style={styleText.titleOne}>Nombre del proyecto</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={newName}
                    onChangeText={(text: string) => setNewName(text)}
                />
                <View style={{ marginTop: 10 }}></View>
                <Text style={styleText.titleOne}>Descripción del proyecto</Text>
                <TextInput
                    style={[styleBox.listBoton, styleText.input]}
                    value={newDescription}
                    onChangeText={(text: string) => setNewDescription(text)}
                />
                <TouchableOpacity style={styleBox.botonConfirm} onPress={() => hanleChangeProject(newName)}>
                    <Text style={styleText.confirmEdit}>Confirmar cambios</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default EditProject;
