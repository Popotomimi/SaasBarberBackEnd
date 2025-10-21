import { Router } from "express";
import { qrEvents, isReady, sendWhatsAppMessage } from "./whatsapp.js";

const router = Router();

let latestQr: string | null = null;

qrEvents.on("qr", (qrImage: string) => {
  latestQr = qrImage;
});

qrEvents.on("ready", () => {
  latestQr = null;
});

router.get("/qrcode", (req, res) => {
  if (isReady) {
    return res.json({ status: "conectado ✅" });
  }

  if (latestQr) {
    return res.json({ status: "aguardando leitura", qrcode: latestQr });
  }

  return res.json({ status: "inicializando..." });
});

router.get("/server", (req, res) => {
  return res.json({ status: "Servidor online ✅" });
});

router.post("/send-message", async (req, res) => {
  const { message, number } = req.body;

  if (!message || !number) {
    return res
      .status(400)
      .json({ error: "Mensagem e número são obrigatórios" });
  }

  try {
    await sendWhatsAppMessage(message, number);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
    return res.status(500).json({ error: "Falha ao enviar mensagem" });
  }
});

export default router;
