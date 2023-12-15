import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from "react-native";
import { AddMemberTeamProps } from "../../../types/types";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styleBox from "../../public/styles/styleBox";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import styleText from "../../public/styles/styleText";
import { Dropdown } from "react-native-element-dropdown";



const AddMemberTeam: React.FC<AddMemberTeamProps> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');

    const [emailMember, setEmailMember] = useState('');
    const [role, setRole] = useState('');
    const roles = [
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
            const response = await axios.post(`http://10.0.2.2:3001/Member/addMemberTeam`, {
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

{/*
*
    <View style={styleGeneral.container}>
            <View style={styleGeneral.boxHeader}>
                <Text style={styleGeneral.titleHeader}>Creación de proyecto</Text>
            </View>
            <View style={styleGeneral.boxContainer}>
                <View style={styleTeamPage.boxDataItem}>
                    <Text style={styleTeamPage.textBox1}>Nombre del integrante</Text>
                    <TextInput
                        style={[styleTeamPage.boxDataItem2, styleGeneral.textSecundary]}
                        value={emailMember}
                        onChangeText={(text: string) => setEmailMember(text)}
                    />
                </View>
                <View style={styleTeamPage.boxDataItem}>
                    <Text style={styleTeamPage.textBox1}>Rol del integrante</Text>
                    <TextInput
                        style={[styleTeamPage.boxDataItem2, styleGeneral.textSecundary]}
                        value={role}
                        onChangeText={(text: string) => setRole(text)}
                    />
                </View>
                <TouchableOpacity style={styleGeneral.boxBottom1} onPress={() => hanleAddMember(emailMember, role)}>
                    <Text style={styleGeneral.texBottom}>Agregar miembro al equipo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleGeneral.boxBottom2} onPress={() => navigation.navigate("DataTeamPage")}>
                    <Text style={styleGeneral.texBottom}>Volver</Text>
                </TouchableOpacity>
            </View>
        </View>
*/}