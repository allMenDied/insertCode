module.exports=function(content, map, meta) {
  this.callback(null,dosomething(content.toString(),this.query), map, meta);
  return; // 当调用 callback() 时总是返回 undefined
};
function startTag(str,i){
  if(str[i]=='/'&&str[i+1]=='/'&&str[i+2]=='<'&&str[i+3]=='n'&&str[i+4]=='o'&&str[i+5]=='d'&&str[i+6]=='e'&&str[i+7]=='>'){
    return true
  }
  return false;
}
function endTag(str,i){
  if(str[i]=='/'&&str[i+1]=='/'&&str[i+2]=='<'&&str[i+3]=='/'&&str[i+4]=='n'&&str[i+5]=='o'&&str[i+6]=='d'&&str[i+7]=='e'&&str[i+8]=='>'){
    return true
  }
  return false;
}
function dosomething(str,options){
  var result='';
  let tagstart=false;
  let contentstartindex=null;
  for(var i=0;i<str.length;++i){
    if(tagstart){
      if(endTag(str,i)){
        let content=str.slice(contentstartindex,i);
        let _result=run(content,options);
        tagstart=false;
        result+=_result;
        i+=8;
      }
    }
    else if(startTag(str,i)){
      tagstart=true;
      contentstartindex=i+8;
      i+=7;
    }
    else{
      result+=str[i];
    }
  }
  return result;
}
function run(str,options){
  let _result='';
  var _ENV={
    writeToCode:function(str){
      _result+=str;
    },
    options:options
  }
  eval(str);
  return _result;
}
