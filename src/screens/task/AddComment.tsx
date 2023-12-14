import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { AddCommentProps } from "../../../types/types";
import styleBox from "../../public/styles/styleBox";
import { Ionicons } from "@expo/vector-icons";
import styleText from "../../public/styles/styleText";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AddComment: React.FC<AddCommentProps> = ({ navigation }) => {
    const handleNewComment = async (comment: string) => {
        try {
            const id_task = await AsyncStorage.getItem('idTask');
            const email_user = await AsyncStorage.getItem('email');
            const response = await axios.post(`http://10.0.2.2:3002/Comments/createComment`, {
                id_task,
                email_user,
                comment,

            });
            navigation.navigate("CommentTask");
        } catch (error) {
            console.log(error);
        }
    }
    const [newComment, setNewComment] = useState('');

    return (
        <View style={styleBox.containerPage}>
            <View style={styleBox.headerPage}>
                <TouchableOpacity onPress={() => navigation.navigate("CommentTask")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 40 }} />
                </TouchableOpacity>
                <Text style={styleText.header}>Nuevo Comentario</Text>
            </View>
            <View style={styleBox.contentPage}>
                <Text style={styleText.titleOne}>Ingrese el comentario</Text>

                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={newComment}
                    onChangeText={(text: string) => setNewComment(text)}
                />
                <TouchableOpacity style={styleBox.botonEdit} onPress={() => handleNewComment(newComment)}>
                    <Text style={styleText.titleOne}>Agregar nuevo Comentario</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default AddComment;