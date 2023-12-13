import { View, Text, TouchableOpacity } from "react-native";
import { CommentTaskProps } from "../../../types/types";
import styleBox from "../../public/styles/styleBox";
import { Ionicons } from "@expo/vector-icons";
import styleText from "../../public/styles/styleText";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CommentTask: React.FC<CommentTaskProps> = ({ navigation }) => {
    const [option, setOption] = useState("");
    const loadData = async () => {
        setOption(await AsyncStorage.getItem('option') ?? '');
    };
    useEffect(() => {
        loadData();
    }, []);
    return (
        <View style={styleBox.containerPage}>
            <View style={styleBox.headerPage}>
                <TouchableOpacity onPress={() => navigation.navigate("DataTask")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 60 }} />
                </TouchableOpacity>
                <Text style={styleText.header}>Datos Tarea</Text>
            </View>
            <View style={styleBox.contentPage}>
                <Text style={styleText.titleOne}>Nombre de la Tarea</Text>
                <View style={styleBox.infoBoton}>
                    <Text style={{ fontSize: 20 }}>aqui va el nombre de la tarea</Text>
                </View>
                <Text style={[styleText.titleOne, { marginTop: 20 }]}>Comentarios</Text>
                <View style={styleBox.listComment}>
                    <View style={styleBox.dataTask}>
                        <Text style={{ fontSize: 20 }}>aqui va el comentario</Text>
                    </View>
                </View>
                <TouchableOpacity style={styleBox.botonEdit} onPress={() => navigation.navigate("CommentTask")}>
                    <Text style={styleText.confirmEdit}>Agregar Comentario</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default CommentTask;