import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import { CreateTeamProps } from "../../../types/types";
import styleBox from "../../public/styles/styleBox";
import { Feather, Ionicons } from "@expo/vector-icons";
import styleText from "../../public/styles/styleText";
import { useState } from "react";
import { ca } from "date-fns/locale";

const CreateTeam: React.FC<CreateTeamProps> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');

    const handleCreateTeam = async (nameTeam: string) => {
        try {

        } catch (error) {
            setError("No se creo el equipo");
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