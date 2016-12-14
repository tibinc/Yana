



function disableobject(obj)

{

var obj=obj;
obj.setAttribute('hidden', 'hidden');


}

function setvalue(obj,i)

{
var obj=obj;
obj.setAttribute('value', i);
console.log("hi");


}



function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}