

//Glimmer v 1.00
//Discord Core
const Discord = require("discord.js");
const fs = require("fs");

//Create write stream


//json files
const config = require ("./config.json");
const songs_games=require("./songs_games.json");

//Global Constants
const client = new Discord.Client();
const prefix = config.prefix;


//Command js Files and utility functions file
const util = require("./Util.js");
let command_files=require("./commands/index.js");

//Cooldown trackers
let status_update_cd=false;



client.on("ready",()=> {console.log("Glimmer Starting")
    client.user.setActivity(`v1.01 | *help`);
    //Re-fetch set roles
    client.users.fetch(config.OwnerID).then( (owner)=>{
        owner.createDM().then((dm_channel)=>{
            let ready_time=client.readyAt;
            dm_channel.send(`Local Time: ${ready_time.getFullYear()}-${ready_time.getMonth()+1}-${ready_time.getDate()}-${ready_time.getHours()}:${ready_time.getMinutes()}:${ready_time.getSeconds()}`);
            dm_channel.send("Glimmer start/restart is completed");
        })

        client.guilds.fetch(config.claris_server_ID).then( (clarisserver)=>{

            let setrole_channel=clarisserver.channels.resolve(config.setrole_channel);
            setrole_channel.messages.fetch(config.setrole_msg).then((message)=>{
                setroles_reset(message);
                message.channel.send(`Glimmer restart notification - to remove any existing roles, you will need to \*\*remove, add, and remove\*\* the respective reaction. Adding roles feature is unaffected`)
            })
        }
        ).then(()=>{owner.createDM().then((dm_channel)=>{
            dm_channel.send("Set roles re-fetch is completed");
        })
        }).catch((error)=>{console.log(error);});

    //Re-fetch rules
        client.guilds.fetch(config.claris_server_ID).then((clarisserver)=>{
            let rules_channel=clarisserver.channels.resolve(config.rules_channel);
            rules_channel.messages.fetch(config.rules_msg).then((message)=>{
                rules_reset(message);

            })

        }
        ).then(()=>{owner.createDM().then((dm_channel)=>{
            dm_channel.send("Rules re-fetch is completed");
        })
        }).catch((error)=>{console.log(error);});


    }
    )
    .catch((error)=>{console.log(error);});





    
});


client.on("message",(message)=>{
    //Bot checker/blacklist checker
    if (message.author.bot){ return;
    }  

    if (client.uptime>=1800*1e3){
        if (status_update_cd==false){
            client.user.setActivity(`${util.ReplyRdm(songs_games.songs,songs_games.games)} | *help`);
            status_update_cd=true;
        }
        setTimeout(()=>{
            status_update_cd=false;
        },3600*1e3);

    }
    
    //PREFIX DETECTION
    if (message.content.startsWith(prefix)){

    //Arguments and command name grab
    const args=message.content.slice(prefix.length).trim().split(/ +/g);
    //.shift() command eliminates the first part of the args array, so it gets rid of the command word, and leaves args array with just the content afterwards
    const command = args.shift().toLowerCase(); 

    //Public Command Section
    try{
    
    command_files[command].run(client,message,args,config);

    }
    catch(err){
        console.log(err);
        //Write to log file, note that time stamp is the "created at" time for the message event received
        fs.appendFile('ErrorLogs.txt',`[${message.createdAt}]: ${err.toString()} \n`, ()=> {if (err){ return console.log(err); }});
        message.channel.send("Something is off - you may have entered the wrong command, check *help for details");
    }

    } //Bracket for prefix detection
    


});



client.login(config.token);


function setroles_reset(message){

    //Create reaction filters use these ones for official deployment
    const sun_filter=(reaction,user)=>reaction.emoji.id===config.alice_role_emote && user.bot==0;
    const moon_filter=(reaction,user)=>reaction.emoji.id===config.clara_role_emote && user.bot==0;
    const star_filter=(reaction,user)=>reaction.emoji.id===config.karen_role_emote && user.bot==0;
    //Create collectors
    const sun_collector = message.createReactionCollector(sun_filter, {dispose: true});
    const moon_collector = message.createReactionCollector(moon_filter, {dispose: true});
    const star_collector = message.createReactionCollector(star_filter, {dispose: true});
    //Moon role add+remove
    moon_collector.on('collect',(r,u)=>{
        let react_member=message.guild.member(u);
        message.guild.roles.fetch(config.clara_role).then((role)=>{
            react_member.roles.add(role);
        }
        );
    });
    moon_collector.on('remove',(r,u)=>{
        let react_member=message.guild.member(u);
        message.guild.roles.fetch(config.clara_role).then((role)=>{
            react_member.roles.remove(role);
        }
        );
    });

    //Sun role add+remove
    sun_collector.on('collect',(r,u)=>{
        let react_member=message.guild.member(u);
        message.guild.roles.fetch(config.alice_role).then((role)=>{
            react_member.roles.add(role);
        }
        );
    });
    sun_collector.on('remove',(r,u)=>{
        let react_member=message.guild.member(u);
        message.guild.roles.fetch(config.alice_role).then((role)=>{
            react_member.roles.remove(role);
        }
        );
    });
    //Star role add+remove
    star_collector.on('collect',(r,u)=>{
        let react_member=message.guild.member(u);
        message.guild.roles.fetch(config.karen_role).then((role)=>{
            react_member.roles.add(role);
        }
        );
    });
    star_collector.on('remove',(r,u)=>{
        let react_member=message.guild.member(u);
        message.guild.roles.fetch(config.karen_role).then((role)=>{
            react_member.roles.remove(role);
        }
        );
    });
}

function rules_reset(message){
    const ok_filter=(reaction,user)=>reaction.emoji.name==='☑' && user.bot==0;
    const ok_collector = message.createReactionCollector(ok_filter);

    ok_collector.on('collect',(r,u)=>{
        let react_member=message.guild.member(u);
        message.guild.roles.fetch(config.clarist_role).then((role)=>{
        react_member.roles.add(role);})
    });

}