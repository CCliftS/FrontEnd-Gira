import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { EditPassPageProps } from "../../types/types";
import styleEditPage from "../public/styles/StyleEditPage";
import { useState } from "react";
import axios from "axios";

const EditEmailPage: React.FC<EditPassPageProps> = ({ navigation, route }) => {
    const email = route.params?.data;
    const [newPassword, setNewPassword] = useState('');
    const handlerChangeEmail = async () => {
        try {
            const response = await axios.post(`http://10.0.2.2:3000/user/changeEmail`, {
                email,
                newPassword
            });
            const { email: fecthEmail } = response.data;
            setNewPassword(fecthEmail);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styleEditPage.container}>
            <View style={styleEditPage.boxData}>
                <Text style={styleEditPage.textPrimaryPass}>Cambio de Contraseña</Text>
                <View style={styleEditPage.boxDataItemPass}>
                    <Text style={styleEditPage.textSecundary}>Ingrese su contraseña antigua</Text>
                    <TextInput
                        style={[styleEditPage.boxDataItem2Pass, styleEditPage.textSecundary]}
                        value={newPassword}
                        onChangeText={(text: string) => setNewPassword(text)}
                    />
                </View>
                <View style={styleEditPage.boxDataItemPass}>
                    <Text style={styleEditPage.textSecundary}>Ingrese su nueva contraseña</Text>
                    <TextInput
                        style={[styleEditPage.boxDataItem2Pass, styleEditPage.textSecundary]}
                        value={newPassword}
                        onChangeText={(text: string) => setNewPassword(text)}
                    />
                </View>
                <View style={styleEditPage.boxDataItemPass}>
                    <Text style={styleEditPage.textSecundary}>Reingrese la contraseña nueva</Text>
                    <TextInput
                        style={[styleEditPage.boxDataItem2Pass, styleEditPage.textSecundary]}
                        value={newPassword}
                        onChangeText={(text: string) => setNewPassword(text)}
                    />
                </View>
                    <TouchableOpacity style={styleEditPage.boxBottomPass} onPress={() => navigation.navigate("UserPage", { data: newPassword })}>
                        <Text style={styleEditPage.textSecundary}>Actualizar contraseña</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleEditPage.boxBottomPass2} onPress={() => navigation.navigate("UserEdit", { data: email })}>
                        <Text style={styleEditPage.textSecundary}>Volver</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}
export default EditEmailPage;