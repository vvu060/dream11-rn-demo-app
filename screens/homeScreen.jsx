import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [bookings, setBookings] = useState([]);
  const [bookedItems, setBookedItems] = useState([]);

  const bookVenue = (venueId) => {
    setBookedItems([...bookedItems, venueId]);
  };

  const goToDetailsScreen = (name, id) => {
    navigation.navigate('DetailsScreen', {
      name,
      id,
      bookVenue: bookVenue,
    });
  };

  const Item = ({ name, id }) => {
    const isBooked = bookedItems.includes(id);

    return (
      <Pressable onPress={() => goToDetailsScreen(name, id)}>
        <View style={[styles.item, isBooked && styles.bookedItem]}>
          <Text style={[styles.name, isBooked && styles.bookedText]}>
            {name}
          </Text>
        </View>
      </Pressable>
    );
  };

  const getBookings = async () => {
    await fetch('https://www.jsonkeeper.com/b/1CBQ')
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item name={item.name} id={item.id} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
  },
  bookedItem: {
    backgroundColor: '#eee',
  },
  bookedText: {
    color: 'gray',
  },
});

export default HomeScreen;
