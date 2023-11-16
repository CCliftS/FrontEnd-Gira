import { View, Text } from "react-native";
import { EditEmailPageProps } from "../../../types/types";
import styleGeneral from "../../public/styles/StyleGeneral";

const EditTeam: React.FC<EditEmailPageProps> = ({ navigation }) => {
    return (
        <View style={styleGeneral.container}>
            <View style={styleGeneral.boxHeader}>
                <Text style={styleGeneral.titleHeader}>Edición de datos</Text>
            </View>
            <Text>Editar equipo</Text>
        </View>
    );
}
export default EditTeam;
