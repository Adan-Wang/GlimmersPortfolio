const help= require('./helpfile.js');
const helpfile = help.help();

exports.run = function(client,message,args,config) {
    message.channel.send(helpfile).then((msg)=>{msg.suppressEmbeds()});

}