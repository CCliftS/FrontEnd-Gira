import { View, Text, TouchableOpacity, Modal } from "react-native";
import { EditRolesProps } from "../../../types/types";
import styleBox from "../../public/styles/styleBox";
import { Feather, Ionicons } from "@expo/vector-icons";
import styleText from "../../public/styles/styleText";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ENDPOINT_MS_TEMAMS } from "react-native-dotenv";

interface Role {
    label: string;
    value: string;
}

const EditRoles: React.FC<EditRolesProps> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [role, setRole] = useState<string>('');
    const roles: Role[] = [
        { label: "Scrum Master", value: '1' },
        { label: "Frontend", value: '2' },
        { label: "Backend", value: '3' },
        { label: "QA", value: '4' },
        { label: "DevOps", value: '5' },
        { label: "Diseñador", value: '6' }
    ]
    const handleChangeRole = async (role: string) => {
        try {
            const idTeam = await AsyncStorage.getItem('idTeam');
            const email = await AsyncStorage.getItem('emailUser');
            const response = await axios.put(`${ENDPOINT_MS_TEMAMS}/Member/updateRole/${email}/${idTeam}`, {
                role,
            });
            navigation.navigate("DataTeamPage");
        } catch (error) {
            setError("No se pudo actualizar el rol");
            setModalVisible(true);
        }
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
                <Text style={styleText.headerBlack}>Editar rol usuario</Text>
                <Text style={styleText.infoEdit}>Aca puedes cambiar un rol de algun usuario segun sea necesario</Text>
            </View>

            <View style={styleBox.contentPage}>
                <Text style={[styleText.titleOne, { marginTop: 20 }]}>Rol del integrante</Text>
                <View style={styleBox.infoDropdown}>
                    <Dropdown
                        placeholderStyle={styleText.input}
                        selectedTextStyle={styleText.input}
                        data={roles}
                        labelField="label"
                        valueField="label"
                        placeholder="Selecciona un rol"
                        value={role}
                        onChange={item => {
                            setRole(item.label);
                        }}
                    />
                </View>
                <TouchableOpacity style={styleBox.botonConfirm} onPress={() => handleChangeRole(role)}>
                    <Text style={styleText.confirmEdit}>Confirmar cambios</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
export default EditRoles;