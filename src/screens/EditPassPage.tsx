import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { EditPassPageProps } from "../../types/types";
import styleEditPage from "../public/styles/StyleEditPage";
import { useState } from "react";
import axios from "axios";

const EditEmailPage: React.FC<EditPassPageProps> = ({ navigation, route }) => {
    const email = route.params?.data;
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handlerChangePassword = async (email: string, password: string, newPassword: string, repeatPassword: string) => {
        setIsButtonDisabled(true); 
        try {
            const response = await axios.post(`http://10.0.2.2:3000/user/changePassword`, {
                email,
                password,
                newPassword,
                repeatPassword,
            });

            navigation.navigate("Login");
        } catch (error) {
            console.log(error);
        }finally{
            setIsButtonDisabled(false);
        }
    }
    return (
        <View style={styleEditPage.container}>
            <View style={styleEditPage.boxData}>
                <Text style={styleEditPage.textPrimary}>Cambio de Contraseña</Text>
                <View style={styleEditPage.boxDataItemPass}>
                    <Text style={styleEditPage.textSecundary}>Ingrese su contraseña antigua</Text>
                    <TextInput
                        style={[styleEditPage.boxDataItem2Pass, styleEditPage.textSecundaryPass]}
                        value={password}
                        onChangeText={(text: string) => setPassword(text)}
                        secureTextEntry
                    />
                </View>
                <View style={styleEditPage.boxDataItemPass}>
                    <Text style={styleEditPage.textSecundary}>Ingrese su nueva contraseña</Text>
                    <TextInput
                        style={[styleEditPage.boxDataItem2Pass, styleEditPage.textSecundaryPass]}
                        value={newPassword}
                        onChangeText={(text: string) => setNewPassword(text)}
                        secureTextEntry
                    />
                </View>
                <View style={styleEditPage.boxDataItemPass}>
                    <Text style={styleEditPage.textSecundary}>Reingrese la contraseña nueva</Text>
                    <TextInput
                        style={[styleEditPage.boxDataItem2Pass, styleEditPage.textSecundaryPass]}
                        value={repeatPassword}
                        onChangeText={(text: string) => setRepeatPassword(text)}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity 
                    disabled={isButtonDisabled}
                    style={styleEditPage.boxBottomPass} 
                    onPress={() => handlerChangePassword(email, password, newPassword, repeatPassword)}
                >
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