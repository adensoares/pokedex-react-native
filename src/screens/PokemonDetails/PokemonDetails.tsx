import { useEffect, useState } from 'react';
import { Box, Divider, HStack, ScrollView, Text, VStack, Image, Spinner, Pressable, Icon, Badge, Heading, Progress  } from 'native-base';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getPokemonDetails, getPokemonFlavorText } from '../../api/services/PokemonService';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5  } from "@expo/vector-icons";
import { getColorByType, getColorByStat, abbreviateStat } from '../../utils';
import { StackNavigationProp } from '@react-navigation/stack';

type PokemonDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'PokemonDetails'>;




type RootStackParamList = {
  Home: undefined;
  PokemonDetails: { pokemonId: number };
};

type PokemonDetailsRouteProp = RouteProp<RootStackParamList, 'PokemonDetails'>;

interface PokemonDetails {
  number: string;
  name: string;
  image: string;
  types: string[];
  weight: number;
  height: number;
  moves: string[];
  flavorText: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}

function PokemonDetails() {
  const navigation = useNavigation<PokemonDetailsNavigationProp>();
  const route = useRoute<PokemonDetailsRouteProp>();
  const pokemonId = route.params.pokemonId;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
        try {
            const pokemonDetails = await getPokemonDetails(pokemonId);
            const flavorText = await getPokemonFlavorText(pokemonId.toString());
            setPokemon({ ...pokemonDetails, flavorText });
        } catch (error) {
            console.error('Error fetching Pokémon details:', error);
            setError(true);
        }
          finally {
            setLoading(false);
        }
    };

    fetchPokemon();
  }, [pokemonId]);

  function nextPokemon() {
    const nextId = pokemonId + 1;
    navigation.navigate('PokemonDetails', { pokemonId: nextId });
  }
  
  function prevPokemon() {
    const prevId = pokemonId - 1;
    if (prevId > 0) {
      navigation.navigate('PokemonDetails', { pokemonId: prevId });
    }
  }
  

  return (
    <Box flex={1}>
      {loading ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Spinner bg={"red.500"} size={'lg'} accessibilityLabel="Loading..." />
        </Box>
      ) : error ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text color="red.500">{error}</Text>
        </Box>
      ) : (
          <Box flex={1}>
            {pokemon && pokemon.types && (
            <ScrollView flex={1} bg={getColorByType(pokemon.types[0])} py={4} px={2} >
                <Image
                source={require('../../../assets/images/pokeball.png')}
                alt="Pokebola"
                boxSize={215}
                position="absolute"
                right={0}
                top={0}
                zIndex={-1}
                style={{ opacity: 0.1 }}
                />
                <HStack  justifyContent="space-between" alignItems="center" padding={5} >
                <HStack alignItems="center">
                    <Pressable onPress={() => navigation.goBack()} pr={4}>
                    <Icon as={MaterialIcons} name="arrow-back" size={8} color={"white"}/>
                    </Pressable>
                    <Text fontSize="2xl" fontWeight="bold" color={"white"}>{pokemon.name} </Text>
                </HStack>
                <Text fontSize="md" fontWeight="bold" color={"white"}>#{pokemon.number} </Text>
                </HStack>


                <Box bg={'white'} mt={150} borderTopRadius={"lg"} p={4} >
                    <HStack justifyContent={"space-between"}>
                    {pokemonId > 1 ? (
                        <Pressable onPress={prevPokemon} >
                            <MaterialIcons name="chevron-left" size={28} color={"grey"}/>
                        </Pressable>
                    ) : (
                        <Box></Box> // Componente vazio para manter o espaço
                    )}

                    <Pressable onPress={nextPokemon} >
                        <MaterialIcons name="chevron-right" size={28} color={"grey"}/>
                    </Pressable>
                    </HStack>

                    <VStack alignItems="center" space={4}>
                        <Image source={{ uri: pokemon.image }} alt={pokemon.name} boxSize={250} marginTop={-225} />

                        <HStack space={4}>
                        {pokemon.types.map((type) => (
                            <Badge variant="solid" rounded="2xl" px={4} py={1} bg={getColorByType(type)} key={type}>
                                <Text color={"white"} fontWeight={"bold"}>{type}</Text>
                            </Badge>
                        ))}
                        </HStack>
                    </VStack>

                    <Heading p={4} size="md" fontWeight="bold" textAlign={"center"} color={getColorByType(pokemon.types[0])}>About</Heading>

                    <HStack justifyContent="center" pb={4} space={6}>
                        <VStack alignItems="center" justifyContent="space-between">
                            <HStack alignItems="center">
                                <Icon as={FontAwesome5} name="weight-hanging" size={5}  />
                                <Text pl={2}>{pokemon.weight} kg</Text>
                            </HStack>
                            <Text fontSize={10}>Weight</Text>
                        </VStack>
                        
                        <Divider orientation='vertical'thickness="1.5"/>

                        <VStack alignItems="center" justifyContent="space-between">
                            <HStack alignItems="center">
                                <Icon as={FontAwesome5} name="ruler" size={5}  />
                                <Text pl={2}>{pokemon.height} kg</Text>
                            </HStack>
                            <Text fontSize={10}>Height</Text>
                        </VStack>

                        <Divider orientation='vertical' thickness="1.5" />      

                        <VStack alignItems="center" justifyContent="space-between">
                            {pokemon.moves.map((move) => <Text key={move}>{move}</Text>)}
                            <Text  fontSize={10}>Moves</Text>
                        </VStack>
                    </HStack>

                    <HStack padding={5} alignItems="flex-start" justifyContent="center">
                        <Text>{pokemon.flavorText}</Text>
                    </HStack>

                    <Heading p={4} size="md" fontWeight="bold" textAlign={"center"} color={getColorByType(pokemon.types[0])}>Base Stats</Heading>

                    <VStack px={5} pb={5} space={4}>
                        <HStack  space={4}>
                            <VStack alignItems="flex-end">
                                <Text fontWeight="bold" color={getColorByType(pokemon.types[0])}>HP</Text>
                                <Text fontWeight="bold" color={getColorByType(pokemon.types[0])}>ATK</Text>
                                <Text fontWeight="bold" color={getColorByType(pokemon.types[0])}>DEF</Text>
                                <Text fontWeight="bold" color={getColorByType(pokemon.types[0])}>SATK</Text>
                                <Text fontWeight="bold" color={getColorByType(pokemon.types[0])}>SDEF</Text>
                                <Text fontWeight="bold" color={getColorByType(pokemon.types[0])}>SPD</Text>
                            </VStack>

                            <Divider orientation='vertical'/>

                            <VStack>
                                <Text >{pokemon.stats.hp}</Text>
                                <Text >{pokemon.stats.attack}</Text>
                                <Text >{pokemon.stats.defense}</Text>
                                <Text >{pokemon.stats.specialAttack}</Text>
                                <Text >{pokemon.stats.specialDefense}</Text>
                                <Text >{pokemon.stats.speed}</Text>
                            </VStack>  

                            <VStack flex={1} space={3.5} pt={1}>
                                <Progress value={pokemon.stats.hp} max={255} _filledTrack={{bg: getColorByType(pokemon.types[0])}}/>
                                <Progress value={pokemon.stats.attack} max={255} _filledTrack={{bg: getColorByType(pokemon.types[0])}}/>
                                <Progress value={pokemon.stats.defense} max={255} _filledTrack={{bg: getColorByType(pokemon.types[0])}}/>
                                <Progress value={pokemon.stats.specialAttack} max={255} _filledTrack={{bg: getColorByType(pokemon.types[0])}}/>
                                <Progress value={pokemon.stats.specialDefense} max={255} _filledTrack={{bg: getColorByType(pokemon.types[0])}}/>
                                <Progress value={pokemon.stats.speed} max={255} _filledTrack={{bg: getColorByType(pokemon.types[0])}}/>
                            </VStack> 
                        </HStack>
                    </VStack>
                </Box>
            </ScrollView>
            )}
        </Box>
      
    )}
    </Box>
  );
};

export default PokemonDetails;
