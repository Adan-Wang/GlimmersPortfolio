//exact start
exports.DictionaryStart= function (input_msg) {
     for (var i=1; i<arguments.length;i++){
        let length_of_arg=arguments[i].length;
        if (input_msg.content.toLowerCase().startsWith(arguments[i]) && (input_msg.content[length_of_arg]== null || input_msg.content[length_of_arg]==' ') ){
            return 1;
        }
     }
    return 0;
}

exports.DictionaryStartWord= function (input_msg) {
    for (var i=1; i<arguments.length;i++){
       if (input_msg.content.toLowerCase().startsWith(arguments[i])){
           return arguments[i];
       }
    }
   return 0;
}


exports.Echo = function (input){
    return console.log(input);
}

exports.ReplyRdm = function (subj){
    if (arguments.length>1);
    for (var i=1; i<arguments.length;i++){
        subj=subj.concat(arguments[i])
    }
    var n = Math.floor((subj.length)*Math.random())
    return subj[n]
}


