import { View, Text, Image, TouchableOpacity } from "react-native";
import styleNavbar from "../../public/styles/StyleNavbar";
import { navbarProps } from "../../../types/types";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

const NavigationBar: React.FC<navbarProps> = ({ navigation }) => {
    return (
        <View style={styleNavbar.nav}>

            <View style={styleNavbar.navItem}>
                <TouchableOpacity onPress={() => navigation.navigate("UserPage")}>
                    <FontAwesome5 name="user-alt" size={34} color="white" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("HomePage")} style={[styleNavbar.navItem, styleNavbar.firstNavItem]}>
                <Entypo name="home" size={38} color="#0c04b6" />
            </TouchableOpacity>
            <View style={styleNavbar.navItem}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <FontAwesome5 name="sign-out-alt" size={40} color="white" />
                </TouchableOpacity>

            </View>
        </View>
    );
}
export default NavigationBar;