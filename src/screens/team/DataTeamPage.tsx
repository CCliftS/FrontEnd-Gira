import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { DataTeamPageProps } from "../../../types/types";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styleBox from "../../public/styles/styleBox";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import styleText from "../../public/styles/styleText";

const DataTeamPage: React.FC<DataTeamPageProps> = ({ navigation }) => {
    const [membersTeam, setMembersTeam] = useState([]);
    const [membersTeamId, setMembersTeamId] = useState([]);

    const [nameTeam, setNameTeam] = useState('');
    const [idTeam, setIdTeam] = useState('');
    const [option, setOption] = useState('');

    const handleDeleteMember = async (id: string) => {
        try {
            const idTeam = await AsyncStorage.getItem('idTeam');
            const response = await axios.delete(`http://10.0.2.2:3001/Member/removeMember/${id}/${idTeam}`);
            navigation.navigate("DataTeamPage");
        } catch (error) {
            console.log(error);
        }
    }
    const loadMembersTeam = async () => {
        try {
            const idTeam = await AsyncStorage.getItem('idTeam');
            const response = await axios.get(`http://10.0.2.2:3001/Member/getMemberTeam/${idTeam}`);
            setMembersTeam(response.data.TeamsEmails);
            setMembersTeamId(response.data.nameId);


        } catch (error) {
            console.log(error);
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
    }, [membersTeam]);

    return (
        <View style={styleBox.containerPage}>
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
                                        <View style={[styleBox.listBoton, { paddingHorizontal: 20 }]} key={index} >
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View>
                                                    <Text style={styleText.titleOne}>{item}</Text>
                                                    <Text style={{ fontSize: 20 }}>Aqui va el rol del usuario</Text>
                                                </View>
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
                            <View style={{ marginTop: 10 }}>
                                <Text style={styleText.titleOne}>Codigo del equipo</Text>
                            </View>
                            <View style={styleBox.infoBoton}>
                                <Text style={{ fontSize: 20 }}>{idTeam}</Text>
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
                                        <View style={[styleBox.listBoton, { paddingHorizontal: 20, justifyContent: 'space-between' }]} key={index} >
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View>
                                                    <Text style={styleText.titleOne}>{item}</Text>
                                                    <Text style={{ fontSize: 20 }}>Aqui va el rol del usuario</Text>
                                                </View>
                                                <View style={{ marginLeft: 70 }}>
                                                    <TouchableOpacity onPress={() => handleDeleteMember(item)}>
                                                        <MaterialIcons name="delete" size={28} color="black" />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => navigation.navigate("EditTeam")}>
                                                        <MaterialIcons name="edit" size={28} color="black" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                            <View style={styleBox.botonEdit}>
                                <Text style={styleText.titleOne}>Crear Roles</Text>
                            </View>
                            <View style={styleBox.botonDelete}>
                                <Text style={styleText.titleOne}>Eliminar equipo</Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );

}
export default DataTeamPage;  
