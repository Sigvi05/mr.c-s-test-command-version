const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();



fs.readdir("./commands/", (err, files) =>{

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Sorry I could not find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} is loaded!`);
    bot.commands.set(props.help.name, props);
  });

});



bot.on("ready", async () => {
  console.log(`${bot.user.username} is now online!`);

  bot.user.setActivity("Do mtc!help", {type: "PLAYING"});
  bot.user.setGame("I am made with RAW CODE!!");
 });

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

let commandfile = bot.commands.get(cmd.slice(prefix.lenght));
if(commandfile) commandfile.run(bot,message,args);

// //No commands is working :/
//   if(cmd === `${prefix}hello`){
//     return message.channel.send("Hello!");
//   }
//
//   if(cmd === `${prefix}.`){
//     return message.channel.send(":3");
//   }
//
//
//   if(cmd === `${prefix}help`){
//     let helpembed = new Discord.RichEmbed()
//     .setDescription("Help")
//     .setColor("#155153")
//   .addField("Some Info: ", "Prefix: mtc!")
//     .addField("my commands are:", ".")
//     .addField("mtc!help", "This command")
//     .addField("mtc!serverinfo", "Gets some info of the server")
//     .addField("mtc!botinfo", "Gets information of me")
//     .addField("mtc!.", ".")
//     return message.channel.send(helpembed);
//   }
//
//   if(cmd === `${prefix}botinfo`){
//
//     let bicon = bot.user.displayAvatarURL;
//     let botembed = new Discord.RichEmbed()
//     .setDescription("Bot Information")
//     .setColor("#15f153")
//     .setThumbnail(bicon)
//     .addField("Bot Name", bot.user.username)
//     .addField("Created On", bot.user.createdAt);
//
//     return message.channel.send(botembed);
//   }
//
//   if(cmd === `${prefix}serverinfo`){
//
//     let sicon = message.guild.iconURL;
//     let serverembed = new Discord.RichEmbed()
//     .setDescription("Server Information")
//     .setColor("#155153")
//     .setThumbnail(sicon)
//     .addField("Server Name", message.guild.name)
//     .addField("Created On", message.guild.createdAt)
//     .addField("You Joined", message.guild.joinedAt)
//     .addField("Total Members", message.guild.memberCount)
//     return message.channel.send(serverembed);
//   }
//
//   if (cmd === `${prefix}report`){
//     //mtc!report @mr.c WOW
//     let rUser = message.mentions.members.first();
//     let reason = args.slice(1).join(" ");
//     if(!rUser) return message.channel.send("Sorry I could not find the user.");
//
//     let reportEmbed = new Discord.RichEmbed()
//     .setDescription("Reports")
//     .setColor("#155153")
//     .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
//     .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
//     .addField("Channel", message.channel)
//     .addField("Time", message.createdAt)
//     .addField("Reason", reason);
// // Clap
//     let reportschannel = message.guild.channels.find(c => c.name === "reports")
//     if(!reportschannel) return message.channel.send("Sorry I could not find the reports channel");
//
//     message.delete().catch(O_o=>{});
//     reportschannel.send(reportEmbed);
//
//     return;
//   }
//
//     if(cmd === `${prefix}kick`){
//     //mtc!kick @Mr.C beeing a dummy
//     let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//     if(!kUser) message.channel.send("Sorry I could not find the user.");
//     let kReason = args.slice(1).join(" ");
//     if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry your role laks the permission Kick Members.");
//     if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("that person can't be kicked.");
//
//     let kickEmbed = new Discord.RichEmbed()
//     .setDescription("~Kick~")
//     .setColor("#f4425c")
//     .addField("Kicked user", `${kUser} With ID ${kUser.id}`)
//     .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
//     .addField("Kicked In", message.channel)
//     .addField("Time", message.createdAt)
//     .addField("Reason", kReason);
//
//     let kickChannel = message.guild.channels.find(`name`, "incidents");
//     if(!kickChannel) return message.channe.send("Sorry I can't find the incidents channel.");
//
//     message.guild.member(kUser).kick(kReason);
//     kickChannel.send(kickEmbed);
//
//     return;
//
//   }
//
//   if(cmd === `${prefix}ban`){
//     let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//     if(!bUser) message.channel.send("Sorry I could not find the user.");
//     let bReason = args.slice(1).join(" ");
//     if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry your role laks the permission Ban Members.");
//     if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("that person can't be kicked.");
//
//     let banEmbed = new Discord.RichEmbed()
//     .setDescription("~Ban~")
//     .setColor("#681313")
//     .addField("Banned user", `${bUser} With ID ${bUser.id}`)
//     .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
//     .addField("Banned In", message.channel)
//     .addField("Time", message.createdAt)
//     .addField("Reason", bReason);
//
//     let kickChannel = message.guild.channels.find(`name`, "incidents");
//     if(!kickChannel) return message.channe.send("Sorry I can't find the incidents channel.");
//
//     message.guild.member(bUser).ban(bReason);
//     kickChannel.send(banEmbed);
//
//
//     return;
//   }
//
//

});

bot.login(botconfig.token);
