import { View, Text, TouchableOpacity, Image } from "react-native";
import { AddPageProps } from "../../types/types";
import styleAddPage from "../public/styles/StyleAddPage";
import styleUserPage from "../public/styles/StyleUserPage";
import NavigationBar from "./navbar";

const AddPage: React.FC<AddPageProps> = ({ navigation, route }) => {
    const email = route.params?.data;
    return (
        <View style={styleAddPage.container}>
            <View style={styleAddPage.boxHeader}>
                <Text style={styleAddPage.titleHeader}>Hora de crear</Text>
            </View>
            <View style={styleAddPage.boxContainer}>
                <View style={styleAddPage.boxAddTeam}>
                    <View style={styleAddPage.boxTextHeader}>
                        <Text style={styleAddPage.titleHeader}>Crear Equipo</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Teams", { data: email })}>
                            <Image
                                source={require('./../public/icons/usuarios.png')}
                                style={styleAddPage.boxIconHeader}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styleAddPage.boxAddProyect}>
                    <View style={styleAddPage.boxTextHeader}>
                        <Text style={styleAddPage.titleHeader}>Crear Proyecto</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("HomePage", { data: email })}>
                            <Image
                                source={require('./../public/icons/api.png')}
                                style={styleAddPage.boxIconHeader}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styleAddPage.boxAddTask}>
                    <View style={styleAddPage.boxTextHeader}>
                        <Text style={styleAddPage.titleHeader}>Crear Tarea</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("HomePage", { data: email })}>
                            <Image
                                source={require('./../public/icons/agregar-documento.png')}
                                style={styleAddPage.boxIconHeader}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styleAddPage.footer}>
                <NavigationBar navigation={navigation} route={route} data={email} />
            </View>
        </View>
    );

}
export default AddPage;