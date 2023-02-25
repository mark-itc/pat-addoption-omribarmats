export async function getPets(apiKey) {
  try {
    const response = await fetch("http://localhost:3001/allpets", {
      method: "get",
      headers: {
        accessToken: apiKey,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          return { success: false, message: "Message 1" };
        } else {
          return {
            success: true,
            data: data.allPets,
            message: "Message 2",
          };
        }
      });
    return response;
  } catch (e) {}
}
