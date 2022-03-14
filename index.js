console.log('Booting bot...');

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Dang the repl is on nice'));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
console.info('Settings:')
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 })
const p = '!'
const ver = '1.2.1 Alpha Preview'
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
    msg.reply(`My user ID is \`943094980640129028\`.`)
  }
  if (message.author.bot) return false;

  if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return false;

    if (message.mentions.has(client.user.id)) {
        message.channel.send(`Prefix is ${p}`);
    }
  if (msg.content === p+'ping') {
    const clientPing = Date.now() - msg.createdTimestamp;
    const apiPing = Math.round(client.ws.ping);
    if (clientPing < 90 && apiPing < 90) {
      msg.channel.send(`Pong! Client Latency is \`${clientPing}ms\`. API Latency is \`${apiPing}ms\`. Hello World!`);
    }
    if (clientPing > 90 && apiPing > 90) {
      msg.channel.send(`Pong! Client Latency is \`${clientPing}ms\`. API Latency is \`${apiPing}ms\`. Hello World!
  
Slow latency detected (more than 90ms) and slow API latency detected (more than 90ms).`);
    }
    if (clientPing > 90) {
      msg.channel.send(`Pong! Client Latency is \`${clientPing}ms\`. API Latency is \`${apiPing}ms\`. Hello World!
  
Slow latency detected (more than 90ms).`);
    }
    if (apiPing > 90) {
      msg.channel.send(`Pong! Client Latency is \`${clientPing}ms\`. API Latency is \`${apiPing}ms\`. Hello World!
  
API latency is slow (more than 90ms). Check out <https://discordstatus.com/> if there is an outage and scroll down to API response time to see if it's high.`);
    }
  } else if (msg.content === p+'ip') {
    const embedIp = new MessageEmbed()
      .setTitle('The IP is `Powder_SMP.aternos.me:58339`')
      .setColor('#00ff64')
    msg.channel.send({embeds: [embedIp]});
  } else if (msg.content === p+'credits') {
    const embedCredits = {
      title: 'Credits',
      description: 'Thank you all who have helped make this bot possible:',
      thumbnail: {
        url: 'https://www.gpb.org/sites/default/files/styles/large/public/2020-05/thecreditslogo_0.png?h=fbf7a813&itok=sKOJCKrH'
      },
      color: 0x12ff00,
      fields: [
        {
          name: 'SMP Owner',
          value: '`praneethprogamer`',
        },
        {
          name: 'Bot Creator Leader',
          value: '`|| Windows 11 ||`',
        },
        {
          name: 'Bot Creator 2',
          value: '`shourgamer2`'
        },
        {
          name: 'Bot Creator 3',
          value: '`Quinter/slimey`'
        }
      ],
      timestamp: new Date(),
      footer: {
        text: 'Without them this bot wouldn\'t exist!'
      }
    }

    msg.channel.send({embeds: [embedCredits]})
  } else if (msg.content === p+'help') {
    const embedHelp = {
        title: 'Commands',
    	  description: 'Need some help on the commands? Here are they!',
    	color: 0xff00fa,
    	fields: [
    		{
    			name: '`!ping`',
    			value: 'Check the bot\'s ping',
    		},
    		{
    			name: '`!ip`',
    			value: 'Check the server IP',
    		},
    		{
    			name: '`!rules`',
    			value: 'Check the rules',
    		},
    		{
    			name: '`!changelog`',
    			value: 'Check what the latest update adds! (Aliases: !change, !log)',
    		},
        {
    			name: '`!credits`',
    			value: 'Check the people who had helped',
    		},
        {
          name: '`!help`',
          value: 'Check the commands',
        }
    	],
      timestamp: new Date(),
    	footer: {
    		text: `PowderSMP bot, ${ver}.`,
    	},
    };
    msg.channel.send({ embeds: [embedHelp] });
  } else if (msg.content === p+'rules') {
    msg.channel.send(`The rules are located at <#943374756609150996>.`);
  } else if (msg.content === p+'changelog' || msg.content === p+'change' || msg.content === p+'log') {
    const embedLog = new MessageEmbed()
      .setTitle('Changelog')
      .setColor('#b8ff00')
      .setURL('https://Changelog-for-PowderSMP-bot.realguybackup.repl.co')
      .setDescription(`${ver} added mention replies and added one new command.`)
      .setTimestamp()
  	  .setFooter({ text: `For historical updates, please click the title.`});

    msg.channel.send({ embeds: [embedLog] });
  }
    if (msg.content.startsWith("!kick")) {

    if(!msg.member.roles.cache.some(r => r.name === "SMP-DEV")) {
      return;
    }
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
            console.log(err);
            message.channel.send("Access Denied");
        });
    }
  /*
    if (msg.content === p+'embedrules') {
      const embedRules1 = {
        color: 0xff0000,
        title: 'Rules',
    	  description: 'Rules are there to keep the community safe, so please follow the rules.'
} const embedRules2 {
    	color: 0x0099ff,
    	fields: [
    		{
    			name: '1. Treat others with respect.',
    			value: 'Treating others with proper respect will have you as their best friend, and not a bully.',
    		},
    		{
    			name: '2. Offensive content is not allowed.',
    			value: 'NSFW content and other offensice content are not allowed and will be not be tolerated with a 1 day timeout.',
    		},
    		{
    			name: '3. Keep chat family friendly.',
    			value: 'Although some teenagers or older might be here, do ***not*** use bad words, but use family friendly words.',
    		},
    		{
    			name: '4. Advertising is not allowed.',
    			value: 'Now this rule is only for the other channels, other than the <#945965603372544020> channel.',
    		},
        {
    			name: '5. Allow moderators to do their jobs.',
    			value: 'Do not tempt moderators or higher people to do what you want. They are doing their job. If you tempt a moderator or higher people you will be banned for 1 week.',
    		},
        {
    			name: '6. Spamming is not allowed.',
    			value: 'This rule also applies to spamming bot commands, and ***especially*** spamming everyone. This will make other people angry and might even leave.',
    		},
        {
    			name: '7. Cheating is not tolerated.',
    			value: 'Cheating with the mods or hacks will not be tolerated and will result with an ip ban.',
    		},
        {
    			name: '8. Trading For Real Items',
    			value: 'Trading things with real items such as money will not be tolerated and will result with a server mute or a kick.',
    		},
        {
    			name: '9. Griefing is not allowed.',
    			value: '***DO NOT GRIEF, BULLY, OR TROLL OTHER PLAYERS.*** This also complies with rule no. 7.',
    		},
        {
    			name: '10. Do not scam other players.',
    			value: `Now diamonds and netherite are really cool to keep or use it to buy, but please do _NOT_ scam. This also complies with rules no. 1, 8 and 9`,
    		},
    	],
    	footer: {
    		text: 'Not following these rules will get you timeout, kicked or banned.',
    	},
    };
    msg.channel.send({ embeds: [embedRules1, embedRules2] });
  }*/
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

  if (message.content.startsWith(`${p}eval`)) {
    if (message.author.id !== "821682594830614578") {
      message.channel.send(`Eval command can't be used by users, since the command can do anything, even deleting the files of code from a bot.`)
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
        message.channel.send(`\`ERROR\` \`\`\`xl\n${err.message}\n\`\`\``);
      }
    }
  }
  {
    let blacklisted = ['shit', 'fuck', 'fick', 'hell', 'pissed', 'bitch', 'damn', 'crap', 'bullshit', 'balls', 'asshole', 'dick', 'bastard', 'motherfucker'];
    let foundInText = false;
    for (var i in blacklisted) {
      if (message.author.id === '943094980640129028') {
        return;
      } else if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) {
        foundInText = true;
        console.log('Blacklisted word found!')
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
