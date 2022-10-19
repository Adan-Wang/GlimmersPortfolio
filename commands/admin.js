
exports.run = function(client,message,args,config) {
    //Intruder detection
    if (message.author.id != config.OwnerID ){
        message.channel.send("Unfortunately, this is an admin only function");
        return;
    }
    else{
        let command_files=require("./index.js");
        let command=args.shift().toLowerCase();

        if (command == "np"){
            //message.channel.send("now playing.....")
            client.user.setStatus(message.content.slice(config.prefix.length+command.length+6).trim()); //6 is the length of the word "admin" and one space, since the command reads &admin np whatever, we need to slice the lengthof(&)+lengthof(admin)+SPACE+lengthof(np)
        }  

        if(command=="reload"){
            if (args[0]==null) {
                message.channel.send("Must refresh a command");
                return;
            }
            const command_name=args[0];
            for (var i=0;i<command_files.known_commands.length;i++){
                if (command_name==command_files.known_commands[i]){
                    delete require.cache[require.resolve('./index.js')]
                    delete require.cache[require.resolve(`./${command_name}.js`)];
                    message.channel.send(`All done! Reloaded ${args[0]} `);
                    return;
                }
            }
            message.channel.send(`That's not a valid command`);
        }

        if (command =="setroles"){

            //Create reaction filters use these ones for official deployment
            const sun_filter=(reaction,user)=>reaction.emoji.id===config.alice_role_emote && user.bot==0;
            const moon_filter=(reaction,user)=>reaction.emoji.id===config.clara_role_emote && user.bot==0;
            const star_filter=(reaction,user)=>reaction.emoji.id===config.karen_role_emote && user.bot==0;

            message.channel.send(`Please select your roles below~! You can select more than one.`).then(
                message=>{
                //Add reactions, use these for official deployment
                message.react(config.alice_role_emote);
                message.react(config.clara_role_emote);
                message.react(config.karen_role_emote);
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
                );

        }


        if (command =="acceptrules"){
            const ok_filter=(reaction,user)=>reaction.emoji.name==='☑' && user.bot==0;

            message.channel.send(`Please carefully read the rules above and click the reaction below to obtain your ClariST role`).then((message)=>{
                message.react(`☑`);
                const ok_collector = message.createReactionCollector(ok_filter);

                ok_collector.on('collect',(r,u)=>{
                    let react_member=message.guild.member(u);
                    message.guild.roles.fetch(config.clarist_role).then((role)=>{
                        react_member.roles.add(role);
                    }
                    );
                });


            }
            )




        }

    
    
    
    
    }
    
}