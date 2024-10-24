import { useState, useEffect } from "react";

import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    setIsFetching(true);
    (async () => {
      const resData = await (await fetch("http://localhost:3000/places")).json();
      setAvailablePlaces(resData.places);
      setIsFetching(false);

      console.log("[AvailablePlaces]", resData);
    })();
  }, []);

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
