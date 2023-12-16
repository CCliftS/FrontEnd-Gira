import { UserPageProps } from "../../../types/types";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import styleBox from "../../public/styles/styleBox";
import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import styleText from "../../public/styles/styleText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENDPOINT_MS_USER } from "react-native-dotenv";

const UserPage: React.FC<UserPageProps> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    const [modalDelete, setModalDelete] = useState<boolean>(false);
    const handleDeleteUser = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const response = await axios.delete(`${ENDPOINT_MS_USER}/user/deleteUser/${email}`);
            navigation.navigate("Login");
        } catch (error) {
            setError("No se pudo eliminar el usuario");
            setModalVisible(true);
        }
    }
    const dataUser = async () => {
        try {
            const emailUser = await AsyncStorage.getItem('email');
            const response = await axios.get(`${ENDPOINT_MS_USER}user/data/${emailUser}`);
            const { name: fetchedName, lastName: fetchedLastName } = response.data;
            setName(fetchedName);
            setLastName(fetchedLastName);
            setEmail(emailUser ?? '');
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
            <Modal
                animationType="slide"
                visible={modalDelete}
                transparent={true}
            >
                <View style={styleBox.modalCenter}>
                    <View style={styleBox.modalDelete}>
                        <MaterialCommunityIcons name="delete-restore" size={54} color="#da1a29" />
                        <Text style={styleText.titleOne}>¿Estas seguro de eliminar?</Text>
                        <TouchableOpacity style={styleBox.botonDelete} onPress={() => { setModalDelete(false); handleDeleteUser() }}>
                            <Text style={styleText.confirmEdit}>Si</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleBox.botonEdit} onPress={() => setModalDelete(false)}>
                            <Text style={styleText.confirmEdit}>Volver</Text>
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
                <View style={styleBox.infoBoton}>
                    <Text style={{ fontSize: 20 }}>{name}</Text>
                </View>
                <View style={styleBox.infoBoton}>
                    <Text style={{ fontSize: 20 }}>{lastName}</Text>
                </View>
                <View style={{ marginTop: 20 }}></View>
                <View style={styleBox.dataTitle}>
                    <Text style={styleText.titleOne}>Correo Electronico</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("EditEmailPage")}>
                        <MaterialIcons name="edit" size={30} color="black" />
                    </TouchableOpacity>

                </View>
                <View style={styleBox.infoBoton}>
                    <Text style={{ fontSize: 20 }}>{email}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("EditPassPage")}>
                    <View style={styleBox.botonEdit}>
                        <Text style={styleText.titleOne}>Editar Contraseña</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styleBox.botonDelete} onPress={() => setModalDelete(true)}>
                    <Text style={styleText.titleOne}>Eliminar Cuenta</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
export default UserPage;