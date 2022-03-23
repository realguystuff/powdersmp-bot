console.log('Booting...');

const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Dang the repl is on nice'));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
const id = "943094980640129028"
const ownerID = "821682594830614578"
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const index = require('./index.js');

//const readConfig = require('readConfig');
const readConfig = require('read-config')
const config = readConfig('./config.json')
const client = new Discord.Client({ intents: 32767 })

client.on('debug', console.info)
  .on('warn', console.warn)
  .on('error', console.error)

const p = '!'
const ver = '1.2.2 Alpha Preview'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('on the PowderSMP!');
});

const handler = require('./cmd')
client.on('msg', handler);

client.login(process.env.token);
console.log('Finished booting bot!');
console.log('Starting logging token...');
