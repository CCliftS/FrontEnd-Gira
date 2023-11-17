import { FlatList, ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { DataProjectProps } from "../../../types/types";
import styleGeneral from "../../public/styles/StyleGeneral";
import NavigationBar from "../common/navbar";
import styleProjectUser from "../../public/styles/StyleProject";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";

const DataProject: React.FC<DataProjectProps> = ({ navigation }) => {
    const nameProject = useAsyncStorage('nameProject');
    return (
        <View style={styleGeneral.container}>
            <View style={styleProjectUser.boxHeader}>
                <Text style={styleGeneral.titleHeader}>Proyecto</Text>
                <TouchableOpacity style={styleGeneral.icon} onPress={() => navigation.navigate("UserEdit")}>
                    <Image
                        source={require('../../public/icons/cuadrado-de-la-pluma.png')}
                        style={styleGeneral.icon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View style={styleProjectUser.boxContainer2}>
                <ScrollView>
                    <Text style={styleProjectUser.textTitle}>Equipos</Text>
                    <View style={styleProjectUser.boxItemList}>

                    </View>
                </ScrollView>
            </View>



            <View style={styleGeneral.footer}>
                <NavigationBar navigation={navigation} />
            </View>
        </View>
    );

}
export default DataProject;