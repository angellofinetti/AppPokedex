import { View, Text, StyleSheet, Button, Image } from 'react-native';

const ProfileScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.imageUser}
                source={{ uri: 'https://img.freepik.com/vector-gratis/avatar-personaje-empresario-aislado_24877-60111.jpg' }} >
            </Image>
            <Text style={styles.text}>Usuario: Angelo</Text>
            <Text style={styles.text}>Correo: angelo@gmail.com</Text>
            <Text style={styles.text}>Celular: +51 983355274</Text>
            <Text style={styles.text}>Rol: Administrador</Text>
            <Text style={styles.text}>Ciudad: Lima, Peru</Text>
            <Button color='red' title='Log out' onPress={() => navigation.replace('Login')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        margin: 5,
    },
    imageUser: {
        width: 450,
        height: 600,
    }
});

export default ProfileScreen;


