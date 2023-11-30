const TelegramBot = require('node-telegram-bot-api');

const {gameOptions, retryOptions} = require('./options')

const token = '6970527627:AAF8JH2-Q08eo2U3yATeXI0_h_D_i5I3AaU';

const bot = new TelegramBot(token, {polling: true});

const obj = {}
 
const startGame = async chatId => {
    await bot.sendMessage(chatId, 'Computer guess number from 0 till 9, and you shoul find it!')
        let randomNumber = Math.floor(Math.random() * 10)
        obj[chatId] = randomNumber
    await bot.sendMessage(chatId, 'Find correct number', gameOptions)
  }

const bootstrap = () => {
    bot.setMyCommands([
        {
            command: '/start',
            description: 'Starts our bot'
        },
        {
            command: '/info',
            description: 'About bot'
        },
        {
            command: '/game',
            description: 'Play game'
        }
    ])
    bot.on('message', async(msg) => {
        const chatId = msg.chat.id;
        const text = msg.text
        
        if(text == '/start'){
            return bot.sendMessage(chatId, `Assalomu Aleykum ${msg.from.first_name}`); 
        }
        if(text == '/info'){
            return bot.sendMessage(chatId, `Bu bo\'t haqida ma\'lumot va sizning username - ${msg.from.username}`)
        }
        if(text == '/game'){
            return startGame(chatId)
        }
        bot.sendMessage(chatId, 'Sorry i can\'t do this')  
})}

bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id

    
    if(data == obj[chatId]){
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/581/7e9/5817e933-8e1b-4a32-9916-e70988bca0bd/192/6.webp')
            return bot.sendMessage(chatId, 'Congratulations you\'re right!!!', retryOptions)
    }
    if(data == '/retry'){
        return startGame(chatId)
    }
    else{
        await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/581/7e9/5817e933-8e1b-4a32-9916-e70988bca0bd/192/4.webp')
        return bot.sendMessage(chatId, `Ooops try again :), computer choose ${data}`, retryOptions)
    }
})

bootstrap()