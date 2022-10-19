const resource_file= require('./resource_file.js');
const resource_text = resource_file.run();

exports.run = function(client,message,args,config) {
    message.channel.send(resource_text);

}