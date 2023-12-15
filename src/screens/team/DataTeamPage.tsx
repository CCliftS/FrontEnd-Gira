import { View, Text, ScrollView, Image, TouchableOpacity, Modal } from "react-native";
import { DataTeamPageProps } from "../../../types/types";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styleBox from "../../public/styles/styleBox";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import styleText from "../../public/styles/styleText";
import * as Clipboard from 'expo-clipboard';


const DataTeamPage: React.FC<DataTeamPageProps> = ({ navigation }) => {
    const [copiedText, setCopiedText] = useState('');

    const copyToClipboard = async (text: string) => {
        await Clipboard.setStringAsync(text);
    };
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');
    const [modalDeleteTeam, setModalDeleteTeam] = useState(false);
    const [modalDeleteMember, setModalDeleteMember] = useState(false);
    const [idMember, setIdMember] = useState('');

    const [membersTeam, setMembersTeam] = useState([]);
    const [membersTeamId, setMembersTeamId] = useState([]);
    const [membersTeamRole, setMembersTeamRole] = useState([]);

    const [nameTeam, setNameTeam] = useState('');
    const [idTeam, setIdTeam] = useState('');
    const [option, setOption] = useState('');

    const handleDeleteTeam = async () => {
        try {
            const id = await AsyncStorage.getItem('idTeam');
            const response = await axios.delete(`http://10.0.2.2:3001/Member/deleteTeam/${id}`);
            navigation.navigate("MyTeamsPage");
        } catch (error) {
            setError("No se pudo eliminar el equipo");
            setModalVisible(true);
        }
    };
    const handleDeleteMember = async (id: string) => {
        try {
            const idTeam = await AsyncStorage.getItem('idTeam');
            const response = await axios.delete(`http://10.0.2.2:3001/Member/removeMember/${id}/${idTeam}`);
            navigation.navigate("DataTeamPage");
        } catch (error) {
            setError("No se pudo eliminar el miembro");
            setModalVisible(true);
        }
    }
    const loadMembersTeam = async () => {
        try {
            const idTeam = await AsyncStorage.getItem('idTeam');
            const response = await axios.get(`http://10.0.2.2:3001/Member/getMemberTeam/${idTeam}`);
            setMembersTeam(response.data.TeamsEmails);
            setMembersTeamId(response.data.nameId);
            setMembersTeamRole(response.data.memberRole);


        } catch (error) {
            setError("No se pudo cargar los miembros");
            setModalVisible(true);
        }
    };
    const loadData = async () => {
        setOption(await AsyncStorage.getItem('option') ?? '');
        setNameTeam(await AsyncStorage.getItem('nameTeam') ?? '');
        setIdTeam(await AsyncStorage.getItem('idTeam') ?? '');
    };

    //este carga el primer componente
    useEffect(() => {
        loadMembersTeam();
        loadData();
    }, []);
    //este se actualiza al cambiar el estado de membersTeam
    useEffect(() => {
        loadMembersTeam();
    }, [membersTeamRole]);

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
            <Modal
                animationType="slide"
                visible={modalDeleteMember}
                transparent={true}
            >
                <View style={styleBox.modalCenter}>
                    <View style={styleBox.modalDelete}>
                        <MaterialCommunityIcons name="delete-restore" size={54} color="#da1a29" />
                        <Text style={styleText.titleOne}>¿Estas seguro de eliminar?</Text>
                        <TouchableOpacity style={styleBox.botonDelete} onPress={() => { setModalDeleteMember(false); handleDeleteMember(idMember) }}>
                            <Text style={styleText.confirmEdit}>Si</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleBox.botonEdit} onPress={() => setModalDeleteMember(false)}>
                            <Text style={styleText.confirmEdit}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                visible={modalDeleteTeam}
                transparent={true}
            >
                <View style={styleBox.modalCenter}>
                    <View style={styleBox.modalDelete}>
                        <MaterialCommunityIcons name="delete-restore" size={54} color="#da1a29" />
                        <Text style={styleText.titleOne}>¿Estas seguro de eliminar?</Text>
                        <TouchableOpacity style={styleBox.botonDelete} onPress={() => { setModalDeleteTeam(false); handleDeleteTeam() }}>
                            <Text style={styleText.confirmEdit}>Si</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleBox.botonEdit} onPress={() => setModalDeleteTeam(false)}>
                            <Text style={styleText.confirmEdit}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styleBox.headerPage}>
                <TouchableOpacity onPress={() => navigation.navigate("MyTeamsPage")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 60 }} />
                </TouchableOpacity>
                <Text style={styleText.header}>Datos Equipo</Text>
            </View>
            <View style={styleBox.contentPage}>
                <View style={{ marginTop: 20 }} >
                    {/* True para participantes, false para Owner */}
                    {option === 'true' ? (
                        <View>
                            <View>
                                <Text style={styleText.titleOne}>Nombre del equipo</Text>
                            </View>
                            <View style={styleBox.infoBoton}>
                                <Text style={{ fontSize: 20 }}>{nameTeam}</Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styleText.titleOne}>Codigo del equipo</Text>
                            </View>
                            <View style={styleBox.infoBoton}>
                                <Text style={{ fontSize: 20 }}>{idTeam}</Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styleText.titleOne}>Miembros del equipo</Text>
                            </View>
                            <View style={styleBox.listMember}>
                                <ScrollView style={{ paddingTop: 10 }}>
                                    {membersTeam.map((item: any, index: any) => (
                                        <View style={[styleBox.listBoton, { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }]} key={index} >

                                            <View>
                                                <Text style={styleText.titleOne}>{item}</Text>
                                                <Text style={{ fontSize: 20 }}>{membersTeamRole[index]}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                            <View style={styleBox.botonEdit}>
                                <Text style={styleText.titleOne}>Tareas del equipo</Text>
                            </View>
                            <View style={styleBox.botonDelete}>
                                <Text style={styleText.titleOne}>Salir del equipo</Text>
                            </View>

                        </View>
                    ) : (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styleText.titleOne}>Nombre del equipo</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("EditTeam")}>
                                    <MaterialIcons name="edit" size={30} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={styleBox.infoBoton}>
                                <Text style={{ fontSize: 20 }}>{nameTeam}</Text>
                            </View>
                            <View style={{ marginTop: 10, }}>
                                <Text style={styleText.titleOne}>Codigo del equipo</Text>

                            </View>

                            <View style={[styleBox.infoBoton, { justifyContent: 'space-around', flexDirection: 'row' }]}>
                                <Text style={{ fontSize: 20 }}>{idTeam}</Text>
                                <TouchableOpacity onPress={() => copyToClipboard(idTeam)}>
                                    <FontAwesome5 name="copy" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={[styleBox.dataTitle, { marginTop: 15 }]}>
                                <Text style={styleText.titleOne}>Miembros del equipo</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("AddMemberTeam")}>
                                    <Ionicons name="md-add-circle-sharp" size={30} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={styleBox.listMember}>
                                <ScrollView style={{ paddingTop: 10 }}>
                                    {membersTeam.map((item: any, index: any) => (
                                        <View style={[styleBox.listBoton, { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }]} key={index} >

                                            <View>
                                                <Text style={styleText.titleOne}>{item}</Text>
                                                <Text style={{ fontSize: 20 }}>{membersTeamRole[index]}</Text>
                                            </View>
                                            <View>
                                                <TouchableOpacity onPress={() => { setIdMember(item); setModalDeleteMember(true) }}>
                                                    <MaterialIcons name="delete" size={28} color="black" />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { navigation.navigate("EditRoles"); AsyncStorage.setItem('emailUser', membersTeam[index]); }}>
                                                    <MaterialIcons name="edit" size={28} color="black" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                            <TouchableOpacity style={styleBox.botonEdit} onPress={() => { navigation.navigate("TeamTask"); AsyncStorage.setItem('idTeam', idTeam) }}>
                                <Text style={styleText.titleOne}>Ver Tareas</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styleBox.botonDelete} onPress={() => setModalDeleteTeam(true)}>
                                <Text style={styleText.titleOne}>Eliminar equipo</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );

}
export default DataTeamPage;  
