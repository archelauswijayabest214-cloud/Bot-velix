const { default: makeWASocket, useMultiFileAuthState, delay } = require("@whiskeysockets/baileys")
const pino = require('pino')

async function startBot() {
const { state, saveCreds } = await useMultiFileAuthState('session')
const conn = makeWASocket({
logger: pino({ level: 'silent' }),
auth: state,
browser: ["Ubuntu", "Chrome", "20.0.04"]
})

if (!conn.authState.creds.registered) {
const phoneNumber = "6285177460534"; // GANTI NOMOR BOT LU DISINI
await delay(3000)
const code = await conn.requestPairingCode(phoneNumber)
console.log(`KODE PAIRING LU: ${code}`)
}

conn.ev.on('creds.update', saveCreds)
conn.ev.on('messages.upsert', async m => {
const msg = m.messages[0]
if (!msg.message || msg.key.fromMe) return
const text = msg.message.conversation || msg.message.extendedTextMessage?.text
if (text === '.price' || text === '.velix') {
await conn.sendMessage(msg.key.remoteJid, { text: '✨ *VELIX STORE* ✨\n\n💰 *LIST HARGA SEWA:*\n🔹 30 Hari : Rp10.000\n🔹 Permanen : Rp25.000' })
}
})
}
startBot()
