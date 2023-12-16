import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { EditEmailPageProps } from "../../../types/types";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, Ionicons } from "@expo/vector-icons";
import styleBox from "../../public/styles/styleBox";
import styleText from "../../public/styles/styleText";
import { ENDPOINT_MS_TEMAMS } from "react-native-dotenv";

const EditTeam: React.FC<EditEmailPageProps> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [newName, setNewName] = useState<string>('');

    const hanleChangeTeamName = async (newName: string) => {
        try {
            const id = await AsyncStorage.getItem('idTeam');
            const response = await axios.put(`${ENDPOINT_MS_TEMAMS}/Teams/updateName/${id}`, {
                newName,
            });
            navigation.navigate("DataTeamPage");
        } catch (error) {
            setError("No se pudo actualizar el nombre del equipo");
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
                <TouchableOpacity onPress={() => navigation.navigate("DataTeamPage")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="#0c04b6" style={{ paddingRight: 60 }} />
                </TouchableOpacity>
            </View>
            <View style={styleBox.headerEdit}>
                <Text style={styleText.headerBlack}>Editar equipo</Text>
                <Text style={styleText.infoEdit}>Aca puedes cambiar el nombre de tu equipo. Ademas de crear roles y eliminar el equipo</Text>
            </View>
            <View style={styleBox.contentPage}>
                <Text style={styleText.titleOne}>Nombre del equipo</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={newName}
                    onChangeText={(text: string) => setNewName(text)}
                />
                <TouchableOpacity style={styleBox.botonConfirm} onPress={() => hanleChangeTeamName(newName)}>
                    <Text style={styleText.confirmEdit}>Confirmar cambios</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}
export default EditTeam;