import { StyleSheet } from "react-native"
const styleNavbar = StyleSheet.create({
    nav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80, // Ajusta la altura de la barra de navegación según tus necesidades
        backgroundColor: '#0c04b6',
        flexDirection: 'row', // Alinea los elementos horizontalmente
        justifyContent: 'space-between', // Distribuye los elementos de manera uniforme
        paddingHorizontal: 16, // Espacio horizontal interno para los elementos de navegación
        alignItems: 'center', // Centra verticalmente el contenido
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    firstNavItem: {
        fontSize: 20,
        height: 55,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 18,
    },
    navItemIcon: {
        width: 34, // Ajusta el ancho de la imagen según tus necesidades
        height: 34, // Ajusta la altura de la imagen según tus necesidades
        marginVertical: 6, // Ajusta el margen vertical de la imagen según tus necesidades
    },
});
export default styleNavbar;