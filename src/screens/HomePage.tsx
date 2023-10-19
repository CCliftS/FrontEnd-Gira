import { View, Text, Image } from "react-native";
import { HomePageScreenProps } from "../../types/types";
import styleHomePage from "../public/styles/StyleHomePage";
import NavigationBar from "./navbar";

const HomePage: React.FC<HomePageScreenProps> = ({ navigation, route }) => {
    const email = route.params?.data;

    return (
        <View style={styleHomePage.container}>
            <View style={styleHomePage.boxHeader}>
                <Text style={styleHomePage.titleHeader}>Bienvenido 👋</Text>
                <Image
                    source={require('./../public//gira_logo.png')}
                    style={styleHomePage.logo}
                />
            </View>
            <View style={styleHomePage.footer}>
                <NavigationBar navigation={navigation} route={route} data={email} />
            </View>
        </View>
    );
};

export default HomePage;