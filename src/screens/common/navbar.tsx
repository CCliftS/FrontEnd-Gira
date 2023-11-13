import { View, Text, Image, TouchableOpacity } from "react-native";
import styleNavbar from "../../public/styles/StyleNavbar";
import { navbarProps } from "../../../types/types";

const NavigationBar: React.FC<navbarProps> = ({ navigation }) => {
    return (
        <View style={styleNavbar.nav}>
            <View style={[styleNavbar.navItem, styleNavbar.firstNavItem]}>
                <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
                    <Image
                        source={require('../../public/icons/hogar.png')}
                        style={styleNavbar.navItemIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

            </View>
            <View style={styleNavbar.navItem}>
                <TouchableOpacity onPress={() => navigation.navigate("AddPage")}>
                    <Image
                        source={require('../../public/icons/agregar.png')}
                        style={styleNavbar.navItemIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

            </View>
            <View style={styleNavbar.navItem}>
                <TouchableOpacity onPress={() => navigation.navigate("UserPage")}>
                    <Image
                        source={require('../../public/icons/usuario.png')}
                        style={styleNavbar.navItemIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View style={styleNavbar.navItem}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Image
                        source={require('../../public/icons/salida.png')}
                        style={styleNavbar.navItemIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
}
export default NavigationBar;