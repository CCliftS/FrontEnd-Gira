import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { CreateProjectProps } from "../../../types/types";
import styleGeneral from "../../public/styles/StyleGeneral";
import styleTeamPage from "../../public/styles/StyleTeamPage";
import { useState } from "react";
import styleAddPage from "../../public/styles/StyleAddPage";
import NavigationBar from "../common/navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CreateProject: React.FC<CreateProjectProps> = ({ navigation }) => {
    const [nameProject, setNameProject] = useState('');
    const [teams, setTeams] = useState<string[]>([]);
    const [teamCode, setTeamCode] = useState('');

    const hanleCreateProyect = async (nameProject: string, teamCode: string) => {
        try {
            const idOwner = await AsyncStorage.getItem('email');
            setTeams([...teams, teamCode]);
            const response = await axios.post(`http://10.0.2.2:3001/Project/createProject`, {
                nameProject,
                idOwner,
                teams: [...teams, teamCode]
            });
            navigation.navigate("HomePage");
        } catch (error) {
            console.log(error, "No se creó el equipo");
        }
    }

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
                    <Text style={styleTeamPage.textBox1}>Código del equipo</Text>
                    <TextInput
                        style={[styleTeamPage.boxDataItem2, styleGeneral.textSecundary]}
                        value={teamCode}
                        onChangeText={(text: string) => setTeamCode(text)}
                    />
                </View>
                <TouchableOpacity style={styleGeneral.boxBottom1} onPress={() => { setTeams([teamCode]), hanleCreateProyect(nameProject, teamCode) }}>
                    <Text style={styleGeneral.texBottom}>Crear proyecto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleGeneral.boxBottom2} onPress={() => navigation.navigate("Teams")}>
                    <Text style={styleGeneral.texBottom}>Crear equipo</Text>
                </TouchableOpacity>
            </View>
            <View style={styleAddPage.footer}>
                <NavigationBar navigation={navigation} />
            </View>
        </View>
    );
}
export default CreateProject;