import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../theme/appTheme';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { PokemonCard } from '../components/PokemonCard';

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { simplePokemonList, loadPokemons } = usePokemonPaginated();
    
    return (
        <>
            <Image
                source={ require('../assets/pokebola.png')}
                style={ styles.pokebolaBG }
             />
            <View
                style={{ alignItems: 'center' }}
            >
                <FlatList 
                    data={ simplePokemonList }
                    keyExtractor={ (pokemon) => pokemon.id }
                    showsVerticalScrollIndicator={ false }
                    numColumns={ 2 }

                    // Header
                    ListHeaderComponent={(

                        <Text 
                            style={{
                                ...styles.title,
                                ...styles.globalMargin,
                                top: top + 2,
                                marginBottom: top + 2,
                                paddingBottom: 10
                            }}
                        >
                            Pokedex
                        </Text>
                    )}

                    renderItem={ ({ item }) => (<PokemonCard pokemon={ item } />)}

                    // infinite scroll
                    onEndReached={ loadPokemons }
                    onEndReachedThreshold={ 0.4 }

                    ListFooterComponent={(
                        <ActivityIndicator 
                            style={{ height: 100 }} 
                            size={ 20 }
                            color="grey"
                        />
                    )}
                />
            </View>

        </>
    )
}
