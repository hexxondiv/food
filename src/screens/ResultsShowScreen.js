import react, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import yelp from "../api/yelp";

const ResultShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam("id");
  //   console.log("Id got: ", id, "result: ", result);
  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };
  useEffect(() => {
    getResult(id);
  }, []);
  return !result ? null : (
    <>
      <View>
        <Text>{result.name}</Text>
        <FlatList
          data={result.photos}
          keyExtractor={(photo) => photo}
          renderItem={({ item }) => {
            return <Image style={styles.imageStyle} source={{ uri: item }} />;
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 200,
    width: 300,
  },
});

export default ResultShowScreen;
