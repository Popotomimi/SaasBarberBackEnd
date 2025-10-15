import { Router } from "express";
import { qrEvents, isReady } from "./whatsapp";

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

export default router;
