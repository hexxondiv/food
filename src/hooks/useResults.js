import { useState, useEffect } from "react";
import yelp from "../api/yelp";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchApi = async (searchTerm) => {
    console.log("Hi There!");
    try {
      const response = await yelp.get("/search", {
        params: {
          term: searchTerm,
          limit: 50,
          location: "san jose",
        },
      });
      setResults(response.data.businesses);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };
  // Call searchApi when component is first rendered (BAD CODE!)
  //   searchApi("pasta");
  useEffect(() => {
    searchApi("pasta");
  }, []);

  return [searchApi, results, errorMessage];
};
