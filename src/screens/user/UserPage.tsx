import { UserPageProps } from "../../../types/types";
import { View, Text, Image, TouchableOpacity, Touchable, TouchableHighlightComponent, ScrollView, TouchableOpacityBase, TouchableHighlight, Modal } from "react-native";
import styleUserPage from "../../public/styles/StyleUserPage";
import NavigationBar from "../common/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAsyncStorage } from "../../utils/localStorage";
import { useFocusEffect } from "@react-navigation/native";
import styleBox from "../../public/styles/styleBox";
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import styleText from "../../public/styles/styleText";

const UserPage: React.FC<UserPageProps> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');

    const email = useAsyncStorage('email');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const dataUser = async () => {
        try {
            const response = await axios.get(`http://10.0.2.2:3000/user/data/${email}`);
            const { name: fetchedName, lastName: fetchedLastName } = response.data;
            setName(fetchedName);
            setLastName(fetchedLastName);
        } catch (error) {
            setError("No se pudo cargar los datos del usuario");
            setModalVisible(true);
        }
    }
    useFocusEffect(() => {
        dataUser();
    });

    return (
        <View style={styleBox.containerPage}>
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
                <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 50 }} />
                </TouchableOpacity>
                <Text style={styleText.header}>Perfil Usuario</Text>
            </View>
            <View style={styleBox.contentPage}>
                <View style={styleBox.dataTitle}>
                    <Text style={styleText.titleOne}>Nombre y Apellido</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("UserEdit")}>
                        <MaterialIcons name="edit" size={30} color="black" />
                    </TouchableOpacity>

                </View>
                <View style={styleBox.dataInfo}>
                    <Text style={styleText.info}>{name}</Text>
                </View>
                <View style={styleBox.dataInfo}>
                    <Text style={styleText.info}>{lastName}</Text>
                </View>
                <View style={{ marginTop: 20 }}></View>
                <View style={styleBox.dataTitle}>
                    <Text style={styleText.titleOne}>Correo Electronico</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("EditEmailPage")}>
                        <MaterialIcons name="edit" size={30} color="black" />
                    </TouchableOpacity>

                </View>
                <View style={styleBox.dataInfo}>
                    <Text style={styleText.info}>{email}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("EditPassPage")}>
                    <View style={styleBox.botonEdit}>
                        <Text style={styleText.titleOne}>Editar Contraseña</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
                    <View style={styleBox.botonDelete}>
                        <Text style={styleText.titleOne}>Eliminar Cuenta</Text>
                    </View>
                </TouchableOpacity>


            </View>

        </View>
    );
}
export default UserPage;

{/*
    <View style={styleUserPage.container}>
            <View style={styleUserPage.boxHeader}>
                <View style={styleUserPage.boxTextHeader}>
                    <Text style={styleUserPage.titleHeader}>Datos usuario</Text>
                </View>
                <TouchableOpacity style={styleUserPage.boxIconHeader} onPress={() => navigation.navigate("UserEdit")}>
                    <Image
                        source={require('../../public/icons/cuadrado-de-la-pluma.png')}
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

        </View>
*/}