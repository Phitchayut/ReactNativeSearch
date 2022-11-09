import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Searchbar, ActivityIndicator, MD2Colors} from 'react-native-paper';

const App = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    fetch('https://www.melivecode.com/api/attractions?search=' + searchQuery)
      .then(res => res.json())
      .then(result => {
        setItems(result);
        setIsLoading(false);
      });
  }, [isLoading]);

  const renderItem = ({item}) => (
    <View>
      <Image
        style={styles.coverimg}
        source={{
          uri: item.coverimage,
        }}
      />
      <View style={styles.textBox}>
        <Text style={{fontSize: 18}}>{item.name}</Text>
        <Text>{item.detail}</Text>
      </View>
    </View>
  );
  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={() => setIsLoading(true)}
        onSubmitEditing={() => setIsLoading(true)}
      />
      {isLoading ? (
        <ActivityIndicator size={100} animating={true} color={MD2Colors.red800} />
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          refreshing={isLoading}
          onRefresh={() => setIsLoading(true)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textBox: {
    padding: 10,
    marginBottom: 20,
  },
  coverimg: {
    width: '100%',
    height: 333,
  },
});

export default App;
