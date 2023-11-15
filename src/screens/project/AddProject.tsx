import { View, Text, TouchableOpacity } from "react-native";
import { AddProjectProps } from "../../../types/types";
import styleGeneral from "../../public/styles/StyleGeneral";
import styleEditPage from "../../public/styles/StyleEditPage";
import NavigationBar from "../common/navbar";

const AddProject: React.FC<AddProjectProps> = ({ navigation }) => {
    return (
        <View style={styleEditPage.container}>
            <View style={styleEditPage.boxData}>
                <Text style={styleEditPage.textPrimary}>Creación de Proyectos</Text>
                <Text style={styleEditPage.textTertiary}>¿Usted posee un equipo de trabajo?</Text>
                <TouchableOpacity
                    style={styleEditPage.boxBottom}
                    onPress={() => navigation.navigate("CreateProject")}
                >
                    <Text style={styleGeneral.texBottom}>Si, tengo equipo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styleEditPage.boxBottom}
                    onPress={() => navigation.navigate("Teams")}
                >
                    <Text style={styleGeneral.texBottom}>No, no tengo equipo</Text>
                </TouchableOpacity>
            </View>
        </View>


    );
}
export default AddProject;