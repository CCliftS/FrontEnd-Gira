import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { EditEmailPageProps } from "../../../types/types";
import styleEditPage from "../../public/styles/StyleEditPage";
import styleUserPage from "../../public/styles/StyleUserPage";
import styleGeneral from "../../public/styles/StyleGeneral";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const EditProject: React.FC<EditEmailPageProps> = ({ navigation }) => {
    const [newName, setNewName] = useState('');
    const hanleChangeProject = async (newName: string) => {
        try {
            const id = await AsyncStorage.getItem('idProject');
            console.log(id);
            const response = await axios.post(`http://10.0.2.2:3001/Project/updateProject`, {
                newName,
                id,
            });
            navigation.navigate("DataProject");
        } catch (error) {
            console.log(error);
        };
    }
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
                    <Text style={styleUserPage.textBottom}>Eliminar proyecto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleUserPage.boxEditPassword} onPress={() => navigation.navigate("DataProject")}>
                    <Text style={styleUserPage.textBottom}>Volver</Text>
                </TouchableOpacity>

            </View>

        </View >
    );
}
export default EditProject;
