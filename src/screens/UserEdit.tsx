import { UserPageProps } from "../../types/types";
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import styleUserPage from "../public/styles/StyleUserPage";
import NavigationBar from "./navbar";
import { useState } from "react";

const UserEdit: React.FC<UserPageProps> = ({ navigation, route }) => {
    const email = route.params?.data;
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');

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
                        value={lastname}
                        onChangeText={(text: string) => setLastname(text)}
                    />
                </View>
                <TouchableOpacity style={styleUserPage.boxEditPassword} onPress={() => navigation.navigate("EditEmailPage", { data: email })}>
                    <Text style={styleUserPage.textBottom}>Cambiar correo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleUserPage.boxEditPassword} onPress={() => navigation.navigate("EditPassPage", { data: email })}>
                    <Text style={styleUserPage.textBottom}>Cambiar contraseña</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleUserPage.boxDelete} onPress={() => navigation.navigate("UserPage", { data: email })}>
                    <Text style={styleUserPage.textBottom}>Confirmar Cambios</Text>
                </TouchableOpacity>
            </View>
            <View style={styleUserPage.footer}>
                <NavigationBar navigation={navigation} route={route} data={email} />
            </View>
        </View>
    );
}
export default UserEdit;