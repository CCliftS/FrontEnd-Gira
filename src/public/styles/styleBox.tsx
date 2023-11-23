import { StyleSheet } from 'react-native';


const styleBox = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#0c04b6',
        height: 150,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    iconHeader: {
        width: 60,
        height: 60,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataContainer: {
        padding: 20,
        height: 300,
        backgroundColor: 'orange',

    },
});
export default styleBox;