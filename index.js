console.log('Booting bot...');

const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Dang the repl is on nice'));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
function wait(time) {
  let ms = time*1000
  ms = ms - 1;
  if (ms <= 0) {
    return;
  }
}
const id = "943094980640129028"
const ownerID = "821682594830614578"
console.info('Settings:')
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const index = require('./index.js');
//const config = require('./config.json')
const client = new Discord.Client({ intents: 32767 })

client.on('debug', console.info)
  .on('warn', console.warn)
  .on('error', console.error)

const p = '!'
const ver = '1.2.2 Alpha Preview'
console.info(`prefix:${p}`)
console.info(`version:${ver}`)
console.info(`userCommands:ping,ip,credits,help,rules,log,id`)
console.info(`modCommands:kick,ban`)
console.info(`ownerCommands:eval\n`)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('on the MC server');
});


client.on('messageCreate', msg => {
  if (msg.content === p+'id') {
    if (msg.author.id !== ownerID) {
      return msg.channel.send('Access Denied.')
    } else {
      msg.reply(`\`${id}\``)
    }
  }
  if (msg.author.bot) return false;

  if (msg.content.includes("@here") || msg.content.includes("@everyone") || msg.type == "REPLY") return false;

    if (msg.mentions.has(client.user.id)) {
        msg.reply(`Prefix is ${p}`);
    }
  if (msg.content === p+'ping') {
    const clientPing = Date.now() - msg.createdTimestamp;
    const apiPing = Math.round(client.ws.ping);

    const embedPing = new MessageEmbed()
      .setTitle('Pong!')
      .setColor('#00ff15')
      .addFields(
        {name: 'Client Latency:', value: `\`\`\`js\n${clientPing}\n\`\`\``, inline: true},
        {name: 'API Latency:', value: `\`\`\`js\n${apiPing}\n\`\`\``, inline: true}
      )
      .setTimestamp()
      .setFooter({ text: 'Ping! Pong!' })
    
    msg.channel.send({embeds: [embedPing]});
  } else if (msg.content === p+'ip') {
    const embedIp = new MessageEmbed()
      .setTitle('The IP is `Powder_SMP.aternos.me:58339`')
      .setColor('#00ff64')
    msg.channel.send({embeds: [embedIp]});
  } else if (msg.content === p+'credits') {
    const embedCredits = new MessageEmbed()
      .setTitle('Credits')
      .setColor('12ff00')
      .setDescription('Thank you all who have helped make this bot possible:')
      .setThumbnail('https://www.gpb.org/sites/default/files/styles/large/public/2020-05/thecreditslogo_0.png?h=fbf7a813&itok=sKOJCKrH')
      .addFields(
        {name: 'SMP Owner', value: '`praneethprogamer`'},
        {name: 'Bot Creator Leader', value: '`|| Windows 11 ||`'},
        {name: 'Bot Creator 2', value: '`shourgamer2`'},
        {name: 'Bot Creator 3', value: '`Quinten/slimey`'}
      )
      .setTimestamp()
      .setFooter('Without them this bot wouldn\'t exist!')
    
    msg.channel.send({embeds: [embedCredits]})
  } else if (msg.content === p+'help') {
    const embedHelp = new MessageEmbed()
      .setTitle('Commands')
      .setDescription('Here are the available commands:')
      .setColor('#ff00fa')
      .addFields(
        {name: '`!ping`', value: 'Gives the bot\'s ping.'},
        {name: '`!ip`', value: 'Displays the server IP.'},
        {name: '`!rules`', value: 'Check the server rules.'},
        {name: '`!changelog`, `!change`, `!log`', value: 'Displays what the latest updates adds!'},
        {name: '`!credits`', value: 'Gives you the names of the people who made this bot.'},
        {name: '`!help`', value: 'This!'}
      )
      .setTimestamp()
      .setFooter(`PowderSMP bot, ${ver}`)
    
    msg.channel.send({ embeds: [embedHelp] });
  } else if (msg.content === p+'rules') {
    msg.channel.send(`The rules are located at <#943374756609150996>.`);
  } else if (msg.content === p+'changelog' || msg.content === p+'change' || msg.content === p+'log') {
    const embedLog = new MessageEmbed()
      .setTitle('Changelog')
      .setColor('#b8ff00')
      .setURL('https://Changelog-for-PowderSMP-bot.realguybackup.repl.co')
      .setDescription(`${ver} fixed slow pings and revoked permission of the new command, **made** \`!unban\` **command**`)
      .setTimestamp()
  	  .setFooter({ text: `For historical updates, please click the title.`});

    msg.channel.send({ embeds: [embedLog] });
  }
  /*
  if(msg.content === p+'debug') {
    msg.channel.send(`${msg}`)
  }
  if(msg.content.startsWith("!unban")){
    try {
      if(!msg.member.msg.mentions.permissions.has("BAN_MEMBERS")) {
        return msg.channel.send(`**${msg.author.username}**, You do not have perms to unban someone`)
      }
      
      if(!msg.guild.me.msg.mentions.permissions.has("BAN_MEMBERS")) {
        return msg.channel.send(`**${msg.author.username}**, I do not have perms to unban someone`)
      }
      
      let userID = args[0]
        msg.guild.fetchBans().then(bans=> {
        if(bans.size == 0) {
          return msg.channel.send(`**${msg.author.username}**, the user isn't banned`)
        }
        let bUser = bans.find(b => b.user.id == userID)
        if(!bUser) {
          msg.channel.send(`Error...`)
        }
        msg.guild.members.unban(bUser.user)
      })
    } catch (err) {
      msg.channel.send(`\`\`\`js\n${err}\`\`\``)
    }
  }*/
  if (msg.content.startsWith("!kick")) {
    if(!msg.member.roles.cache.some(r => r.name === "SMP-DEV")) return;
    var member = msg.mentions.members.first();
    // Kick
    member.kick().then((member) => {
        // Successmessage
        msg.channel.send(member.displayName + " has been successfully kicked!");
    }).catch((err) => {
        // Failmessage
        console.log(err);
        message.channel.send("Access Denied");
    });
  }
});
client.on("messageCreate", (message) => {
  if (message.content.startsWith("!ban")) {
    if(!message.member.roles.cache.some(r => r.name === "SMP-DEV")) {
      return;
    }
    var member = message.mentions.members.first();
    // ban
    member.ban().then((member) => {
        // Successmessage
        message.channel.send(member.displayName + " has been successfully banned!");
  }).catch((err) => {
        // Failmessage
        console.error(`Error! `+err);
        message.channel.send(`\`\`\`js\n${err}\`\`\``);
    });
  }
})
const clean = async (client, text) => {
  if (text && text.constructor.name == "Promise")
    text = await text;
  if (typeof text !== "string")
    text = require("util").inspect(text, { depth: 1 });
  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  text = text.replaceAll(client.token, "[REDACTED]");
  return text;
}

