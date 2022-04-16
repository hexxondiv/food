import react, { useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults();

  // console.log(props);
  const filterResultsByPrice = (price) => {
    //price === "$"||"$$"||"$$$"
    return results.filter((result) => {
      return result.price === price;
    });
  };
  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {/* <Text>
        We have found {results.length} results for {term}
      </Text> */}
      {errorMessage.length > 0 ? (
        <Text>{errorMessage}</Text>
      ) : (
        <ScrollView alwaysBounceVertical={false}>
          <View>
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
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
