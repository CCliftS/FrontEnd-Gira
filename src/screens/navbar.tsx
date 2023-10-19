import { View, Text, Image, TouchableOpacity } from "react-native";
import styleNavbar from "../public/styles/StyleNavbar";
import { navbarProps } from "../../types/types";

const NavigationBar: React.FC<navbarProps> = ({ navigation, route }) => {
    const email = route.params?.data;
    return (
        <View style={styleNavbar.nav}>
            <View style={[styleNavbar.navItem, styleNavbar.firstNavItem]}>
                <TouchableOpacity onPress={() => navigation.navigate("HomePage", { data: email })}>
                    <Image
                        source={require('./../public/icons/hogar.png')}
                        style={styleNavbar.navItemIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

            </View>
            <View style={styleNavbar.navItem}>
                <TouchableOpacity onPress={() => navigation.navigate("AddPage", { data: email })}>
                    <Image
                        source={require('./../public/icons/agregar.png')}
                        style={styleNavbar.navItemIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

            </View>
            <View style={styleNavbar.navItem}>
                <TouchableOpacity onPress={() => navigation.navigate("UserPage", { data: email })}>
                    <Image
                        source={require('./../public/icons/usuario.png')}
                        style={styleNavbar.navItemIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View style={styleNavbar.navItem}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Image
                        source={require('./../public/icons/salida.png')}
                        style={styleNavbar.navItemIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
}
export default NavigationBar;