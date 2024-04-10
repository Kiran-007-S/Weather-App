// Import necessary React hooks and components from libraries
import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit"; // Material Design for Bootstrap React components
import humidity from "../Assets/SVG/humidity.svg"; // Import humidity icon
import wind from "../Assets/SVG/wind.svg"; // Import wind icon
import { Col, Row } from "react-bootstrap"; // React Bootstrap components for layout

// Functional component for displaying weather data, receiving `data` and `weather` as props
function DataDisplay({ data, weather }) {
    
  // State hook for managing the current date
  const [date, setDate] = useState(new Date());

  // Utility function to format date to a readable string
  const formatDate = (dateTime) => {
    return dateTime.toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Utility function to format time to a readable string
  const formatTime = (dateTime) => {
    return dateTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div>
      {data && ( // Conditional rendering based on if `data` is truthy
        <Row>
          <Col sm={12} md={4} className="p-3">
            {/* Weather info card */}
            <MDBCard className="bg-transparent">
              <MDBCardBody className="d-flex flex-column align-items-center">
                <MDBCardTitle>
                  <h3 className="text-capitalize text-white">{data.name}</h3>
                </MDBCardTitle>
                <MDBCardText>
                  <h5 className="text-white">{formatDate(date)}</h5>
                  <h6 className="text-center m-3 text-white">
                    {formatTime(date)}
                  </h6>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </Col>
          <Col sm={12} md={8} style={{ height: "20em" }}>
            <MDBCard className="bg-transparent">
              <MDBCardBody className="d-flex">
                <Col className="text-center">
                  <h1 className="text-white">
                    {Math.round(data.main?.temp - 273.15)}
                    <sup>o</sup>C
                  </h1>
                  <h6 className="text-white">
                    Feels Like : {Math.round(data.main?.feels_like - 273.15)}
                    <sup>o</sup>C
                  </h6>
                  <h5 className="text-white">
                    <i className="fa-solid fa-temperature-high"></i>{" "}
                    {Math.round(data.main?.temp_max - 273.15)}
                    <sup>o</sup>C
                  </h5>
                  <h5 className="text-white">
                    <i className="fa-solid fa-temperature-low"></i>{" "}
                    {Math.round(data.main?.temp_min - 273.15)}
                    <sup>o</sup>C
                  </h5>
                </Col>
                {/* Weather icon and description */}
                <Col className="text-center">
                  <img
                    src={`https://api.openweathermap.org/img/w/${weather?.icon}.png`}
                    alt="weather"
                  />
                  <h5 className="text-white">{weather?.description}</h5>
                </Col>
                {/* Humidity and wind speed */}
                <Col className="d-flex justify-content-end">
                  <Col className="d-flex flex-column mx-2 align-items-center">
                    <img
                      src={humidity}
                      alt="humidity"
                      style={{ width: "30%", height: "30%" }}
                    />
                    <h6 className="text-center text-white">Humidity</h6>
                    <h5 className="text-center text-white">
                      {data.main?.humidity} %
                    </h5>
                  </Col>
                  <Col className="d-flex flex-column mx-2 align-items-center">
                    <img
                      src={wind}
                      alt="wind"
                      style={{ width: "30%", height: "30%" }}
                    />
                    <h6 className="text-center text-white">Wind Speed</h6>
                    <h5 className="text-center text-white">
                      {data.wind?.speed} km/h
                    </h5>
                  </Col>
                </Col>
              </MDBCardBody>
            </MDBCard>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default DataDisplay; // Exporting the component for use in other parts of the application
