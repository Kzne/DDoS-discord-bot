const Discord = require('discord.js')
const client = new Discord.Client
const prefix = 'F-'
const fs = require('fs')
const ms = require('ms')
const ping = require('ping');
const oncooldown = new Set();
const oncooldown2 = new Set();
const oncooldown3 = new Set();
const { exec } = require('child_process');
const { kMaxLength } = require('buffer')
const { SSL_OP_EPHEMERAL_RSA } = require('constants')
const talkedRecently = new Set();
const freeplancooldown = new Set()
const version = "4.1.0"
const fixes = "Bot Is Back."
const fetch = require('node-fetch');
const axios = require("axios");
const { Console } = require('console')
const myServer = "729867006635016322"







// sleep time expects milliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

client.on('ready', () =>{
    console.log('Congratulations! Bot Online! Server Stat: Running');
    client.user.setActivity('DO F-help', { type: 'WATCHING' });
})

client.on('message', async msg=>{
    if(msg.guild.id != myServer){
        return
    }     
    let args = msg.content.substring(prefix.length).split(" ")
    let wordArray = msg.content.split(" ")
    

    switch(args[0]){
        
        //HELP COMMANDS

        case 'help':
            msg.channel.bulkDelete(1)
            var business = new Discord.RichEmbed()
            .setColor(0x66ff00)
            .addField("__**Guap Stresser Help Hub**__", ` *PREFIX: F-* \n \n F-iphelp \n \n F-adminhelp`)
            msg.channel.send(business)
            await sleep(500)
            //msg.channel.sendFile("banner1.gif")
            var response = [Math.floor(Math.random() * ((100 - 1) + 1) + 1)];
            console.log("Random Num:" + response)
            if(response <= 25)
            msg.reply("Have you considered buying a Plan?")
        break;

        case 'adminhelp':
            if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send(`NO PERMS`)
            msg.channel.bulkDelete(1)
            var business = new Discord.RichEmbed()
            .setColor(0x66ff00)
            .addField("__**Guap Stresser Admin Command Menu**__", ` *PREFIX: F-* \n \n **ADMIN ONLY** \n \n F-kick \n \n F-ban \n \n F-clear \n \n F-nuke \n \n F-add \n \n F-planinfo \n \n F-online \n \n F-down`)
            msg.channel.send(business)
        break;

        case 'iphelp':
            msg.channel.bulkDelete(1)
            var business = new Discord.RichEmbed()
            .setColor(0x66ff00)
            .addField("__**Guap Stresser IP Command Menu**__", ` *PREFIX: F-* \n \n F-clean (Cleans Bot DM's) \n \n F-methods \n \n F-plans \n \n F-iplookup [ip] \n \n F-bronze [method] [ip] [port] [time in seconds] (600 max) \n \n F-silver [method] [ip] [port] [time in seconds] (1000 max) \n \n F-gold [method] [ip] [port] [time in seconds] (1500 max)`)
            msg.channel.send(business)
            await sleep(500)
            
        break;
           
        //HOSTING COMMANDS

        case 'info':
            msg.channel.bulkDelete(1)
            var business = new Discord.RichEmbed()
            .setColor(0x66ff00)
            .addField("__**Guap Stresser Info Menu**__", ` *PREFIX: F-* \n \n Owned by:  Guap Stresser Commitee \n \n Coded by:   Charon 1#6638 \n \n Status:        Online \n \n Debug:       No Errors \n \n Network:   Connected \n \n API:   Connected \n \n **Guap Stresser**`)
            msg.channel.send(business)
        break;

        //IP RELATED COMMANDS

        case 'plans':
        msg.channel.bulkDelete(1)
        var plans = new Discord.RichEmbed()
         .setColor(0x66ff00) 
         .addField("__**Discord Panel Plans**__", `------------------------- \n \n **Bronze ($5 PayPal)** \n - 600 Second Hit Time \n - 1 Concurrent \n - 30 Day Plan \n ------------------------- \n **Silver ($10 PayPal)** \n - 1000 Second Hit Time \n - 1 Concurrent \n - 30 Day Plan \n ------------------------- \n **Gold ($16 PayPal)** \n - 1500 Second Hit Time \n - 1 Concurrent \n - 30 Day Plan \n - Add Up To 2 More Concurrents For $4 Each \n ------------------------- \n ~~**Custom ($?? PayPal)**~~ \n ~~- Custom Hit Time~~ \n ~~- 1 Concurrent~~ \n ~~- 30 Day Plan~~ \n ------------------------- \n **Other Add Ons** \n \n $2 Your Own Private Channel, You Can Do Attacks In.`)  
        
         msg.channel.send(plans)
        break;

        case 'methods':
          msg.channel.bulkDelete(1)
          var plans = new Discord.RichEmbed()
            .setColor(15158332)
            .addField("__**AVAILABLE METHODS**__", `\n \n **Amplification Methods** \n \n DNS \n LDAP \n SSYN \n SYN \n SNMP \n SSDP \n ICMP \n \n **Layer 4 Methods** \n \n HOME \n FLOOD \n SmartFlood \n SLAM \n NTP \n WRECKED \n YubinaKill \n FuckedUp \n psnlag \n \n **BotNet Methods** \n \n XMAS \n TCP \n VSE \n stdhex \n udphex \n \n **Guap Stresser**`)
          msg.channel.send(plans)
        break;

        case 'iplookup':
            msg.channel.bulkDelete(1)
            if(!args[1]) return msg.reply("use: F-iplookup [ip]")
            msg.channel.send("Please wait while I Process "+args[1])
            exec("python3 iplookup.py "+args[1])
            await sleep(2500)
            var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
            while(color.length < 6) {
            color = color;
            }       
            var readfile = fs.readFileSync('iplookup.txt', 'utf-8')
            readfile = readfile.substring(1);
            var business = new Discord.RichEmbed()
            .setColor(color)
            .addField("__**Guap Stresser IPLOOKUP**__","**"+readfile+"**")
            msg.channel.send(business)     
        break;

        //MODERATION COMMANDS
        
        case 'kick':
         msg.channel.bulkDelete(1)
         if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send(`NO PERMS`)
         if(!args[1]) return msg.reply("use: F-kick [@person] [reason]")
         var data = msg.content.split(" ").slice(2).join(" ");
         msg.channel.send("Big Boy Kick Machine Turning On.")
         await sleep(1000)
         msg.channel.bulkDelete(1)
         msg.channel.send("Big Boy Kick Machine Turning On..")
         await sleep(1000)
         msg.channel.bulkDelete(1)
         msg.channel.send("Big Boy Kick Machine Turning On...")
         await sleep(1000)
         msg.channel.bulkDelete(1)
         msg.channel.send("Successful.")
         await sleep(1000)
         msg.channel.bulkDelete(1)
         msg.channel.send("Aiming Orbital Cannon At " + msg.mentions.members.first())
         await sleep(1000)
         msg.channel.bulkDelete(1)
         msg.channel.send("Firing in")
         await sleep(1000)
         msg.channel.send("3.")
         await sleep(1000)
         msg.channel.bulkDelete(1)
         msg.channel.send("2.")
         await sleep(1000)
         msg.channel.bulkDelete(1)
         msg.channel.send("1.")
         await sleep(1000)
         msg.channel.bulkDelete(2)
         msg.mentions.members.first().kick(args[2])
         msg.channel.send(msg.mentions.members.first() + " Kicked for " + data + ".")
         msg.mentions.members.first().send("You have been Kicked for: " + data)
        break;

        case 'ban':
         msg.channel.bulkDelete(1)
         if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send(`NO PERMS`)
         if(!args[1]) return msg.reply("use: F-ban [@person] [reason]")
         var data = msg.content.split(" ").slice(2).join(" ");
         msg.channel.send("Big Boy Ban Machine Turning On.")
         await sleep(1000)
         msg.channel.bulkDelete(1)
         msg.channel.send("Big Boy Ban Machine Turning On..")
         await sleep(1000)
         msg.channel.bulkDelete(1)
         msg.channel.send("Big Boy Ban Machine Turning On...")
         await sleep(1000)
         msg.channel.bulkDelete(1)
         msg.channel.send("Successful.")
         await sleep(1000)
         msg.channel.bulkDelete(1)
         msg.channel.send("Aiming Orbital Cannon At " + msg.mentions.members.first())
         await sleep(1000)
         msg.channel.bulkDelete(1)
         msg.channel.send("Firing in")
         await sleep(1000)
         msg.channel.send("3.")
         await sleep(1000)
         msg.channel.bulkDelete(1)
         msg.channel.send("2.")
         await sleep(1000)
         msg.channel.bulkDelete(1)
         msg.channel.send("1.")
         await sleep(1000)
         msg.channel.bulkDelete(2)
         msg.mentions.members.first().ban(args[2])
         msg.channel.send(msg.mentions.members.first() + " Kicked for " + data + ".")
         msg.mentions.members.first().send("You have been Banned for: " + data)
        break;

        case 'add':
            msg.channel.bulkDelete(1)
            if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send(`NO PERMS`)
            if(!args[1]) return msg.reply("use: F-add [@person] [time (1 = 1 day)] [plan]")
            var member = msg.mentions.members.first();
            var user = msg.mentions.users.first();
            args.join(" ").slice(28)
            if(!member) return msg.reply("Member Not Found :(")
            if(!args[3]) return msg.reply("What Plan? Example: Silver")
            if(!args[2]) return msg.reply("How Long?")
            var mainrole = msg.guild.roles.find(role => role.name === args[3])
            if(!mainrole) return msg.reply("Role Does Not Exist")
            var amount = args[2]
            var mili = 86400
            var full = 86400 * args[2]
            var amount = full * 1000
            var quarter = amount / 4
            var half = quarter * 2
            var morequarter = full / 4
            var morehalf = morequarter * 2
            var moresoon = morequarter * 3
            var i = 1;
            if(member){
                member.addRole(mainrole)
                msg.reply(`${user.tag} Has `+full+` Seconds Left (`+args[2]+" Days)")
                function myLoopspam () {
                    setTimeout(function () {
                        if(i == 1){
                        } else if(i == 2){
                            msg.reply(`${user.tag} Has `+moresoon+` Seconds left`)
                        } else if(i == 3){
                            msg.reply(`${user.tag} Has `+morehalf+` Seconds left`)
                        } else if(i == 4){
                            msg.reply(`${user.tag} Has `+morequarter+` Seconds left`)
                        } else if(i == 5){
                            msg.reply(`${user.tag} Time Is Up, Contact An Administrator To Buy A New Plan!`)
                            member.removeRole(mainrole)
                        }
                        i++;
                        if (i < 5) {
                            myLoopspam();
                        }
                    }, quarter)
                }
                myLoopspam();
            }
        break;

        case 'wEGWVgw':
            msg.channel.bulkDelete(1)
            if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send(`NO PERMS`)
            if(!args[1]) return msg.reply("USAGE: F-add [@person] [time (1 = 1 day)] [role]")
            var member = msg.mentions.members.first();
            var user = msg.mentions.users.first();
            var time = args[2] * 86400000
            var mainrole = msg.guild.roles.find(role => role.name === args[3])
            if(!member) return msg.reply("Member Not Found :(")
            if(!args[2]) return msg.reply("How Long?")
            if(!args[3]) return msg.reply("What Role ? Example: Silver")
            if(!mainrole) return msg.reply("Role Does Not Exist")
           
           
            member.addRole(mainrole)
            msg.reply(`${user.tag} Has `+args[2]+` Days Left.`)
            setTimeout(() => {                
               member.removeRole(mainrole)
               msg.reply(`${user.tag} Plan Has Ended. Contact An Admin To Buy A Plan Again!`)
               }, time);
    

        break;

        case 'clear':
            if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(`NO PERMS`)
            msg.channel.bulkDelete(1)
            if(!args[1]) return msg.reply('Please define how many messages') 
            if(!args[1] > 100) return msg.reply("Cant use more than 100")
            msg.channel.bulkDelete(1);
            msg.channel.bulkDelete(args[1]);
        break;

        case 'nuke':
            if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("NO PERMS!")
            msg.channel.bulkDelete(1)
            msg.channel.send("Gaining Launch Codes.")
            await sleep (1000)
            msg.channel.bulkDelete(1)            
            msg.channel.send("Gaining Launch Codes..")
            await sleep (1000)
            msg.channel.bulkDelete(1)
            msg.channel.send("Gaining Launch Codes...")
            msg.channel.bulkDelete(1)
            await sleep (500)
            msg.channel.send("Codes Aquired")
            msg.channel.bulkDelete(1)
            msg.channel.send("Message Destruction In")
            msg.channel.send("5")
            await sleep (500)
            msg.channel.bulkDelete(1)
            msg.channel.send("4")
            await sleep (500)
            msg.channel.bulkDelete(1)
            msg.channel.send("3")
            await sleep (500)
            msg.channel.bulkDelete(1)
            msg.channel.send("2")
            await sleep (500)
            msg.channel.bulkDelete(1)
            msg.channel.send("1")
            msg.channel.bulkDelete(100)
            msg.channel.bulkDelete(100)
            msg.channel.bulkDelete(100)
            await sleep(1000)
            msg.channel.send("Channel Nuked!")
        break;

        //BOOT Commands


        case 'free':
            msg.channel.bulkDelete(1)            
            if(!msg.member.roles.find(r => r.name === "Free")) return msg.reply("You Can't Use This")
            if(!args[1]) return msg.reply('Usage: F-free [ip] [port] [time]')
            if(!args[2]) return msg.reply('Usage: F-free [ip] [port] [time]')
            if(!args[3]) return msg.reply('Usage: F-free [ip] [port] [time]')
            if(args[4]) return msg.reply('Usage: F-free [ip] [port] [time]')
            if(args[2] === "1.1.1.1") return msg.reply('Guap Stresser Rejects All Attacks To This IP')
            if(args[2] === "1.0.0.1") return msg.reply('Guap Stresser Rejects All Attacks To This IP')
            if(args[2] === "8.8.8.8") return msg.reply('Guap Stresser Rejects All Attacks To This IP')
            if(args[2] === "8.8.4.4") return msg.reply('Guap Stresser Rejects All Attacks To This IP')
            if(args[2] === "153.31.113.27") return msg.reply('Guap Stresser Rejects All Attacks To This IP')
            if(args[2] === "64.229.121.31") return msg.reply('Guap Stresser Rejects All Attacks To This IP')      
           
            
            
            if(args[3] > 100) return msg.reply("Can't Use More Than 100 Seconds On Free Plan")
            var X = args[3] * 1000
            if (freeplancooldown.has(msg.author.id)) {
                msg.channel.send("Wait Until Your Last Attack Ends." + msg.author);
                } else {
                
               const resp = await axios({
                  method: "GET",
                  url: ("API")
                });
                await sleep(1000)
                console.log("Attack Sent To: " +args[2]+ "  Time: " +args[4]);
                msg.reply("Your Attack Info...")
                var business = new Discord.RichEmbed()
                  .setColor(15158332)
                  .addField("__**ATTACK INFO**__", `Ip/URL Attacked: ${args[1]}\nPort: ${args[2]}\nAttack Time: ${args[3]}\nThank You For Choosing Guap Stresser`)
                msg.channel.send(business)

                freeplancooldown.add(msg.author.id);
                setTimeout(() => {                
                freeplancooldown.delete(msg.author.id);
                
                }, X + 1000);

                }
        break;

        case 'bronze':
            msg.channel.bulkDelete(1)
            
            if(!msg.member.roles.find(r => r.name === "Bronze")) return msg.reply("You Dont Have The Bronze Plan")
            if(!args[1]) return msg.reply('USAGE: F-bronze [*method] [ip] [port] [time]')
            if(!args[2]) return msg.reply('USAGE: F-bronze [method] [*ip] [port] [time]')
            if(!args[3]) return msg.reply('USAGE: F-bronze [method] [ip] [*port] [time]')
            if(!args[4]) return msg.reply('USAGE: F-bronze [method] [ip] [port] [*time]')
            if(args[5]) return msg.reply('USAGE: F-bronze [method] [ip] [port] [time]')
            if(args[2] === "1.1.1.1") return msg.reply('Guap Stresser Rejects All Attacks To This IP')
            if(args[2] === "1.0.0.1") return msg.reply('Guap Stresser Rejects All Attacks To This IP')
            if(args[2] === "8.8.8.8") return msg.reply('Guap Stresser Rejects All Attacks To This IP')
            if(args[2] === "8.8.4.4") return msg.reply('Guap Stresser Rejects All Attacks To This IP')
            if(args[2] === "153.31.113.27") return msg.reply('Guap Stresser Rejects All Attacks To This IP')
            if(args[2] === "64.229.121.31") return msg.reply('Guap Stresser Rejects All Attacks To This IP')      
           
            
            
            if(args[4] > 600) return msg.reply("Can't Use More Than 600 Seconds.")
            var X = args[4] * 1000
            if (talkedRecently.has(msg.author.id)) {
                msg.channel.send("Wait Until Your Last Attack Ends." + msg.author);
                } else {
                    axios.get("API")
                    .then((response) => {
                        console.log(response.data);
                        console.log(response.status);
                        console.log(response.statusText);
                        console.log(response.headers);
                        console.log(response.config);
                    });
                await sleep(1000)
                console.log("Attack Sent To: " +args[2]+ "  Time: " +args[4]);
                msg.reply("Your Attack Info...")
                var business = new Discord.RichEmbed()
                  .setColor(15158332)
                  .addField("__**ATTACK INFO**__", `Ip/URL Attacked: ${args[2]}\nPort: ${args[3]}\nMethod: ${args[1]}\nAttack Time: ${args[4]}\nThank You For Choosing Guap Stresser`)
                msg.channel.send(business)
                talkedRecently.add(msg.author.id);
                setTimeout(() => {                
                talkedRecently.delete(msg.author.id);
                msg.reply("An Attack Has Ended, A Concurrent Is Available")
                
                }, X);

                }
        break;

        case 'silver':
            msg.channel.bulkDelete(1)
            
            if(!msg.member.roles.find(r => r.name === "Silver")) return msg.reply("You Dont Have The Silver Plan")
            if(!args[1]) return msg.reply('USAGE: F-silver [*method] [ip] [port] [time]')
            if(!args[2]) return msg.reply('USAGE: F-silver [method] [*ip] [port] [time]')
            if(!args[3]) return msg.reply('USAGE: F-silver [method] [ip] [*port] [time]')
            if(!args[4]) return msg.reply('USAGE: F-silver [method] [ip] [port] [*time]')
            if(args[5]) return msg.reply('USAGE: F-silver [method] [ip] [port] [time]')
            if(args[2] === "1.1.1.1") return msg.reply('Guap Stresser Rejects All Attacks To This IP')
            if(args[2] === "1.0.0.1") return msg.reply('Guap Stresser Rejects All Attacks To This IP')
            if(args[2] === "8.8.8.8") return msg.reply('Guap Stresser Rejects All Attacks To This IP')
            if(args[2] === "8.8.4.4") return msg.reply('Guap Stresser Rejects All Attacks To This IP')
            if(args[2] === "153.31.113.27") return msg.reply('Guap Stresser Rejects All Attacks To This IP')
            if(args[2] === "64.229.121.31") return msg.reply('Guap Stresser Rejects All Attacks To This IP')      
           
           
           
            if(args[4] > 1000) return msg.reply("Can't Use More Than 1000 Seconds.")
            var X = args[4] * 1000
            if (talkedRecently.has(msg.author.id)) {
                msg.channel.send("Wait Until Your Last Attack Ends." + msg.author);
                } else {
            
                    axios.get("API")
                    .then((response) => {
                        console.log(response.data);
                        console.log(response.status);
                        console.log(response.statusText);
                        console.log(response.headers);
                        console.log(response.config);
                    });
                //Where The URL Request Goes
                await sleep(1000)
                console.log("Attack Sent To: " +args[2]+ "  Time: " +args[4]);
                msg.reply("Your Attack Info...")
                var business = new Discord.RichEmbed()
                  .setColor(15158332)
                  .addField("__**ATTACK INFO**__", `Ip/URL Attacked: ${args[2]}\nPort: ${args[3]}\nMethod: ${args[1]}\nAttack Time: ${args[4]}\nThank You For Choosing Guap Stresser`)
                msg.channel.send(business)
                talkedRecently.add(msg.author.id);
                setTimeout(() => {                
                talkedRecently.delete(msg.author.id);
                msg.reply("An Attack Has Ended, A Concurrent Is Available")
                
                }, X);

                }         
        break;

        case 'gold':
            msg.channel.bulkDelete(1)
            
            if(!args[1]) return msg.reply('USAGE: F-gold [*method] [ip] [port] [time]')
            if(!args[2]) return msg.reply('USAGE: F-gold [method] [*ip] [port] [time]')
            if(!args[3]) return msg.reply('USAGE: F-gold [method] [ip] [*port] [time]')
            if(!args[4]) return msg.reply('USAGE: F-gold [method] [ip] [port] [*time]')
            if(args[5]) return msg.reply('USAGE: F-gold [method] [ip] [port] [time]')
            if(!args[2] === "1.1.1.1") return msg.reply('Guap Stresser Rejects All Hits To This IP')
            if(!args[2] === "1.0.0.1") return msg.reply('Guap Stresser Rejects All Hits To This IP')
            if(!args[2] === "8.8.8.8") return msg.reply('Guap Stresser Rejects All Hits To This IP')
            if(!args[2] === "8.8.4.4") return msg.reply('Guap Stresser Rejects All Hits To This IP')
            if(args[2] === "153.31.113.27") return msg.reply('Guap Stresser Rejects All Attacks To This IP')
            if(args[2] === "64.229.121.31") return msg.reply('Guap Stresser Rejects All Attacks To This IP')


            if(args[4] > 1500) return msg.reply("Can't Use More Than 1500 Seconds.")
            var X = args[4] * 1000
            if(!msg.member.roles.find(r => r.name === "Gold")){
                if(!msg.member.roles.find(r => r.name === "Gold+")){
                    if(!msg.member.roles.find(r => r.name === "Gold++")) return msg.reply("You Don't Have The Gold Plan")
                    if(oncooldown.has(msg.author.id)){
                        var lamo = 0
                        if(oncooldown2.has(msg.author.id)){
                            var lamo = 0
                            if(oncooldown3.has(msg.author.id)){
                                msg.reply("Sorry Not Enough Concurrents")
                            } else{
                                msg.reply("Your Attack Info.")
                                var business = new Discord.RichEmbed()
                                .setColor(15158332)
                                .addField("__**ATTACK INFO**__", `Ip/URL Attacked: ${args[2]}\nPort: ${args[3]}\nMethod: ${args[1]}\nAttack Time: ${args[4]}\nThank You For Choosing Guap Stresser!`)
                                msg.channel.send(business)
                                //Where The URL Request Goes
                                await sleep(1000)
                                console.log("Attack Sent To: " +args[2]+ "  Time: " +args[4]);            
                                oncooldown3.add(msg.author.id);
                                setTimeout(() => {
                                    oncooldown3.delete(msg.author.id)
                                    msg.reply("An Attack Has Ended, A Concurrent Is Available")
                                  }, X);
                                  }
                        } else{
                                msg.reply("Your Attack Info.")
                                var business = new Discord.RichEmbed()
                                .setColor(15158332)
                                .addField("__**ATTACK INFO**__", `Ip/URL Attacked: ${args[2]}\nPort: ${args[3]}\nMethod: ${args[1]}\nAttack Time: ${args[4]}\nThank You For Choosing Guap Stresser!`)
                                msg.channel.send(business)
                                //Where The URL Request Goes                              
                                await sleep(1000)
                                console.log("Attack Sent To: " +args[2]+ "  Time: " +args[4]);            
                                oncooldown2.add(msg.author.id);
                                setTimeout(() => {
                                oncooldown2.delete(msg.author.id)
                                msg.reply("An Attack Has Ended, A Concurrent Is Available")
                              }, X);
                              }
                    } else{
                          msg.reply("Your Attack Info.")
                          var business = new Discord.RichEmbed()
                          .setColor(15158332)
                          .addField("__**ATTACK INFO**__", `Ip/URL Attacked: ${args[2]}\nPort: ${args[3]}\nMethod: ${args[1]}\nAttack Time: ${args[4]}\nThank You For Choosing Guap Stresser!`)
                          msg.channel.send(business)
                          //Where The URL Request Goes
                          await sleep(1000)
                          console.log("Attack Sent To: " +args[2]+ "  Time: " +args[4]);
                          oncooldown.add(msg.author.id);
                          setTimeout(() => {
                          oncooldown.delete(msg.author.id)
                          msg.reply("An Attack Has Ended, A Concurrent Is Available")
                        }, X);
                        }
                } else{
                        if(oncooldown.has(msg.author.id)){
                        var lmao = 0
                        if(oncooldown2.has(msg.author.id)){
                        msg.reply("Sorry Not Enough Concurrents")
                } else{
                        msg.reply("Your Attack Info.")
                        var business = new Discord.RichEmbed()
                        .setColor(15158332)
                        .addField("__**ATTACK INFO**__", `Ip/URL Attacked: ${args[2]}\nPort: ${args[3]}\nMethod: ${args[1]}\nAttack Time: ${args[4]}\nThank You For Choosing Guap Stresser!`)
                        msg.channel.send(business)
                        //Where The URL Request Goes
                        await sleep(1000)
                        console.log("Attack Sent To: " +args[2]+ "  Time: " +args[4]);
                        oncooldown2.add(msg.author.id);
                        setTimeout(() => {
                        oncooldown2.delete(msg.author.id)
                        msg.reply("An Attack Has Ended, A Concurrent Is Available")
                      }, X);
                      }
                    } else{
                          msg.reply("Your Attack Info.")
                          var business = new Discord.RichEmbed()
                          .setColor(15158332)
                          .addField("__**ATTACK INFO**__", `Ip/URL Attacked: ${args[2]}\nPort: ${args[3]}\nMethod: ${args[1]}\nAttack Time: ${args[4]}\nThank You For Choosing Guap Stresser!`)
                          msg.channel.send(business)
                          //Where The URL Request Goes
                          await sleep(1000)
                          console.log("Attack Sent To: " +args[2]+ "  Time: " +args[4]);
                          oncooldown.add(msg.author.id);
                          setTimeout(() => {
                          oncooldown.delete(msg.author.id)
                          msg.reply("An Attack Has Ended, A Concurrent Is Available")
                        }, X);
                        }
            } 
            } else{
                    if(oncooldown.has(msg.author.id)){
                    msg.reply("Sorry Not Enough Concurrents")
                } else{
                    msg.reply("Your Attack Info.")
                    var business = new Discord.RichEmbed()
                    .setColor(15158332)
                    .addField("__**ATTACK INFO**__", `Ip/URL Attacked: ${args[2]}\nPort: ${args[3]}\nMethod: ${args[1]}\nAttack Time: ${args[4]}\nThank You For Choosing Guap Stresser!`)
                    msg.channel.send(business)
                    //Where The URL Request Goes
                    await sleep(1000)
                    console.log("Attack Sent To: " +args[2]+ "  Time: " +args[4]);
                    oncooldown.add(msg.author.id);
                    setTimeout(() => {
                    oncooldown.delete(msg.author.id)
                    msg.reply("An Attack Has Ended, A Concurrent Is Available")
                  }, X);
                  }
           }
        break;


    }
})

client.login(process.env.token)
