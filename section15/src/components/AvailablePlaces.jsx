import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";

import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    setIsFetching(true);
    (async () => {
      try {
        // http request
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const {
            coords: { latitude: lat, longitude: lon },
          } = position;

          const sortedPlaces = sortPlacesByDistance(places, lat, lon);
          console.log("[AvailablePlaces] sorted Pflaces", sortedPlaces); // test message
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({ message: error.message || "Could not fetch places, please try again later" });
        setIsFetching(false);

        console.error(error); // test message
      }
    })();
  }, []);

  if (error) {
    return (
      <Error
        title='An error occurred!'
        message={error.message}
      />
    );
  }
  return (
    <Places
      title='Available Places'
      places={availablePlaces}
      isLoading={isFetching}
      isLoadingText='Fetching place data...'
      fallbackText='No places available.'
      onSelectPlace={onSelectPlace}
    />
  );
}
