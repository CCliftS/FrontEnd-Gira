import { View, Text } from "react-native";
import { DataTeamPageProps } from "../../../types/types";
import styleGeneral from "../../public/styles/StyleGeneral";
import NavigationBar from "../common/navbar";
import styleDataTeamPage from "../../public/styles/StyleDataTeam";
import { useState } from "react";

const DataTeamPage: React.FC<DataTeamPageProps> = ({ navigation, route }) => {
    const role: string = "administrador";
    const [membersTeam, setMembersTeam] = useState([]);


    return (
        <View style={styleGeneral.container}>
            <View style={styleGeneral.boxHeader}>
                <Text style={styleGeneral.titleHeader}>Equipo -nameTeam-</Text>
            </View>
            <View style={styleDataTeamPage.boxMembers}>
                <Text style={styleGeneral.titleHeader}>Miebros del equipo</Text>
                <View style={styleDataTeamPage.boxDataMembers}>
                    {/* Aqui se deben mostrtar los miembros del equipo*/}
                </View>
            </View>

            {role === "administrador" ? (
                <View style={styleDataTeamPage.containerBottom}>
                    <View style={styleDataTeamPage.boxBottom}>
                        <Text style={styleGeneral.textSecundary}>Agregar Miembro</Text>
                    </View>
                    <View style={styleDataTeamPage.boxBottom}>
                        <Text style={styleGeneral.textSecundary}>Editar Roles</Text>
                    </View>
                    <View style={styleDataTeamPage.boxBottom}>
                        <Text style={styleGeneral.textSecundary}>Editar equipo</Text>
                    </View>
                </View>
            ) : (
                <View style={styleDataTeamPage.containerBottom}>
                    <View style={styleDataTeamPage.boxBottom}>
                        <Text style={styleGeneral.textSecundary}>Salir del equipo</Text>
                    </View>
                    <View style={styleDataTeamPage.boxBottom}>
                        <Text style={styleGeneral.textSecundary}>Volver</Text>
                    </View>
                </View>
            )}

            <View style={styleGeneral.footer}>
                <NavigationBar navigation={navigation} />
            </View>
        </View>
    )

};
export default DataTeamPage;