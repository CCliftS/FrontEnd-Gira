import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import { CreateTeamProps } from "../../../types/types";
import styleBox from "../../public/styles/styleBox";
import { Feather, Ionicons } from "@expo/vector-icons";
import styleText from "../../public/styles/styleText";
import { useState } from "react";
import { ca } from "date-fns/locale";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAsyncStorage } from "../../utils/localStorage";

const CreateTeam: React.FC<CreateTeamProps> = ({ navigation }) => {
    const email = useAsyncStorage('email');
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');
    const hanleCreateFirtsMember = async (email: string, role: string, idTeam: string, nameTeam: string) => {
        try {
            console.log(email, role, idTeam, nameTeam);
            const response = await axios.post(`http://10.0.2.2:3001/Member/addMemberTeam`, {
                email,
                role,
                idTeam,
                nameTeam
            })
            navigation.navigate("MyTeamsPage");
        } catch (error) {
            setError("No se pudo crear el equipo");
            setModalVisible(true);
        }
    }
    const handleCreateTeam = async (nameTeam: string) => {
        try {
            const response = await axios.post(`http://10.0.2.2:3001/Teams/createTeam`, {
                nameTeam,
            })

            const idTeam = response.data?._id;
            const role: string = "administrador";;

            hanleCreateFirtsMember(email, role, idTeam, nameTeam);
        } catch (error) {
            setError("No se pudo crear el equipo");
            setModalVisible(true);
        }
    }
    const [nameTeam, setNameTeam] = useState('');
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
                <TouchableOpacity onPress={() => navigation.navigate("MyTeamsPage")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 60 }} />
                </TouchableOpacity>
                <Text style={styleText.header}>Nuevo Equipo</Text>
            </View>
            <View style={styleBox.contentPage}>
                <Text style={styleText.titleOne}>Nombre del Equipo *</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={nameTeam}
                    onChangeText={(text: string) => setNameTeam(text)}
                />
                <TouchableOpacity style={styleBox.botonEdit} onPress={() => handleCreateTeam(nameTeam)}>
                    <Text style={styleText.titleOne}>Crear Proyecto</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default CreateTeam;