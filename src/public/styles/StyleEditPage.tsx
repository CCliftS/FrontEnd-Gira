import { StyleSheet } from "react-native";
const styleEditPage = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebe7e0',
    },
    boxData: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        //marginTop: 10,
        width: '90%',
        height: '80%',
        backgroundColor: '#44749d',
        marginHorizontal: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingVertical: 4,
        alignItems: 'center'
    },
    boxBottom: {
        marginTop: 20,
        width: '90%',
        height: "10%",
        backgroundColor: '#d9bf56',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
    },
    textPrimary: {
        marginTop: 30,
        fontSize: 55,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textSecundary: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
    },
    boxDataItem: {
        marginTop: 15,
        width: '90%',
        height: "20%",
        backgroundColor: '#44749d',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
    },
    boxDataItem2: {
        marginTop: 10,
        fontSize: 20,
        width: "90%",
        height: "40%",
        backgroundColor: '#ebe8e8',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },

});
export default styleEditPage;