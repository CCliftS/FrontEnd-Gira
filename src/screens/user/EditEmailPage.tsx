import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { EditEmailPageProps } from "../../../types/types";
import styleEditPage from "../../public/styles/StyleEditPage";
import { useState } from "react";
import axios from "axios";
import { useLocalStorage } from "../../utils/localStorage";

const EditEmailPage: React.FC<EditEmailPageProps> = ({ navigation }) => {
    const email = useLocalStorage('email');
    const [newEmail, setNewEmail] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handlerChangeEmail = async (newEmail: string, email: string) => {
        setIsButtonDisabled(true);
        try {
            const response = await axios.post(`http://10.0.2.2:3000/user/changeEmail`, {
                newEmail,
                email
            });
            const { email: fecthEmail } = response.data;
            setNewEmail(fecthEmail);
            navigation.navigate("Login");
        } catch (error) {
            console.log(error);
        } finally {
            setIsButtonDisabled(false);
        }
    }
    return (
        <View style={styleEditPage.container}>
            <View style={styleEditPage.boxData}>
                <Text style={styleEditPage.textPrimary}>Cambio de Correo</Text>
                <View style={styleEditPage.boxDataItem}>
                    <Text style={styleEditPage.textSecundary}>Ingrese su nuevo correo</Text>
                    <TextInput
                        style={[styleEditPage.boxDataItem2, styleEditPage.textSecundary]}
                        value={newEmail}
                        onChangeText={(text: string) => setNewEmail(text)}
                    />
                </View>
                <TouchableOpacity
                    disabled={isButtonDisabled}
                    style={styleEditPage.boxBottom}
                    onPress={() => handlerChangeEmail(newEmail, email)}>
                    <Text style={styleEditPage.textSecundary}>Actualizar correo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleEditPage.boxBottom} onPress={() => navigation.navigate("UserEdit")}>
                    <Text style={styleEditPage.textSecundary}>Volver</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default EditEmailPage;