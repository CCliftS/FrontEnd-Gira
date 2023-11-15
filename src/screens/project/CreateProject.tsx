import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { CreateProjectProps } from "../../../types/types";
import styleGeneral from "../../public/styles/StyleGeneral";
import styleTeamPage from "../../public/styles/StyleTeamPage";
import { useState } from "react";
import styleAddPage from "../../public/styles/StyleAddPage";
import NavigationBar from "../common/navbar";

const CreateProject: React.FC<CreateProjectProps> = ({ navigation }) => {
    const [nameProject, setNameProject] = useState('');
    const [idTeam, setIdTeam] = useState('');
    return (
        <View style={styleGeneral.container}>
            <View style={styleGeneral.boxHeader}>
                <Text style={styleGeneral.titleHeader}>Creación de proyecto</Text>
            </View>
            <View style={styleGeneral.boxContainer}>
                <View style={styleTeamPage.boxDataItem}>
                    <Text style={styleTeamPage.textBox1}>Nombre del proyecto</Text>
                    <TextInput
                        style={[styleTeamPage.boxDataItem2, styleGeneral.textSecundary]}
                        value={nameProject}
                        onChangeText={(text: string) => setNameProject(text)}
                    />
                </View>
                <View style={styleTeamPage.boxDataItem}>
                    <Text style={styleTeamPage.textBox1}>ID del equipo</Text>
                    <TextInput
                        style={[styleTeamPage.boxDataItem2, styleGeneral.textSecundary]}
                        value={idTeam}
                        onChangeText={(text: string) => setIdTeam(text)}
                    />
                </View>
                <TouchableOpacity style={styleGeneral.boxBottom1}>
                    <Text style={styleGeneral.texBottom}>Crear proyecto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleGeneral.boxBottom2} onPress={() => navigation.navigate("Teams")}>
                    <Text style={styleGeneral.texBottom}>Crear equipo</Text>
                </TouchableOpacity>
            </View>
            <View style={styleAddPage.footer}>
                <NavigationBar navigation={navigation} />
            </View>
        </View >
    );
}
export default CreateProject;