import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const DetailsScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const bookVenue = params?.bookVenue;

  const handleBookVenue = (venueId) => {
    bookVenue && bookVenue(venueId);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{params?.name}</Text>
      <Button title='Book Now' onPress={() => handleBookVenue(params?.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 32,
    marginVertical: 20,
  },
});

export default DetailsScreen;
