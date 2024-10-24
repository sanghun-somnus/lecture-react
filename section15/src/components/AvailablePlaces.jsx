import { useState } from "react";

import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [AvailablePlaces, setAvailablePlaces] = useState([]);

  return (
    <Places
      title='Available Places'
      places={AvailablePlaces}
      fallbackText='No places available.'
      onSelectPlace={onSelectPlace}
    />
  );
}
