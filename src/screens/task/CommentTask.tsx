import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { CommentTaskProps } from "../../../types/types";
import styleBox from "../../public/styles/styleBox";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import styleText from "../../public/styles/styleText";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const CommentTask: React.FC<CommentTaskProps> = ({ navigation }) => {
    const [option, setOption] = useState("");
    const [nav, setNav] = useState("");
    const [nameTask, setNameTask] = useState("");
    const loadData = async () => {
        setOption(await AsyncStorage.getItem('option') ?? '');
        setNav(await AsyncStorage.getItem('nav') ?? '');
    };
    const fecthDataTask = async () => {
        try {
            const id = await AsyncStorage.getItem('idTask');
            const response = await axios.get(`http://10.0.2.2:3002/Tasks/findTaskById/${id}`);
            setNameTask(response.data.name);

        } catch (error) {
            console.log(error);
        }
    };
    const [comments, setComments] = useState([]);
    const [emailUser, setEmailUser] = useState([]);
    const [idTask, setIdTask] = useState([]);
    const fechtDataComment = async () => {
        try {
            const id = await AsyncStorage.getItem('idTask');
            const response = await axios.get(`http://10.0.2.2:3002/Comments/getCommentsByTask/${id}`);
            setComments(response.data.commentComment);
            setEmailUser(response.data.commentEmailUser);
            setIdTask(response.data.commentIdTask);
        } catch (error) {
            console.log(error);
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