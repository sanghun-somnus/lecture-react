import { useState, useEffect } from "react";

import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    (async () => {
      const resData = await (await fetch("http://localhost:3000/places")).json();
      setAvailablePlaces(resData);

      console.log(resData);
    })();
  }, []);

  return (
    <Places
      title='Available Places'
      places={availablePlaces}
      fallbackText='No places available.'
      onSelectPlace={onSelectPlace}
    />
  );
}
