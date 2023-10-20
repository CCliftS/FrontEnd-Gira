import { StyleSheet } from "react-native";

const styleGeneral = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebe7e0',
    },
    footer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    boxHeader: {
        marginTop: 25,
        marginHorizontal: 20,
        width: '90%',
        height: '10%',
        backgroundColor: '#44749d',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    titleHeader: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    boxContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        //marginTop: 10,
        width: '90%',
        height: '71%',
        //backgroundColor: '#c6d4e1',
        marginHorizontal: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingVertical: 4,
        alignItems: 'center'
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
    textPrimary: {
        marginTop: 30,
        fontSize: 55,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textSecundary: {
        fontSize: 20,
        color: '#44749d',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 40, // Ajusta el ancho de la imagen según tus necesidades
        height: 40,
    },
});
export default styleGeneral;