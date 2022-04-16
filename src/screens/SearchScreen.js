import react, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults();

  // console.log(results);
  const filterResultsByPrice = (price) => {
    //price === "$"||"$$"||"$$$"
    return results.filter((result) => {
      return result.price === price;
    });
  };
  return (
    <View style={{ flex: 1, borderWidth: 10, borderColor: "red" }}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage.length > 0 ? (
        <Text>{errorMessage}</Text>
      ) : (
        <View>
          <Text>
            We have found {results.length} results for {term}
          </Text>
          <ScrollView>
            <ResultsList
              results={filterResultsByPrice("$")}
              title="Cost Effective"
            />
            <ResultsList
              results={filterResultsByPrice("$$")}
              title="Bit Pricier"
            />
            <ResultsList
              results={filterResultsByPrice("$$$")}
              title="Big Spender"
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
