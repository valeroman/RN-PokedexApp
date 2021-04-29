import React, { useEffect, useRef, useState } from 'react';
import ImageColors from "react-native-image-colors"
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useNavigation } from '@react-navigation/core';

interface Props {
    pokemon: SimplePokemon 
}

const windowWidth = Dimensions.get('window').width;

export const PokemonCard = ({ pokemon }: Props) => {

    const navigation = useNavigation();

    const [bgColor, setBgColor] = useState('grey');

    const isMouted = useRef(true);

    useEffect(() => {
       ImageColors.getColors(pokemon.picture, { fallback: 'grey' })
        .then( (colors: { platform: string; dominant: string; background: string; average: string; vibrant: string }) => {

            if (!isMouted.current) return;
            
            (colors.platform === 'android') 
                ? setBgColor(colors.dominant || 'gray')
                : setBgColor(colors.background || 'gray')
        });
        
        return () => {
            isMouted.current = false;
        }

    }, [])


    return (
        <TouchableOpacity
            activeOpacity={ 0.9 }
            onPress={ 
                () => navigation.navigate('PokemonScreen', { 
                    simplePokemon: pokemon,
                    color: bgColor 
                })
            }
        >
            <View 
                style={{
                    ...styles.cardContainer,
                    width: windowWidth * 0.4,
                    backgroundColor: bgColor,
                }}
            >
                {/* nombre del pokemon y ID */}
                <View>
                    <Text style={ styles.name }>
                        { pokemon.name }
                        { '\n#' + pokemon.id }
                    </Text>
                </View>

                <View style={ styles.pokebolaContainer }>
                    <Image 
                        source={ require('../assets/pokebola-blanca.png') }
                        style={ styles.pokebola }
                    />
                </View>

                <FadeInImage 
                    uri={ pokemon.picture}
                    style={ styles.pokemonImage}
                />

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        // backgroundColor: 'grey',
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: -25,
        right: -25,
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokebolaContainer: {
        // backgroundColor: 'blue',
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    }
});
