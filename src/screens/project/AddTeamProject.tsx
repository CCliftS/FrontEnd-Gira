import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { AddTeamProjectProps } from "../../../types/types"
import { useState } from "react";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styleBox from "../../public/styles/styleBox";
import styleText from "../../public/styles/styleText";

const AddTeamProject: React.FC<AddTeamProjectProps> = ({ navigation }) => {
    const [idTeam, setIdTeam] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');

    const handleAddTeam = async (idTeam: string) => {
        try {

            const id = await AsyncStorage.getItem('idProject');
            const response = await axios.post(`http://10.0.2.2:3001/Project/addTeam`, {
                id,
                idTeam
            });
            navigation.navigate("DataProject");
        } catch (error) {
            setError("El equipo no existe");
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
                <TouchableOpacity onPress={() => navigation.navigate("DataProject")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 60 }} />
                </TouchableOpacity>
                <Text style={styleText.header}>Nuevo Equipo</Text>
            </View>
            <View style={styleBox.contentPage}>
                <Text style={styleText.titleOne}>Codigo del Equipo</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={idTeam}
                    onChangeText={(text: string) => setIdTeam(text)}
                />
                <TouchableOpacity style={styleBox.botonEdit} onPress={() => handleAddTeam(idTeam)}>
                    <Text style={styleText.titleOne}>Agregar Equipo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default AddTeamProject