import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { EditEmailPageProps } from "../../../types/types";
import styleGeneral from "../../public/styles/StyleGeneral";
import NavigationBar from "../common/navbar";
import styleUserPage from "../../public/styles/StyleUserPage";
import { useState } from "react";
import styleEditPage from "../../public/styles/StyleEditPage";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import styleBox from "../../public/styles/styleBox";
import styleText from "../../public/styles/styleText";

const EditTeam: React.FC<EditEmailPageProps> = ({ navigation }) => {
    const [newName, setNewName] = useState('');
    
    const hanleChangeTeamName = async (newName: string) => {
        try {
            const id = await AsyncStorage.getItem('idTeam');
            const response = await axios.post(`http://10.0.2.2:3001/Teams/updateName`, {
                newName,
                id,
            });
            navigation.navigate("DataTeamPage");
        } catch (error) {
            console.log(error);
        };
    }

    return(
        <View style={styleBox.container}>
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

                <TouchableOpacity style={styleBox.botonDelete}>
                    <Text style={styleText.confirmEdit}>Eliminar equipo</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}
export default EditTeam;
    /*
    return (
        <View style={styleEditPage.container}>
            <View style={styleEditPage.boxData}>
                <Text style={styleEditPage.textPrimary}>Edición de datos</Text>

                <View style={styleGeneral.boxDataItem}>
                    <Text style={styleUserPage.textPrimary}>Nombre del proyecto</Text>
                    <TextInput
                        style={[styleUserPage.boxDataItem2, styleUserPage.textSecundary]}
                        value={newName}
                        onChangeText={(text: string) => setNewName(text)}
                    />
                </View>
                <TouchableOpacity style={styleUserPage.boxEditPassword} onPress={() => hanleChangeProject(newName)}>
                    <Text style={styleUserPage.textBottom}>Confirmar Cambios</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleUserPage.boxEditPassword} >
                    <Text style={styleUserPage.textBottom}>Crear roles</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleUserPage.boxEditPassword} >
                    <Text style={styleUserPage.textBottom}>Eliminar equipo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleUserPage.boxEditPassword} onPress={() => navigation.navigate("DataTeamPage")}>
                    <Text style={styleUserPage.textBottom}>Volver</Text>
                </TouchableOpacity>

            </View>

        </View >
    );*/

