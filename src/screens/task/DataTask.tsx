import { View, Text, TouchableOpacity } from "react-native";
import { DataTaskProps } from "../../../types/types";
import styleBox from "../../public/styles/styleBox";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styleText from "../../public/styles/styleText";

const DataTask: React.FC<DataTaskProps> = ({ navigation }) => {
    return (
        <View style={styleBox.containerPage}>
            <View style={styleBox.headerPage}>
                <TouchableOpacity onPress={() => navigation.navigate("DataProject")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 60 }} />
                </TouchableOpacity>
                <Text style={styleText.header}>Gestión Tareas</Text>
            </View>
            <View style={styleBox.contentPage}>
                <TouchableOpacity style={styleBox.botonEdit} onPress={() => navigation.navigate("CreateTask")}>
                    <Text style={styleText.titleOne}>Agregar nueva tarea</Text>
                </TouchableOpacity>
            </View>

        </View>

    );
};
export default DataTask;
