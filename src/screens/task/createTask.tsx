import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { CreateTaskProps } from "../../../types/types";
import styleBox from "../../public/styles/styleBox";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import styleText from "../../public/styles/styleText";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface DropdownItem {
    label: string;
    value: string;
}

const CreateTask: React.FC<CreateTaskProps> = ({ navigation }) => {
    const [selectTeam, setSelectTeam] = useState("");
    const [selectStatus, setSelectStatus] = useState("");

    const transformDatabaseValues = (values: string[]): DropdownItem[] => {
        return values.map((value, index) => ({
            value: `${index + 1}`,
            label: value
        }));
    };

    const [teamProjects, setTeamProjects] = useState<string[]>([]);
    const [idTeams, setIdTeams] = useState<string[]>([]);
    const loadDataProject = async () => {
        try {
            const idProject = await AsyncStorage.getItem('idProject');
            const response = await axios.get(`http://10.0.2.2:3001/Project/findOneProject/${idProject}`);
            setTeamProjects(response.data.teamsNames);
            setIdTeams(response.data.teamProjects);

        } catch (error) {
            console.log(error);
        }
    }

    const status = [
        { label: "Pediente", value: '1' },
        { label: "En proceso", value: '2' },
        { label: "Terminado", value: '3' },
    ];
    const [nameTask, setNameTask] = useState('');

    useEffect(() => {
        loadDataProject();
    }, []);
    useEffect(() => {
        // Transformar los valores de la base de datos al formato requerido al cargar el componente
        const transformedValues = transformDatabaseValues(teamProjects);
        // Utilizar los valores transformados en el componente Dropdown
        // ... resto de tu código aquí
    }, [teamProjects]);
    return (
        <View style={styleBox.containerPage}>
            <View style={styleBox.headerPage}>
                <TouchableOpacity onPress={() => navigation.navigate("DataProject")}>
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
                        valueField="value"
                        placeholder="Selecciona un estado "
                        value={selectStatus}
                        onChange={item => {
                            setSelectStatus(item.value);
                        }}
                    />
                </View>
                <Text style={[styleText.titleOne, { marginTop: 10 }]}>Equipo del usuario</Text>
                <View style={styleBox.infoDropdown}>
                    <Dropdown
                        placeholderStyle={styleText.input}
                        selectedTextStyle={styleText.input}
                        data={transformDatabaseValues(teamProjects)}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecciona un equipo"
                        value={selectTeam}
                        onChange={item => {
                            setSelectTeam(item.value);
                        }}
                    />
                </View>


            </ScrollView>
        </View>
    );
};
export default CreateTask;