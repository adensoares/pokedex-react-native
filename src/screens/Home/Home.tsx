import React, { useEffect, useState } from 'react';
import { Box, Text, Input, VStack, HStack, ScrollView, Image, Heading, Icon, Pressable } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";
import { getPokedex } from '../../api/'
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core';

interface Pokemon {
  id: number;
  number: string;
  name: string;
  image: string;
}

type RootStackParamList = {
  Home: undefined;
  PokemonDetails: { pokemonId: number };
};

function Home() {
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchPokedex = async () => {
      try {
        const data = await getPokedex();
        setPokemons(data);
        setFilteredPokemons(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokedex();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value.toLowerCase()) ||
      pokemon.number.includes(value)
    );

    setFilteredPokemons(filtered);
  };

  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box flex={1}>
      <Box p={4} pt={8} bg="red.500" alignItems="flex-start">
        <HStack alignItems="center" mb={2}>
          <Image
            source={require('../../../assets/images/pokeball.png')}
            alt="Pokeball"
            width={6}
            height={6}
            mr={2}
          />
          <Heading color="white" >
            Pokédex
          </Heading>
        </HStack>
        <Input
        h={8}
          variant="rounded"
          placeholder="Search"
          value={searchTerm}
          onChangeText={handleSearch}
          bg="white"
          _placeholder={{ color: 'gray.400' }}
          _focus={{ backgroundColor: 'white' }}
          InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={5} ml="2" color="muted.400" />} 
          />
      </Box>

      <ScrollView flex={1}>
        <Box p={4}>
          <VStack space={4}>
            <HStack flexWrap="wrap" justifyContent="center">
              {filteredPokemons.map((pokemon) => (
              <Pressable key={pokemon.id} onPress={() => navigation.navigate('PokemonDetails', { pokemonId: pokemon.id })}>
                  <Box
                    key={pokemon.id}
                    borderWidth={1}
                    borderColor="gray.200"
                    borderRadius="md"
                    p={2}
                    m={2}
                    alignItems="center"
                  >
                    <Text position="absolute" top={0} right={2} >
                      #{pokemon.number}
                    </Text>
                    <Image
                      source={{ uri: pokemon.image }}
                      alt={pokemon.name}
                      width={85}
                      height={85}
                    />
                    <Text>{pokemon.name}</Text>
                  </Box>
                </Pressable>

              ))}
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}

export default Home;
