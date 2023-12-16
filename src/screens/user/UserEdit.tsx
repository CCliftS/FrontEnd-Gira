import { UserPageProps } from "../../../types/types";
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Modal } from "react-native";
import { useState } from "react";
import axios from "axios";
import { useAsyncStorage } from "../../utils/localStorage";
import styleBox from "../../public/styles/styleBox";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import styleText from "../../public/styles/styleText";
import { ENDPOINT_MS_USER } from "react-native-dotenv";


const UserEdit: React.FC<UserPageProps> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const email: string = useAsyncStorage('email');
    const [name, setName] = useState<string>('');
    const [lastName, setLastname] = useState<string>('');
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

    const handleChangeDates = async (email: string, name: string, lastName: string) => {
        setIsButtonDisabled(true);
        try {
            const response = await axios.put(`${ENDPOINT_MS_USER}/user/changeData`, {
                email,
                name,
                lastName
            });
            navigation.navigate("UserPage");
        } catch (error) {
            setError("No se pudo actualizar los datos");
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
                <Text style={styleText.headerBlack}>Actualiza tu perfil</Text>
                <Text style={styleText.infoEdit}>No te preocupes, tus datos personales no son expuestos a otras personas. Ademas puedes cambiarlo cuando desees</Text>
            </View>
            <View style={styleBox.contentPage}>
                <Text style={styleText.titleOne}>Nombre</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={name}
                    onChangeText={(text: string) => setName(text)}
                />
                <View style={{ marginTop: 20 }}></View>
                <Text style={styleText.titleOne}>Apellido</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={lastName}
                    onChangeText={(text: string) => setLastname(text)}
                />
                <TouchableOpacity style={styleBox.botonConfirm} onPress={() => handleChangeDates(email, name, lastName)}>
                    <Text style={styleText.confirmEdit}>Actualizar datos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default UserEdit;