import { View, Text, TouchableOpacity, Modal } from "react-native";
import { EditStateProps } from "../../../types/types";
import styleAddPage from "../../public/styles/StyleAddPage";
import styleBox from "../../public/styles/styleBox";
import { Feather, Ionicons } from "@expo/vector-icons";
import styleText from "../../public/styles/styleText";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import { ca } from "date-fns/locale";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditState: React.FC<EditStateProps> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');

    const status = [
        { label: "Pendiente", value: '1' },
        { label: "Proceso", value: '2' },
        { label: "Terminado", value: '3' },
    ];
    const [newStatus, setNewStatus] = useState('');

    const handleChangeStatus = async (newStatus: string) => {
        try {
            const id = await AsyncStorage.getItem('idTask');
            const response = await axios.put(`http://10.0.2.2:3002/Tasks/updateStatus/${id}`, {
                newStatus,
            });
            navigation.navigate("UserTask");
        } catch (error) {
            setError("No se pudo actualizar el estado");
            setModalVisible(true);
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
                <TouchableOpacity onPress={() => navigation.navigate("UserTask")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="#0c04b6" style={{ paddingRight: 60 }} />
                </TouchableOpacity>
            </View>
            <View style={styleBox.headerEdit}>
                <Text style={styleText.headerBlack}>Editar Estado</Text>
                <Text style={styleText.infoEdit}>Aca puedes actualizar el estado de la tarea</Text>
            </View>
            <View style={styleBox.contentPage}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styleText.titleOne}>Estado</Text>
                </View>
                <View style={styleBox.infoDropdown}>
                    <Dropdown
                        placeholderStyle={styleText.input}
                        selectedTextStyle={styleText.input}
                        data={status}
                        labelField="label"
                        valueField="label"
                        placeholder="Selecciona el nuevo estado"
                        value={newStatus}
                        onChange={item => {
                            setNewStatus(item.label);
                        }}
                    />
                </View>
                <TouchableOpacity style={styleBox.botonConfirm} onPress={() => handleChangeStatus(newStatus)}>
                    <Text style={styleText.confirmEdit}>Confirmar cambios</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
};
export default EditState;