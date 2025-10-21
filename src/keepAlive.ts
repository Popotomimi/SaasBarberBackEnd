import axios from "axios";

const SERVER_URL = "https://saasbarberbackend.onrender.com/server";

export function startKeepAlive() {
  setInterval(async () => {
    try {
      const response = await axios.get(SERVER_URL);
      console.log(
        `[KeepAlive] ${new Date().toISOString()} - ${response.data.status}`
      );
    } catch (error) {
      console.error("[KeepAlive] Erro ao pingar o servidor:", error);
    }
  }, 10 * 60 * 1000);
}
