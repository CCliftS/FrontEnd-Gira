import { View, Text, Image, TouchableOpacity } from "react-native";
import { HomePageScreenProps } from "../../types/types";
import styleHomePage from "../public/styles/StyleHomePage";
import NavigationBar from "./navbar";
import styleGeneral from "../public/styles/StyleGeneral";

const HomePage: React.FC<HomePageScreenProps> = ({ navigation, route }) => {
    const email = route.params?.data;

    return (
        <View style={styleGeneral.container}>
            <View style={styleHomePage.boxHeader}>
                <Text style={styleHomePage.titleHeader}>Bienvenido 👋</Text>
                <Image
                    source={require('./../public//gira_logo.png')}
                    style={styleHomePage.logo}
                />
            </View>
            <View style={styleGeneral.boxContainer}>
                <Text style={styleGeneral.textSecundary}>MIS EQUIPOS</Text>
                <View style={styleHomePage.boxTeam}>
                    <TouchableOpacity onPress={() => navigation.navigate("MyTeamsPage", { data: email })}>
                        <Image
                            source={require('./../public/icons/equipo-de-usuarios.png')}
                            resizeMode="contain"
                            style={styleHomePage.icon}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styleGeneral.textSecundary}>MIS PROYECTOS</Text>
                <View style={styleHomePage.boxProyect}>
                    <TouchableOpacity onPress={() => navigation.navigate("HomePage", { data: email })}>
                        <Image
                            source={require('./../public/icons/proyecto-de-diagrama.png')}
                            resizeMode="contain"
                            style={styleHomePage.icon}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styleGeneral.textSecundary}>MIS TAREAS</Text>
                <View style={styleHomePage.boxTask}>
                    <TouchableOpacity onPress={() => navigation.navigate("HomePage", { data: email })}>
                        <Image
                            source={require('./../public/icons/comprobacion-de-lista.png')}
                            resizeMode="contain"
                            style={styleHomePage.icon}
                        />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styleGeneral.footer}>
                <NavigationBar navigation={navigation} route={route} data={email} />
            </View>
        </View>
    );
};

export default HomePage;