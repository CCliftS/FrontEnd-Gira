import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { EditTaskProps } from "../../../types/types";
import styleBox from "../../public/styles/styleBox";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styleText from "../../public/styles/styleText";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";

interface TeamData {
    nameProject: string;
    teamProjects: string[];
    teamsNames: string[];
}
interface DropdownTeam {
    label: string;
    value: string;
    value_name: string;
    value_id: string; // Nuevo campo value_id

}
interface DropdownMember {
    label: string;
    value: string;
}
const EditTask: React.FC<EditTaskProps> = ({ navigation }) => {
    const fecthDataTask = async () => {
        try {
            const id = await AsyncStorage.getItem('idTask');
            const response = await axios.get(`http://10.0.2.2:3002/Tasks/findTaskById/${id}`);
            setNameTask(response.data.name);
            setDescriptionTask(response.data.description);
            setEmailUserTask(response.data.email_user);
            setFinishDateTask(response.data.finish_date);
            setStartDateTask(response.data.start_date);
            setIdTeamTask(response.data.id_team);
            setStatusTask(response.data.status);

        } catch (error) {
            console.log(error);
        }
    };
    const status = [
        { label: "Pendiente", value: '1' },
        { label: "Proceso", value: '2' },
        { label: "Terminado", value: '3' },
    ];
    const transformTeam = (data: TeamData): DropdownTeam[] => {
        return data.teamsNames.map((name: string, index: number) => ({
            label: name,
            value: `${index + 1}`,
            value_id: data.teamProjects[index],
            value_name: data.teamProjects[index],

        }));
    };

    const [teamData, setTeamData] = useState<TeamData | null>(null);

    const loadDataProject = async () => {
        try {
            const idProject = await AsyncStorage.getItem('idProject');
            const response = await axios.get(`http://10.0.2.2:3001/Project/findOneProject/${idProject}`);
            setTeamData(response.data);

        } catch (error) {
            console.log(error);
        }
    }
    const [membersTeam, setMembersTeam] = useState([]);

    const transformMember = (values: string[]): DropdownMember[] => {
        return values.map((value, index) => ({
            value: `${index + 1}`,
            label: value
        }));
    };
    const loadMembersTeam = async (idTeam: string) => {
        try {
            const response = await axios.get(`http://10.0.2.2:3001/Member/getMemberTeam/${idTeam}`);
            setMembersTeam(response.data.TeamsEmails);

        } catch (error) {
            console.log(error);
        }
    };
    const [descriptionTask, setDescriptionTask] = useState("");
    const [emailUserTask, setEmailUserTask] = useState("");
    const [finishDateTask, setFinishDateTask] = useState("");
    const [idTeamTask, setIdTeamTask] = useState("");
    const [nameTask, setNameTask] = useState("");
    const [startDateTask, setStartDateTask] = useState("");
    const [statusTask, setStatusTask] = useState("");

    const handleChangeName = async (nameTask: string) => {
        try {
            const id = await AsyncStorage.getItem('idTask');
            const response = await axios.post(`http://10.0.2.2:3002/Tasks/updateName`, {
                id,
                nameTask,
            });
            navigation.navigate("DataTask");
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fecthDataTask();
        loadDataProject();
    }, []);

    return (
        <View style={styleBox.container}>
            <View style={styleBox.headerPage}>
                <TouchableOpacity onPress={() => navigation.navigate("DataTask")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="#0c04b6" style={{ paddingRight: 60 }} />
                </TouchableOpacity>
            </View>
            <View style={styleBox.headerEdit}>
                <Text style={styleText.headerBlack}>Editar Tarea</Text>
                <Text style={styleText.infoEdit}>Aca puedes actualizar los valores de tu tarea, ingresa los datos y dependiendo de cual dato quieras cambiar, selecciona el boton correspondiente </Text>
            </View>
            <View style={styleBox.editTask}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styleText.titleOne}>Nombre</Text>
                        <TouchableOpacity onPress={() => handleChangeName(nameTask)}>
                            <MaterialIcons name="edit" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={[styleBox.infoBoton, styleText.input]}
                        value={nameTask}
                        placeholder={nameTask}
                        onChangeText={(text: string) => setNameTask(text)}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styleText.titleOne}>Descripción</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("EditProject")}>
                            <MaterialIcons name="edit" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={[styleBox.infoBoton, styleText.input]}
                        value={descriptionTask}
                        placeholder={descriptionTask}
                        onChangeText={(text: string) => setDescriptionTask(text)}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styleText.titleOne}>Estado</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("EditProject")}>
                            <MaterialIcons name="edit" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styleBox.infoDropdown}>
                        <Dropdown
                            placeholderStyle={styleText.input}
                            selectedTextStyle={styleText.input}
                            data={status}
                            labelField="label"
                            valueField="label"
                            placeholder={statusTask}
                            value={statusTask}
                            onChange={item => {
                                setStatusTask(item.label);
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styleText.titleOne}>Equipo</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("EditProject")}>
                            <MaterialIcons name="edit" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styleBox.infoDropdown}>
                        <Dropdown
                            placeholderStyle={styleText.input}
                            selectedTextStyle={styleText.input}
                            data={teamData ? transformTeam(teamData) : []}
                            labelField="label"
                            valueField="value_name"
                            placeholder={idTeamTask}
                            value={idTeamTask}
                            onChange={item => {
                                setIdTeamTask(item.value_id);
                                loadMembersTeam(item.value_id);
                            }}
                        />
                    </View>
                    <Text style={[styleText.titleOne, { marginTop: 10 }]}>Miembros del equipo</Text>
                    <View style={styleBox.infoDropdown}>
                        <Dropdown
                            placeholderStyle={styleText.input}
                            selectedTextStyle={styleText.input}
                            data={transformMember(membersTeam)}
                            labelField="label"
                            valueField="label"
                            placeholder={emailUserTask}
                            value={emailUserTask}
                            onChange={item => {
                                setEmailUserTask(item.label);
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styleText.titleOne}>Fecha inicio</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("EditProject")}>
                            <MaterialIcons name="edit" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={[styleBox.infoBoton, styleText.input]}
                        value={startDateTask}
                        placeholder={startDateTask}
                        onChangeText={(text: string) => setStartDateTask(text)}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styleText.titleOne}>Fecha inicio</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("EditProject")}>
                            <MaterialIcons name="edit" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={[styleBox.infoBoton, styleText.input]}
                        value={finishDateTask}
                        placeholder={finishDateTask}
                        onChangeText={(text: string) => setFinishDateTask(text)}
                    />
                </ScrollView>
            </View>

        </View>
    );
};
export default EditTask;