import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList, ActivityIndicator, TextInput } from 'react-native';
import PokemonCard from '../components/PokemonCard';

interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
}

const HomeScreen = ({ navigation }: any) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPokemons();
    }, []);

    useEffect(() => {
        filterPokemons();
    }, [searchTerm, pokemons]);

    const filterPokemons = () => {
        if (searchTerm === '') {
            setFilteredPokemons(pokemons);
        } else {
            const filtered = pokemons.filter(pokemon => 
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPokemons(filtered);
        }
    };

    const fetchPokemons = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
            const data = await response.json();

            const pokemonList = await Promise.all(data.results.map(async (pokemon: any) => {
                const pokemonResponse = await fetch(pokemon.url);
                const pokemonData = await pokemonResponse.json();
                return {
                    id: pokemonData.id,
                    name: pokemonData.name,
                    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`
                };
            }));
            setPokemons(pokemonList);
            setFilteredPokemons(pokemonList);
        } catch (err) {
            setError('Error fetching Pokemon data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePokemonPress = (pokemonId: number) => {
        navigation.navigate('PokemonDetail', { pokemonId });
    };

    const renderPokemonItem = ({ item }: { item: Pokemon }) => (
        <PokemonCard pokemon={item} onPress={handlePokemonPress} />
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando Pokémon...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Reintentar" onPress={fetchPokemons} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pokédex</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar Pokémon..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    autoCapitalize="none"
                />
            </View>
            {filteredPokemons.length > 0 ? (
                <FlatList
                    data={filteredPokemons}
                    renderItem={renderPokemonItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>No se encontraron Pokémon con ese nombre</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 10,
    },
    searchContainer: {
        marginBottom: 10,
        width: '100%',
    },
    searchInput: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
    },
    listContainer: {
        paddingVertical: 10,
    },
    text: {
        fontSize: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    }
});

export default HomeScreen;