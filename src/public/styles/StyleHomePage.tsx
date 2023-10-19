import { StyleSheet } from "react-native"
const styleHomePage = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'white',


    },
    boxHeader: {
        marginTop: 25,
        marginHorizontal: 10,
        width: '100%',
        height: '15%',
        backgroundColor: '#0747a6',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,


    },
    titleHeader: {
        fontSize: 30,
        paddingLeft: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    logo: {
        width: 80, // Ajusta el tamaño de la imagen según tus necesidades
        height: 80, // Ajusta el tamaño de la imagen según tus necesidades
        marginLeft: 14,
    },
    footer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },


});
export default styleHomePage;