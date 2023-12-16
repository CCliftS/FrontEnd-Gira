import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from "react-native";
import { AddMemberTeamProps } from "../../../types/types";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styleBox from "../../public/styles/styleBox";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import styleText from "../../public/styles/styleText";
import { Dropdown } from "react-native-element-dropdown";
import { ENDPOINT_MS_TEMAMS } from "react-native-dotenv";

interface Role {
    label: string;
    value: string;
}

const AddMemberTeam: React.FC<AddMemberTeamProps> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [emailMember, setEmailMember] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const roles: Role[] = [
        { label: "Scrum Master", value: '1' },
        { label: "Frontend", value: '2' },
        { label: "Backend", value: '3' },
        { label: "QA", value: '4' },
        { label: "DevOps", value: '5' },
        { label: "Diseñador", value: '6' }
    ]
    const handleAddMember = async (email: string, role: string) => {
        try {

            const idTeam = await AsyncStorage.getItem('idTeam');
            const nameTeam = await AsyncStorage.getItem('nameTeam');
            const response = await axios.post(`${ENDPOINT_MS_TEMAMS}/Member/addMemberTeam`, {
                email,
                role,
                idTeam,
                nameTeam
            });
            navigation.navigate("DataTeamPage");
        } catch (error) {
            setError("No se pudo agregar el miembro");
            setModalVisible(true);
        }
    };
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
                <TouchableOpacity onPress={() => navigation.navigate("DataTeamPage")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 50 }} />
                </TouchableOpacity>
                <Text style={styleText.header}>Nuevo Miembro</Text>
            </View>
            <View style={styleBox.contentPage}>
                <Text style={styleText.titleOne}>Correo electronico</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={emailMember}
                    onChangeText={(text: string) => setEmailMember(text)}
                />
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
                <TouchableOpacity style={styleBox.botonEdit} onPress={() => handleAddMember(emailMember, role)}>
                    <Text style={styleText.titleOne}>Agregar Miembro</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default AddMemberTeam;