client.on("messageCreate", async (message) => {
  const args = message.content.split(" ").slice(1);

  if (message.author.id === ownerID) {
    function resetBot(channel) {
      channel.send('`client.destroy()`')
      .then(msg => client.destroy())
      .then(() => client.login(process.env.token));
      channel.send('`client.login()`')
    }

    if (message.content === p+'ownerhelp') {
      message.channel.send(`\`!stop\`: \`process.exit();\`

\`!restart\`: \`client.destroy()\` then \`client.login()\`

\`!eval\`: \`eval();\`
`)
    }
    
    if (message.content === p+'stop') {
     message.channel.send("Stopping")
     process.exit();
    } switch(message.content.toUpperCase()) {
      case '!RESTART':
        resetBot(message.channel);
        break;
    }
  } else {
    return false;
  }
  if (message.content.startsWith(`${p}eval`)) {
    if (message.author.id !== ownerID) {
      return false;
    } else {
      try {
        const evaled = eval(args.join(" "));
        let cleaned = await clean(client, evaled);
        const embedEval = new MessageEmbed()
          .setTitle('Eval succeeded')
          .setColor('#00ff8f')
          .addField('Result:', `\`\`\`js\n${cleaned}\n\`\`\``, false)
          .setTimestamp()
          .setFooter({ text: 'Eval has been succeded.' })
        
        message.channel.send({ embeds: [embedEval] });
      } catch (err) {
        const embedEvalError = new MessageEmbed()
          .setTitle('Eval errored.')
          .setColor('#ff0000')
          .addField('Result:', `\`\`\`js\n${err}\n\`\`\``, false)
          .setTimestamp()
          .setFooter({ text: 'Eval has errored.' })
        
        return message.channel.send({ embeds: [embedEvalError] });
      }
    }
  }
  {
    const blacklisted = ['shit', 'fuck', 'fick', 'hell', 'pissed', 'bitch', 'damn', 'crap', 'bullshit', 'balls', 'asshole', 'dick', 'bastard', 'motherfucker'];
    let foundInText = false;
    for (var i in blacklisted) {
      if (message.author.id === id) {
        return console.warn('Blacklisted word found by the bot! Check if there are any blacklisted words.')
      } else if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) {
        foundInText = true;
        console.info('Blacklisted word found!')
      }
    }
    if (foundInText) {
      message.delete();
      message.channel.send('Watch your mouth.').then(msg => {setTimeout(() => msg.delete(), 5000)})
    }
  } // bad word handler
});

client.login(process.env.token);
console.log('Finished booting bot!');
console.log('Starting logging token...');
