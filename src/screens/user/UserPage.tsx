import { UserPageProps } from "../../../types/types";
import { View, Text, Image, TouchableOpacity, Touchable, TouchableHighlightComponent } from "react-native";
import styleUserPage from "../../public/styles/StyleUserPage";
import NavigationBar from "../common/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalStorage } from "../../utils/localStorage";
import { useFocusEffect } from "@react-navigation/native";

const UserPage: React.FC<UserPageProps> = ({ navigation }) => {
    const email = useLocalStorage('email');

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const dataUser = async () => {
        try {
            const response = await axios.post(`http://10.0.2.2:3000/user/data`, {
                email
            });
            const { name: fetchedName, lastName: fetchedLastName } = response.data;
            setName(fetchedName);
            setLastName(fetchedLastName);
        } catch (error) {
            console.log(error);
        }
    }
    useFocusEffect(() => {
        dataUser();
    });
    return (

        <View style={styleUserPage.container}>
            <View style={styleUserPage.boxHeader}>
                <View style={styleUserPage.boxTextHeader}>
                    <Text style={styleUserPage.titleHeader}>Datos usuario</Text>
                </View>
                <TouchableOpacity style={styleUserPage.boxIconHeader} onPress={() => navigation.navigate("UserEdit")}>
                    <Image
                        source={require('../../public/icons/editar.png')}
                        style={styleUserPage.icon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View style={styleUserPage.boxData}>
                <View style={styleUserPage.boxDataItem}>
                    <Text style={styleUserPage.textPrimary}>Email</Text>
                    <View style={styleUserPage.boxDataItem2}>
                        <Text style={styleUserPage.textSecundary}>{email}</Text>
                    </View>
                </View>
                <View style={styleUserPage.boxDataItem}>
                    <Text style={styleUserPage.textPrimary}>Nombre</Text>
                    <View style={styleUserPage.boxDataItem2}>
                        <Text style={styleUserPage.textSecundary}>{name}</Text>
                    </View>
                </View>
                <View style={styleUserPage.boxDataItem}>
                    <Text style={styleUserPage.textPrimary}>Apellido</Text>
                    <View style={styleUserPage.boxDataItem2}>
                        <Text style={styleUserPage.textSecundary}>{lastName}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styleUserPage.boxDelete} onPress={() => navigation.navigate("HomePage")}>
                    <Text style={styleUserPage.textBottom}>Eliminar Usuario</Text>
                </TouchableOpacity>
            </View>

            {/*Contenedor de la Navbar*/}
            <View style={styleUserPage.footer}>
                <NavigationBar navigation={navigation} />
            </View>
        </View>

    );
}
export default UserPage;