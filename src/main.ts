import express from "express";
import TelegramBot from "node-telegram-bot-api";

require('dotenv').config();

const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;
const HELIUS_AUTH_TOKEN = process.env.HELIUS_AUTH_TOKEN!;

const app = express();
const bot = new TelegramBot(TELEGRAM_API_KEY, { polling: false });



app.post('/helius', async (req, res) => {
    console.log(req.headers)
    if (req.headers.authorization !== HELIUS_AUTH_TOKEN) {
        console.log('unaouthorized!');
        res.status(401).send('Unauthorized');
    } else {
        console.log('authorized!');
        try {
            await handleHelius(req.body);
            res.status(200).send('OK');
        } catch (e) {
            console.log(e);
            res.status(500).send('Internal Server Error');
        }
    }
});


const handleHelius = async (data: any) => {
    await bot.sendMessage(TELEGRAM_CHAT_ID, 'Your account has either deposited, withdrawn or transfered funds.');
}

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});