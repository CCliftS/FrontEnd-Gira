import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import { EditEmailPageProps } from "../../../types/types";
import { useState } from "react";
import axios from "axios";
import { useAsyncStorage } from "../../utils/localStorage";
import styleBox from "../../public/styles/styleBox";
import { Feather, Ionicons } from "@expo/vector-icons";
import styleText from "../../public/styles/styleText";
import { ENDPOINT_MS_USER } from "react-native-dotenv";

const EditEmailPage: React.FC<EditEmailPageProps> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const email: string = useAsyncStorage('email');
    const [newEmail, setNewEmail] = useState<string>('');
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [newEmail2, setNewEmail2] = useState<string>('');

    const handlerChangeEmail = async (newEmail: string, newEmail2: string, email: string) => {
        setIsButtonDisabled(true);
        if (newEmail !== newEmail2) {
            setError("Los correos no coinciden");
            setModalVisible(true);
            return;
        }
        try {
            const response = await axios.put(`${ENDPOINT_MS_USER}/user/changeEmail`, {
                newEmail,
                email
            });
            const { email: fecthEmail } = response.data;
            setNewEmail(fecthEmail);
            navigation.navigate("Login");
        } catch (error) {
            setError("No se pudo actualizar el correo");
            setModalVisible(true);
        } finally {
            setIsButtonDisabled(false);
        }
    }

    return (
        <View style={styleBox.container}>
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
