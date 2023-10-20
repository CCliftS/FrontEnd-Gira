import { StyleSheet } from "react-native"
const styleHomePage = StyleSheet.create({
    boxHeader: {
        marginTop: 25,
        marginHorizontal: 10,
        width: '100%',
        height: '15%',
        backgroundColor: '#44749d',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,


    },
    titleHeader: {
        fontSize: 35,
        paddingLeft: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    logo: {
        width: 80,
        height: 80,

    },
    boxTeam: {
        marginTop: 10,
        marginVertical: 10,
        width: '90%',
        height: "20%",
        backgroundColor: '#d9bf56',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    boxProyect: {
        marginTop: 10,
        marginVertical: 10,
        width: '90%',
        height: "20%",
        backgroundColor: '#f9774b',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    boxTask: {
        marginTop: 10,
        marginVertical: 10,
        width: '90%',
        height: "20%",
        backgroundColor: '#f22b56',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    icon: {
        width: 80,
        height: 80,
    },

});
export default styleHomePage;