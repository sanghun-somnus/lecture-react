import { useState, useEffect } from "react";

import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [AvailablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/places")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAvailablePlaces(data.places);
      });
  }, []);

  return (
    <Places
      title='Available Places'
      places={AvailablePlaces}
      fallbackText='No places available.'
      onSelectPlace={onSelectPlace}
    />
  );
}
