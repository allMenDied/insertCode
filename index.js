module.exports=function(content, map, meta) {
  this.callback(null,dosomething(content.toString(),this.query), map, meta);
  return; // 当调用 callback() 时总是返回 undefined
};
function startTag(str,i){
  if(str[i]=='<'&&str[i+1]=='n'&&str[i+2]=='o'&&str[i+3]=='d'&&str[i+4]=='e'){
    return true
  }
  return false;
}
function endTag(str,i){
  if(str[i]=='<'&&str[i+1]=='/'&&str[i+2]=='n'&&str[i+3]=='o'&&str[i+4]=='d'&&str[i+5]=='e'){
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
        i+=6;
      }
    }
    else if(startTag(str,i)){
      tagstart=true;
      contentstartindex=i+6;
      i+=5;
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
