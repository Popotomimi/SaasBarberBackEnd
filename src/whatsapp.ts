import whatsapp from "whatsapp-web.js";
const { Client, LocalAuth } = whatsapp;
import qrcode from "qrcode";
import EventEmitter from "events";

export const qrEvents = new EventEmitter();
export let isReady = false;

export const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true, args: ["--no-sandbox"] },
});

client.on("qr", async (qr: string) => {
  const qrImage = await qrcode.toDataURL(qr);
  qrEvents.emit("qr", qrImage);
});

client.on("ready", () => {
  isReady = true;
  qrEvents.emit("ready");
});

client.initialize();
