import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import React, { useState } from 'react';

const HomeScreen = ({ navigation }: any) => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');

    const handleLoginPress = () => {
        if (usuario == 'angelo123' && contraseña == 'admin123') {
            navigation.navigate('MainTabs');
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Iniciar sesion</Text>
            <TextInput
                style={styles.input}
                placeholder='usuario'
                value={usuario}
                onChangeText={setUsuario} />
            <TextInput
                style={styles.input}
                placeholder='contraseña'
                value={contraseña}
                onChangeText={setContraseña}
                secureTextEntry />
            <Button color='green' title='Ingresar' onPress={handleLoginPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#344e41',
    },
    text: {
        fontSize: 20,
        color: 'white',
    },
    input: {
        padding: 10,
        margin: 5,
        backgroundColor: '#dad7cd',
        width: '80%',
    }
});

export default HomeScreen;