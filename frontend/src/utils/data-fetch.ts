async function dataFetch(endpoint: string) {
  try {
    const response = await fetch(endpoint);

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export default dataFetch;

export async function dataFetchWithToken(endpoint: string, token: string) {
  try {
    console.log("Fetching from endpoint:", endpoint);
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.log("Fetch error:", response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetch response:", data);
    return data;
  } catch (error) {
    console.log("Fetch error details:", error);
    throw error;
  }
}
