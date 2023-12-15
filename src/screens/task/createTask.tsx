import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal } from "react-native";
import { CreateTaskProps } from "../../../types/types";
import styleBox from "../../public/styles/styleBox";
import { Feather, Ionicons } from '@expo/vector-icons';
import styleText from "../../public/styles/styleText";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';


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
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');

    const [nameTask, setNameTask] = useState('');
    const [descriptionTask, setDescriptionTask] = useState('');
    const [startDate, setStarttDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [selectIdTeam, setSelectIdTeam] = useState("");
    const [selectStatus, setSelectStatus] = useState("");
    const [selectMember, setSelectMember] = useState("");
    const [modalStartDateVisible, setModalStartDateVisible] = useState(false);
    const [modalEndDateVisible, setModalEndDateVisible] = useState(false);

    const fetchCreateTask = async (name: string, status: string, description: string, id_team: string, email_user: string, start_date: Date, finish_date: Date) => {
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
            navigation.navigate("DataTask");
        } catch (error) {
            setError("No se pudo crear la tarea");
            setModalVisible(true);
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
            setError("No se pudo cargar el proyecto");
            setModalVisible(true);
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
            setError("No se pudo cargar los miembros del equipo");
            setModalVisible(true);
        }
    };

    const status = [
        { label: "Pendiente", value: '1' },
        { label: "Proceso", value: '2' },
        { label: "Terminado", value: '3' },
    ];

    useEffect(() => {
        loadDataProject();
    }, []);

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
                <TouchableOpacity style={styleBox.infoBoton} onPress={() => setModalStartDateVisible(true)}>
                    <Text style={styleText.input}>{dayjs(startDate).format('DD/MM/YYYY')}</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    visible={modalStartDateVisible}
                    transparent={true}
                >
                    <View style={{ height: '50%', justifyContent: 'flex-end', flex: 1, padding: 20 }}>
                        <TouchableOpacity style={{ height: '35%', width: '100%' }} onPress={() => setModalStartDateVisible(false)}></TouchableOpacity>
                        <View style={{ backgroundColor: 'white', height: '65%', width: '100%', justifyContent: 'center', alignItems: 'center', padding: 20, borderRadius: 10, elevation: 5 }}>
                            <DateTimePicker
                                minimumDate={dayjs().startOf('day')}
                                value={startDate}
                                mode='date'
                                onValueChange={(date: DateType) => setStarttDate(date ? date.toString() : '')}
                            />
                            <TouchableOpacity style={styleBox.botonEdit} onPress={() => setModalStartDateVisible(!modalStartDateVisible)}>
                                <Text style={styleText.titleOne}>Seleccionar Fecha</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Text style={[styleText.titleOne, { marginTop: 10 }]}>Fecha termino</Text>
                <TouchableOpacity style={styleBox.infoBoton} onPress={() => setModalEndDateVisible(true)}>
                    <Text style={styleText.input}>{dayjs(endDate).format('DD/MM/YYYY')}</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    visible={modalEndDateVisible}
                    transparent={true}
                >
                    <View style={{ height: '50%', justifyContent: 'flex-end', flex: 1, padding: 20 }}>
                        <TouchableOpacity style={{ height: '30%', width: '100%' }} onPress={() => setModalEndDateVisible(false)}></TouchableOpacity>
                        <View style={{ backgroundColor: 'white', height: '65%', width: '100%', justifyContent: 'center', alignItems: 'center', padding: 20, borderRadius: 10, elevation: 5 }}>
                            <DateTimePicker
                                minimumDate={dayjs().startOf('day')}
                                value={endDate}
                                mode='date'
                                onValueChange={(date: DateType) => setEndDate(date ? date.toString() : '')}
                            />
                            <TouchableOpacity style={[styleBox.botonEdit]} onPress={() => setModalEndDateVisible(!modalEndDateVisible)}>
                                <Text style={styleText.titleOne}>Seleccionar Fecha</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity style={styleBox.botonEdit} onPress={() => fetchCreateTask(nameTask, selectStatus, descriptionTask, selectIdTeam, selectMember, new Date(startDate), new Date(endDate))}>
                    <Text style={styleText.titleOne}>Crear Tarea</Text>
                </TouchableOpacity>

                <View style={{ marginTop: 50 }}></View>
            </ScrollView>
        </View>
    );
};
export default CreateTask;