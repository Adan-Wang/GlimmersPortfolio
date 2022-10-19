//ping command, does the regular ping thing

exports.run = async function (client,message,args,config) {
    const delay=Math.round(client.ws.ping);
    let msg_time = message.createdTimestamp;
    const m = await message.channel.send('Ping test');
    let msg_sent_time=m.createdTimestamp;
    m.delete().catch(console.log('o_o'));
    let real_ping = msg_sent_time-msg_time;

    message.channel.send( `Ding'de ding ding ding, the API ping is ${delay} ms, your ping to Glimmers is ${real_ping} ms`);



    
    
}