import { UserPageProps } from "../../../types/types";
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import styleUserPage from "../../public/styles/StyleUserPage";
import NavigationBar from "../common/navbar";
import { useState } from "react";
import axios from "axios";
import { useAsyncStorage } from "../../utils/localStorage";


const UserEdit: React.FC<UserPageProps> = ({ navigation }) => {
    const email = useAsyncStorage('email');
    const [name, setName] = useState('');
    const [lastName, setLastname] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleChangeDates = async (email: string, name: string, lastName: string) => {
        setIsButtonDisabled(true);
        try {
            const response = await axios.post(`http://10.0.2.2:3000/user/changeData`, {
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
            <View style={styleUserPage.footer}>
                <NavigationBar navigation={navigation} />
            </View>
        </View>
    );
}
export default UserEdit;