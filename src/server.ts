import express from "express";
import cors from "cors";
import router from "./routes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://artistadocorte.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
