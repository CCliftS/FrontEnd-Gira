import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { CreateTaskProps } from "../../../types/types";
import styleBox from "../../public/styles/styleBox";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import styleText from "../../public/styles/styleText";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { format } from 'date-fns';

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

const CreateTask: React.FC<CreateTaskProps> = ({ navigation }) => {
    const [nameTask, setNameTask] = useState('');
    const [descriptionTask, setDescriptionTask] = useState('');
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectIdTeam, setSelectIdTeam] = useState("");
    const [selectStatus, setSelectStatus] = useState("");
    const [selectMember, setSelectMember] = useState("");

    const fetchCreateTask = async (name: string, status: string, description: string, id_team: string, email_user: string, start_date: String, finish_date: String) => {
        try {
            const id_project = await AsyncStorage.getItem('idProject');
            const response = await axios.post(`http://10.0.2.2:3002/Tasks/createTask`, {
                name,
                status,
                description,
                id_team,
                id_project,
                email_user,
                start_date,
                finish_date
            });
            navigation.navigate("DataProject");
        } catch (error) {
            console.log(error, "No se creó la tarea");
        }
    };

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

    const status = [
        { label: "Pediente", value: '1' },
        { label: "En proceso", value: '2' },
        { label: "Terminado", value: '3' },
    ];

    useEffect(() => {
        loadDataProject();
    }, []);

    return (
        <View style={styleBox.containerPage}>
            <View style={styleBox.headerPage}>
                <TouchableOpacity onPress={() => navigation.navigate("DataTask")}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="white" style={{ paddingRight: 60 }} />
                </TouchableOpacity>
                <Text style={styleText.header}>Nueva Tarea</Text>
            </View>
            <ScrollView style={styleBox.contentPage}>
                <Text style={styleText.titleOne}>Nombre de la tarea</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={nameTask}
                    onChangeText={(text: string) => setNameTask(text)}
                />
                <Text style={[styleText.titleOne, { marginTop: 10 }]}>Estado de la Tarea</Text>
                <View style={styleBox.infoDropdown}>
                    <Dropdown
                        placeholderStyle={styleText.input}
                        selectedTextStyle={styleText.input}
                        data={status}
                        labelField="label"
                        valueField="label"
                        placeholder="Selecciona un estado "
                        value={selectStatus}
                        onChange={item => {
                            setSelectStatus(item.label);
                        }}
                    />
                </View>
                <Text style={[styleText.titleOne, { marginTop: 10 }]}>Equipo del proyecto</Text>
                <View style={styleBox.infoDropdown}>
                    <Dropdown
                        placeholderStyle={styleText.input}
                        selectedTextStyle={styleText.input}
                        data={teamData ? transformTeam(teamData) : []}
                        labelField="label"
                        valueField="value_name"
                        placeholder="Selecciona un equipo"
                        value={selectIdTeam}
                        onChange={item => {
                            setSelectIdTeam(item.value_id);
                            loadMembersTeam(item.value_id);
                            console.log(item.value_id);
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
                        placeholder="Selecciona un miembro"
                        value={selectMember}
                        onChange={item => {

                            setSelectMember(item.label);
                        }}
                    />
                </View>
                <Text style={[styleText.titleOne, { marginTop: 10 }]}>Descripción</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={descriptionTask}
                    onChangeText={(text: string) => setDescriptionTask(text)}
                />
                <Text style={[styleText.titleOne, { marginTop: 10 }]}>Fecha inicio</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={startDate}
                    placeholder="dd/mm/aaaa"
                    onChangeText={(text: string) => setStartDate(text)}

                />
                <Text style={[styleText.titleOne, { marginTop: 10 }]}>Fecha termino</Text>
                <TextInput
                    style={[styleBox.infoBoton, styleText.input]}
                    value={endDate}
                    placeholder="dd/mm/aaaa"
                    onChangeText={(text: string) => setEndDate(text)}
                />
                <TouchableOpacity style={styleBox.botonEdit} onPress={() => fetchCreateTask(nameTask, selectStatus, descriptionTask, selectIdTeam, selectMember, startDate, endDate)}>
                    <Text style={styleText.titleOne}> Crear Tarea</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 50 }}></View>
            </ScrollView>
        </View>
    );
};
export default CreateTask;