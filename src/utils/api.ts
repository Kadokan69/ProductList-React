export const getProductApi = async () =>{
  try {
    const response = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=100");
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Ошибка при загрузке:", error);
    throw error;
  }
}
 
    