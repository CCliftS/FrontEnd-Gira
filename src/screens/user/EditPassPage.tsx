import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import { EditPassPageProps } from "../../../types/types";
import styleEditPage from "../../public/styles/StyleEditPage";
import { useState } from "react";
import axios from "axios";
import { useAsyncStorage } from "../../utils/localStorage";
import { Feather, Ionicons } from "@expo/vector-icons";
import styleBox from "../../public/styles/styleBox";
import styleText from "../../public/styles/styleText";

const EditEmailPage: React.FC<EditPassPageProps> = ({ navigation, }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');

    const email = useAsyncStorage('email');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handlerChangePassword = async (email: string, password: string, newPassword: string, repeatPassword: string) => {
        setIsButtonDisabled(true);
        try {
            const response = await axios.put(`http://10.0.2.2:3000/user/changePassword`, {
                email,
                password,
                newPassword,
                repeatPassword,
            });

            navigation.navigate("Login");
        } catch (error) {
            setError("No se pudo actualizar la contraseña");
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
                <Text style={styleText.headerBlack}>Cambio de contraseña</Text>
                <Text style={styleText.infoEdit}>No te preocupes, tus datos personales no son expuestos a otras personas. Ademas puedes cambiarlo cuando desees</Text>
            </View>
            <View style={styleBox.contentPage}>
                <Text style={styleText.titleOne}>Contraseña Antigua</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={password}
                    onChangeText={(text: string) => setPassword(text)}
                    secureTextEntry
                />
                <View style={{ marginTop: 20 }}></View>
                <Text style={styleText.titleOne}>Ingrese su nueva contraseña</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={newPassword}
                    onChangeText={(text: string) => setNewPassword(text)}
                    secureTextEntry
                />
                <Text style={styleText.titleOne}>Confirme su nueva contraseña</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={repeatPassword}
                    onChangeText={(text: string) => setRepeatPassword(text)}
                    secureTextEntry
                />
                <TouchableOpacity style={styleBox.botonConfirm} onPress={() => handlerChangePassword(email, password, newPassword, repeatPassword)}>
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
            <TouchableOpacity style={styleEditPage.boxBottomPass2} onPress={() => navigation.navigate("UserEdit")}>
                <Text style={styleEditPage.textSecundary}>Volver</Text>
            </TouchableOpacity>
        </View>
    </View>
)*/
