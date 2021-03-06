var NoteBox = React.createClass({
  handleTextChange: function(){
    $("#" + this.props.baseId + "-button").show();
    textAreaAdjust(this.props.baseId + "-text");
  },
  handleSave: function(){
    saveTexts(this.props.baseId);
    $("#" + this.props.baseId + "-button").hide();
  },
  render: function() {
    return (
      <div className="note-box">
        <div className="row">
          <div className="col-md-9">
            <input
              type='text'
              onKeyUp={this.handleTextChange}
              id={this.props.baseId + "-header"}>
            </input>
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary save-btn" id={this.props.baseId + "-button"} onClick={this.handleSave} ref="saveButton"> Save
            </button>
          </div>
          <textarea onKeyUp={this.handleTextChange} id={this.props.baseId + "-text"} ref="text"></textarea>
        </div>
      </div>
    );
  }
});

var BoxRows = React.createClass({
  render: function(){
    return(
      <div className="row">
        <div className="col-md-6">
          <NoteBox baseId="todo" />
          <NoteBox baseId="react-test" />
        </div>
        <div className="col-md-6">
          <NoteBox baseId="koodaus" />
        </div>
      </div>
    );
  }
});

React.render(
  //React.createElement('h1', null, 'Hello, world!'),
  <BoxRows />,
  document.getElementById('note-boxes')
);

/*
Model of note-box
<div class='col-md-6'>
  <div class='note-box'>
    <div class="row">
      <div class="col-md-9">
        <input type='text' id='todo-header' onclick='$("#todo-button").show()'></input>
      </div>
      <div class="col-md-3">
        <button class="btn btn-primary save-btn" id='todo-button' onclick='saveTexts("todo"); $(this).hide()'>
          Save
        </button>
      </div>
    </div>
    <textarea id='todo-text' onclick='$("#todo-button").show()' onkeyup="textAreaAdjust(this)"></textarea>
  </div>
</div>
*/





/*Magick from the internet starts here*/
//unicodetext to cookies
var docCookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};

//magick from the stackOverflow for autoresize
function textAreaAdjust(id) {
  document.getElementById(id).style.height = "1px";
  var sHeight = document.getElementById(id).scrollHeight;
  document.getElementById(id).style.height = 25+sHeight+"px";
}



/*MY CODE */
$(document).ready(function(){
	initTextInputs("todo");
	initTextInputs("koodaus");
  initTextInputs("react-test")
});

//saves textfields text to a cookie
function saveTexts(baseId) {
  var saveText = function (fieldId){
	  var val = document.getElementById(fieldId).value;
	  docCookies.setItem(fieldId, val, Infinity);
  }
  saveText(baseId+"-text");
  saveText(baseId+"-header");
	return true;
}

//fills textarea and header with the saved text from the cookie and sets proper height
function initTextInputs(baseId) {
  var initText = function (fieldId) {
    var cookieText = docCookies.getItem(fieldId);
    var textElement = document.getElementById(fieldId);
    textElement.value = cookieText;
  }
  initText(baseId+"-text");
  initText(baseId+"-header");
  textAreaAdjust(baseId+"-text");
}
