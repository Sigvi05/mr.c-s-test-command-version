const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rUser = message.mentions.members.first();
      let rreason = args.slice(1).join(" ");
      if(!rUser) return message.channel.send("Sorry I could not find the user.");

      let reportEmbed = new Discord.RichEmbed()
      .setDescription("Reports")
      .setColor("#155153")
      .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
      .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
      .addField("Channel", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", rreason);
  // Clap
      let reportschannel = message.guild.channels.find(c => c.name === "reports");
      if(!reportschannel) return message.channel.send("Sorry I could not find the reports channel");

      message.delete().catch(O_o=>{});
      reportschannel.send(reportEmbed);

    
}
module.exports.help = {
  name: "report"
}
