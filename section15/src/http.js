export async function fetchAvailablePlaces() {
  // code here
  const response = await fetch("http://localhost:3000/places");
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Faild to fetch places");
  }

  return data.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    // 메서드 변경 (default: GET)
    method: "PUT",
    // 전송할 수 있는 형태로 데이터 변환
    body: JSON.stringify({ places: places }),
    headers: {
      // 백엔드에게 전송할 데이터 타입 명시 (백엔드에서의 정확한 데이터 추출을 위함)
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data");
  }

  return data.message;
}
