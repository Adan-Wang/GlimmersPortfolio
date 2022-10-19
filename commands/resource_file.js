

exports.run=function() {
    const Discord = require("discord.js");
    var embed = new Discord.MessageEmbed().setTitle("Resources [Last Updated: XXXX]")
    .setColor('#34ebc0')
    .setAuthor("XXXX")
    .setThumbnail("https://i.imgur.com/thumbnail.jpg")
    .addField("Field 1","Field 1 Link")
    .addField("Field 2","Field 1 Link")
    
    
    return embed; 
   
}