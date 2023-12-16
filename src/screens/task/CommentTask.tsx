import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { CommentTaskProps } from "../../../types/types";
import styleBox from "../../public/styles/styleBox";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import styleText from "../../public/styles/styleText";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ENDPOINT_MS_TASK } from "react-native-dotenv";


const CommentTask: React.FC<CommentTaskProps> = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [option, setOption] = useState<string>("");
    const [nav, setNav] = useState<string>("");
    const [nameTask, setNameTask] = useState<string>("");

    const [comments, setComments] = useState<string[]>([]);
    const [emailUser, setEmailUser] = useState<string[]>([]);
    const [idTask, setIdTask] = useState<string[]>([]);

    const loadData = async () => {
        setOption(await AsyncStorage.getItem('option') ?? '');
        setNav(await AsyncStorage.getItem('nav') ?? '');
    };
    const fecthDataTask = async () => {
        try {
            const id = await AsyncStorage.getItem('idTask');
            const response = await axios.get(`${ENDPOINT_MS_TASK}/Tasks/findTaskById/${id}`);
            setNameTask(response.data.name);

        } catch (error) {
            setError("No se pudo cargar la tarea");
            setModalVisible(true);
        }
    };

    const fechtDataComment = async () => {
        try {
            const id = await AsyncStorage.getItem('idTask');
            const response = await axios.get(`${ENDPOINT_MS_TASK}/Comments/getCommentsByTask/${id}`);
            setComments(response.data.commentComment);
            setEmailUser(response.data.commentEmailUser);
            setIdTask(response.data.commentIdTask);
        } catch (error) {
            setError("No se pudo cargar los comentarios");
            setModalVisible(true);
        }
    }
    useEffect(() => {
        loadData();
        fecthDataTask();
        fechtDataComment();
    }, []);
    useEffect(() => {
        fechtDataComment();
    }, [comments]);
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
                {nav === "UserTask" && <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("UserTask")}>
                        <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 35 }} />
                    </TouchableOpacity>
                </View>}
                {nav === "DataTask" && <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("DataTask")}>
                        <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 35 }} />
                    </TouchableOpacity>
                </View>}
                {nav === "TeamTask" && <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("TeamTask")}>
                        <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 35 }} />
                    </TouchableOpacity>
                </View>}
                <Text style={styleText.header}>Comentarios Tarea</Text>
            </View>
            <View style={styleBox.contentPage}>
                <Text style={styleText.titleOne}>Nombre de la Tarea</Text>
                <View style={styleBox.infoBoton}>
                    <Text style={{ fontSize: 20 }}>{nameTask}</Text>
                </View>
                <Text style={[styleText.titleOne, { marginTop: 20 }]}>Comentarios</Text>
                <View style={styleBox.listComment}>
                    <ScrollView>
                        {comments.map((item, index) => (
                            <View key={index}>
                                <View style={[styleBox.dataComment, { marginTop: 10 }]}>
                                    <View style={[{ flexDirection: 'row', marginBottom: 10 }, styleBox.infoTask]}>
                                        <FontAwesome5 name="user-alt" size={20} color="black" />
                                        <Text style={{ fontSize: 15, justifyContent: 'center', marginLeft: 10 }}>{emailUser[index]}</Text>
                                    </View>
                                    <Text style={{ fontSize: 15 }}>{comments[index]}</Text>
                                </View>
                            </View>
                        ))}

                    </ScrollView>
                </View>

                {nav === "UserTask" && <TouchableOpacity style={styleBox.botonEdit} onPress={() => { navigation.navigate("AddComment") }}>
                    <Text style={styleText.titleOne}>Agregar Comentario</Text>
                </TouchableOpacity>}

            </View>
        </View>
    );
}
export default CommentTask;