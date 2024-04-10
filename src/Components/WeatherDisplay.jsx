// Importing necessary dependencies and components
import React, { useEffect, useState } from "react";
import { InputGroup, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import DataDisplay from "./DataDisplay"; // Cmponent for displaying weather data

// Main  component for displaying weather information
function WeatherDisplay() {

  // Base URL for the OpenWeatherMap API including a default city and API key
  const base_url = `https://api.openweathermap.org/data/2.5/weather?q=palakkad&appid=43fa0e827d397d194e66f6d37b550099`;

  // State for storing the fetched weather data,current search term,validation message etc.
  const [weatherdata, setWeatherdata] = useState({});
  const [weather, setWeather] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  // Function to fetch weather defaultdata from the API 
  const fetchdata = async () => {
    const result = await axios.get(`${base_url}`);

    setWeatherdata(result.data); // Store the full API response
    console.log(weatherdata)// Debugging output
    setWeather(result.data.weather[0]); // Store specific weather details for easier access
    console.log(weather); // Debugging output

  };

  // useEffect hook to fetch initial weather data
  useEffect(() => {
    fetchdata();
  }, []); // Empty dependency array means this runs once after the initial render

  // Handler for input changes, updates the searchTerm state
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (validationMessage) {
      // Clear validation message if the user starts typing again
      setValidationMessage("");
    }
  };

  // Function to handle the search operation
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      // Check if the searchTerm is empty or only whitespace
      setValidationMessage("Please enter a city name.");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(searchTerm)) {
      // Regex to check if the searchTerm contains only letters and spaces
      setValidationMessage("Please enter a valid city name.");
      return;
    }

    // If validation passes, clear the message and proceed with the search
    setValidationMessage("");

    // fetching data for the user-specified city
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=43fa0e827d397d194e66f6d37b550099`
      );
      setWeatherdata(response.data); // Update state with new data
      console.log(weatherdata)// Debugging output
      setWeather(response.data.weather[0]); // Update specific weather details
      console.log(weather); // Debugging output
    } catch (error) {
      console.error("Error fetching data:", error);
      setValidationMessage("Invalid location. Please try again.");
    }
  };

  // Rendering the component
  return (
    <div>
      <div className="container">
         {validationMessage && (
              <Alert variant="danger" className="mt-3">{validationMessage}</Alert>
            )}
        <div
          className="mx-auto"
          style={{ width: "75%", padding: "120px 0 50px 0" }}
        >
          {/* Search input for city names */}
          <InputGroup className="p-5">
            <Form.Control
              style={{ padding: "25px" }}
              type="text"
              placeholder="Enter the city name..."
              value={searchTerm}
              onChange={handleChange}
              aria-label="Location search"
            />
            <Button
              variant="outline-secondary"
              className="text-white"
              onClick={handleSearch}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          </InputGroup>
        </div>
        {/* Displaying the fetched weather data */}
        <div className="container">
          <DataDisplay data={weatherdata} weather={weather} />
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay; // Exporting the component for use in other parts of the application
