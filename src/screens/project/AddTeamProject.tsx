import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AddTeamProjectProps } from "../../../types/types"
import { useState } from "react";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styleBox from "../../public/styles/styleBox";
import styleText from "../../public/styles/styleText";

const AddTeamProject: React.FC<AddTeamProjectProps> = ({ navigation }) => {
    const [idTeam, setIdTeam] = useState('');
    const handleAddTeam = async (idTeam: string) => {
        try {

            const id = await AsyncStorage.getItem('idProject');
            const response = await axios.post(`http://10.0.2.2:3001/Project/addTeam`, {
                id,
                idTeam
            });
            navigation.navigate("DataProject");
        } catch (error) {
            console.log(error, "No se agrego al equipo  ");
        }
    }
    return (
        <View style={styleBox.containerPage}>
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