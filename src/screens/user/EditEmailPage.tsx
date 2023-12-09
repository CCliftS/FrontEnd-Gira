import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { EditEmailPageProps } from "../../../types/types";
import styleEditPage from "../../public/styles/StyleEditPage";
import { useState } from "react";
import axios from "axios";
import { useAsyncStorage } from "../../utils/localStorage";
import styleBox from "../../public/styles/styleBox";
import { Ionicons } from "@expo/vector-icons";
import styleText from "../../public/styles/styleText";

const EditEmailPage: React.FC<EditEmailPageProps> = ({ navigation }) => {

    const email = useAsyncStorage('email');
    const [newEmail, setNewEmail] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [newEmail2, setNewEmail2] = useState('');

    const handlerChangeEmail = async (newEmail: string, newEmail2: string, email: string) => {
        setIsButtonDisabled(true);
        if (newEmail !== newEmail2) {
            alert('Los correos no coinciden');
            return;
        }
        try {
            const response = await axios.put(`http://10.0.2.2:3000/user/changeEmail`, {
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
        <View style={styleBox.container}>
            <View style={styleBox.headerPage}>
                <TouchableOpacity onPress={() => navigation.navigate("UserPage")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="#0c04b6" style={{ paddingRight: 60 }} />
                </TouchableOpacity>
            </View>
            <View style={styleBox.headerEdit}>
                <Text style={styleText.headerBlack}>Actualiza tu correo</Text>
                <Text style={styleText.infoEdit}>No te preocupes, tus datos personales no son expuestos a otras personas. Ademas puedes cambiarlo cuando desees</Text>
            </View>
            <View style={styleBox.contentPage}>
                <Text style={styleText.titleOne}>Correo</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={newEmail}
                    onChangeText={(text: string) => setNewEmail(text)}
                />
                <View style={{ marginTop: 20 }}></View>
                <Text style={styleText.titleOne}>Confirme su correo</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={newEmail2}
                    onChangeText={(text: string) => setNewEmail2(text)}
                />
                <TouchableOpacity style={styleBox.botonConfirm} onPress={() => handlerChangeEmail(newEmail, newEmail2, email)}>
                    <Text style={styleText.confirmEdit}>Actualizar datos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default EditEmailPage;








    /*
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
    )*/