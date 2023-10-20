import { View } from "react-native";
import { MyTeamsPageProps } from "../../types/types";
import styleGeneral from "../public/styles/StyleGeneral";
import NavigationBar from "./navbar";

const MyTeamsPage: React.FC<MyTeamsPageProps> = ({ navigation, route }) => {
    const email = route.params?.data;
    return (
        <View style={styleGeneral.container}>
            <View style={styleGeneral.footer}>
                <NavigationBar navigation={navigation} route={route} data={email} />
            </View>
        </View>
    );
}
export default MyTeamsPage;