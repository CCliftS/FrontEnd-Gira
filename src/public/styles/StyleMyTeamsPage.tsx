import { StyleSheet } from "react-native";

const styleMyTeamsPage = StyleSheet.create({
    boxContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: 20,
        width: '90%',
        height: '71%',
        backgroundColor: '#44749d',
        marginHorizontal: 20,
        flexDirection: 'column',
        //justifyContent: 'center',
        paddingVertical: 4,
        alignItems: 'center'
    },
    boxItem: {
        marginTop: 20,
        fontSize: 20,
        width: 300,
        height: 100,
        backgroundColor: '#ebe8e8',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textData: {
        fontSize: 20,
        color: '#44749d',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    icon: {
        width: 35, // Ajusta el ancho de la imagen según tus necesidades
        height: 35,
    },
});
export default styleMyTeamsPage;