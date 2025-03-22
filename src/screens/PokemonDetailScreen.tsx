import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
}

const PokemonDetailScreen = ({ route }: any) => {
    const { pokemonId } = route.params;
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPokemonDetails();
    }, [pokemonId]);

    const fetchPokemonDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const data = await response.json();
            setPokemon(data);
        } catch (err) {
            setError('Error fetching Pokemon details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando detalles...</Text>
            </View>
        );
    }

    if (error || !pokemon) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error || 'No se pudo cargar el Pokémon'}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={fetchPokemonDetails}
                >
                    <Text style={styles.buttonText}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name}>
                {pokemon.name.toUpperCase()}
            </Text>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
                    style={styles.image}
                />
            </View>

            <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoValue}>{pokemon.height / 10} m</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoValue}>{pokemon.weight / 10} kg</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoValue}>{pokemon.base_experience} LVL</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#3498db',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    infoCard: {
        margin: 10,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    infoRow: {
        marginBottom: 8,
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    infoValue: {
        fontSize: 20,
        padding: 20,
        borderRadius: 50,
        backgroundColor: '#003f88',
        color: 'white',
    },
});

export default PokemonDetailScreen;