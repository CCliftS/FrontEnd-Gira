import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal } from "react-native";
import { EditTaskProps } from "../../../types/types";
import styleBox from "../../public/styles/styleBox";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import styleText from "../../public/styles/styleText";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { ENDPOINT_MS_TASK, ENDPOINT_MS_TEMAMS } from "react-native-dotenv";



interface TeamData {
    nameProject: string;
    teamProjects: string[];
    teamsNames: string[];
}
interface DropdownTeam {
    label: string;
    value: string;
    value_name: string;
    value_id: string;

}
interface DropdownMember {
    label: string;
    value: string;
}
interface Status {
    label: string;
    value: string;
}
const EditTask: React.FC<EditTaskProps> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [modalVisibleOne, setModalVisibleOne] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [membersTeam, setMembersTeam] = useState<string[]>([]);

    const [descriptionTask, setDescriptionTask] = useState<string>("");
    const [emailUserTask, setEmailUserTask] = useState<string>("");
    const [idTeamTask, setIdTeamTask] = useState<string>("");
    const [nameTask, setNameTask] = useState<string>("");
    const [startDate, setStarttDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
    const [statusTask, setStatusTask] = useState<string>("");
    const [modalStartDateVisible, setModalStartDateVisible] = useState<boolean>(false);
    const [modalEndDateVisible, setModalEndDateVisible] = useState<boolean>(false);

    const status: Status[] = [
        { label: "Pendiente", value: '1' },
        { label: "Proceso", value: '2' },
        { label: "Terminado", value: '3' },
    ];

    const [teamData, setTeamData] = useState<TeamData | null>(null);
    const fecthDataTask = async () => {
        try {
            const id = await AsyncStorage.getItem('idTask');
            const response = await axios.get(`${ENDPOINT_MS_TASK}/Tasks/findTaskById/${id}`);
            setNameTask(response.data.name);
            setDescriptionTask(response.data.description);
            setEmailUserTask(response.data.email_user);
            setEndDate(response.data.finish_date);
            setStarttDate(response.data.start_date);
            setIdTeamTask(response.data.id_team);
            setStatusTask(response.data.status);

        } catch (error) {
            setError("No se pudo cargar la tarea");
            setModalVisibleOne(true);
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
    const loadDataProject = async () => {
        try {
            const idProject = await AsyncStorage.getItem('idProject');
            const response = await axios.get(`${ENDPOINT_MS_TEMAMS}/Project/findOneProject/${idProject}`);
            setTeamData(response.data);

        } catch (error) {
            setError("No se pudo cargar el proyecto");
            setModalVisibleOne(true);
        }
    }
    const transformMember = (values: string[]): DropdownMember[] => {
        return values.map((value, index) => ({
            value: `${index + 1}`,
            label: value
        }));
    };
    const loadMembersTeam = async (idTeam: string) => {
        try {
            const response = await axios.get(`${ENDPOINT_MS_TEMAMS}/Member/getMemberTeam/${idTeam}`);
            setMembersTeam(response.data.TeamsEmails);

        } catch (error) {
            setError("No se pudo cargar los miembros del equipo");
            setModalVisibleOne(true);
        }
    };

    const handleChangeName = async (newName: string) => {
        try {
            const id = await AsyncStorage.getItem('idTask');
            const response = await axios.put(`${ENDPOINT_MS_TASK}/Tasks/updateName/${id}`, {
                newName,
            });
            fecthDataTask();
            setModalVisible(true);
        } catch (error) {
            setError("No se pudo actualizar el nombre");
            setModalVisibleOne(true);
        }
    };
    const handleChangeDescription = async (newDescription: string) => {
        try {
            const id = await AsyncStorage.getItem('idTask');
            const response = await axios.put(`${ENDPOINT_MS_TASK}/Tasks/updateDescription/${id}`, {
                newDescription,
            });
            fecthDataTask();
            setModalVisible(true);
        } catch (error) {
            setError("No se pudo actualizar la descripción");
            setModalVisibleOne(true);
        };
    };
    const handleChangeStatus = async (newStatus: string) => {
        try {
            const id = await AsyncStorage.getItem('idTask');
            const response = await axios.put(`${ENDPOINT_MS_TASK}/Tasks/updateStatus/${id}`, {
                newStatus,
            });
            fecthDataTask();
            setModalVisible(true);
        } catch (error) {
            setError("No se pudo actualizar el estado");
            setModalVisibleOne(true);
        }
    };
    const handleTeamAndUser = async (id_team: string, email_user: string) => {
        try {
            const id = await AsyncStorage.getItem('idTask');
            const response = await axios.put(`${ENDPOINT_MS_TASK}/Tasks/updateTeamAndEmailUser/${id}`, {
                id_team,
                email_user,
            });
            fecthDataTask();
            setModalVisible(true);
        } catch (error) {
            setError("No se pudo actualizar el equipo y el usuario");
            setModalVisibleOne(true);
        }
    };
    const handleChangeStartDate = async (newDate: Date) => {
        try {
            const id = await AsyncStorage.getItem('idTask');
            console.log(id);
            const response = await axios.put(`${ENDPOINT_MS_TASK}/Tasks/updateStartDate/${id}`, {
                newDate,
            });
            fecthDataTask();
            setModalVisible(true);
        } catch (error) {
            setError("No se pudo actualizar la fecha de inicio");
            setModalVisibleOne(true);
        }
    };
    const handleChangeEndDate = async (newDate: Date) => {
        try {
            const id = await AsyncStorage.getItem('idTask');
            console.log(id);
            const response = await axios.put(`${ENDPOINT_MS_TASK}/Tasks/updateFinishDate/${id}`, {
                newDate,
            });
            fecthDataTask();
            setModalVisible(true);
        } catch (error) {
            setError("No se pudo actualizar la fecha de termino");
            setModalVisibleOne(true);
        }
    };
    useEffect(() => {
        fecthDataTask();
        loadDataProject();
    }, []);

    return (
        <View style={styleBox.container}>
            <Modal
                animationType="slide"
                visible={modalVisibleOne}
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
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="#0c04b6" style={{ paddingRight: 60 }} />
                </TouchableOpacity>
            </View>
            <View style={styleBox.headerEdit}>
                <Text style={styleText.headerBlack}>Editar Tarea</Text>
                <Text style={styleText.infoEdit}>En esta pestaña se actualiza cada valor de la tarea por serapado, porfavor realiza el cambio que desees y luego presiona el boton de editar, al lado derecho del atributo que deseas cambiar.</Text>
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
                    <Modal
                        animationType="slide"
                        visible={modalVisible}
                        transparent={true}
                    >
                        <View style={styleBox.modalCenter}>
                            <View style={styleBox.modalAlert}>
                                <Text style={styleText.titleOne}>Cambio realizado</Text>
                                <TouchableOpacity style={styleBox.botonConfirm} onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styleText.confirmEdit}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styleText.titleOne}>Descripción</Text>
                        <TouchableOpacity onPress={() => handleChangeDescription(descriptionTask)}>
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
                        <TouchableOpacity onPress={() => handleChangeStatus(statusTask)}>
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
                    <Text style={{ marginTop: 15, fontSize: 15 }}>Nota : Al actualizar equipo debes seleccionar un nuevo miembro del equipo</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styleText.titleOne}>Equipo</Text>
                        <TouchableOpacity onPress={() => handleTeamAndUser(idTeamTask, emailUserTask)}>
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
                        <Text style={[styleText.titleOne, { marginTop: 10 }]}>Fecha inicio</Text>
                        <TouchableOpacity onPress={() => handleChangeStartDate(new Date(startDate))}>
                            <MaterialIcons name="edit" size={30} color="black" />
                        </TouchableOpacity>
                    </View>

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
                                <TouchableOpacity style={styleBox.botonConfirm} onPress={() => setModalStartDateVisible(!modalStartDateVisible)}>
                                    <Text style={styleText.confirmEdit}>Seleccionar Fecha</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={[styleText.titleOne, { marginTop: 10 }]}>Fecha Termino</Text>
                        <TouchableOpacity onPress={() => handleChangeEndDate(new Date(endDate))}>
                            <MaterialIcons name="edit" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
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
                                <TouchableOpacity style={styleBox.botonConfirm} onPress={() => setModalEndDateVisible(!modalEndDateVisible)}>
                                    <Text style={styleText.confirmEdit}>Seleccionar Fecha</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </View>

        </View>
    );
};
export default EditTask;