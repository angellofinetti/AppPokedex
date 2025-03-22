import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
}

interface PokemonCardProps {
    pokemon: Pokemon;
    onPress: (pokemonId: number) => void;
}

const PokemonCard = ({ pokemon, onPress }: PokemonCardProps) => {
    return (
        <TouchableOpacity
            style={styles.pokemonCard}
            onPress={() => onPress(pokemon.id)}
        >
            <Image
                source={{ uri: pokemon.imageUrl }}
                style={styles.pokemonImage}
            />
            <Text style={styles.pokemonName}>{pokemon.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    pokemonCard: {
        borderRadius: 30,
        padding: 5,
        margin: 5,
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
    },
    pokemonImage: {
        width: 150,
        resizeMode: 'contain',
        height: 150,
    },
    pokemonName: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default PokemonCard;