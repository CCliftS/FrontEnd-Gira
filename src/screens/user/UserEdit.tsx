import { UserPageProps } from "../../../types/types";
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import axios from "axios";
import { useAsyncStorage } from "../../utils/localStorage";
import styleBox from "../../public/styles/styleBox";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import styleText from "../../public/styles/styleText";


const UserEdit: React.FC<UserPageProps> = ({ navigation }) => {
    const email = useAsyncStorage('email');
    const [name, setName] = useState('');
    const [lastName, setLastname] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleChangeDates = async (email: string, name: string, lastName: string) => {
        setIsButtonDisabled(true);
        try {
            const response = await axios.put(`http://10.0.2.2:3000/user/changeData`, {
                email,
                name,
                lastName
            });
            navigation.navigate("UserPage");
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

{/**

<View style={styleUserPage.container}>
            <View style={styleUserPage.boxHeader}>
                <View style={styleUserPage.boxTextHeader}>
                    <Text style={styleUserPage.titleHeader}>Edición de datos</Text>
                </View>
            </View>
            <View style={styleUserPage.boxData}>
                <View style={styleUserPage.boxDataItem}>
                    <Text style={styleUserPage.textPrimary}>Nombre</Text>
                    <TextInput
                        style={[styleUserPage.boxDataItem2, styleUserPage.textSecundary]}
                        value={name}
                        onChangeText={(text: string) => setName(text)}
                    />
                </View>
                <View style={styleUserPage.boxDataItem}>
                    <Text style={styleUserPage.textPrimary}>Apellido</Text>
                    <TextInput
                        style={[styleUserPage.boxDataItem2, styleUserPage.textSecundary]}
                        value={lastName}
                        onChangeText={(text: string) => setLastname(text)}
                    />
                </View>
                <TouchableOpacity style={styleUserPage.boxEditPassword} onPress={() => navigation.navigate("EditEmailPage")}>
                    <Text style={styleUserPage.textBottom}>Cambiar correo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleUserPage.boxEditPassword} onPress={() => navigation.navigate("EditPassPage")}>
                    <Text style={styleUserPage.textBottom}>Cambiar contraseña</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={isButtonDisabled}
                    style={styleUserPage.boxDelete}
                    onPress={() => handleChangeDates(email, name, lastName)}
                >
                    <Text style={styleUserPage.textBottom}>Confirmar Cambios</Text>
                </TouchableOpacity>
            </View>
        </View>

*/}