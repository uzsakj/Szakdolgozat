// create container
var redips = {};

// initialization
redips.init = function () {
    // set reference to the REDIPS.drag library
    var rd = REDIPS.drag;
    // REDIPS.drag initialization
    rd.init();
};

// read values from "data-" attributes of dataName
redips.getData = function (dataName) {
	// variables
  var tbl = document.getElementById('table1'),	// reference to the main table
  		div = tbl.getElementsByTagName('DIV'),		// collect all DIV elements from main table
      dataValue,
      arr = [],
      i;
      
  // loop through DIV collection
  for (i = 0; i < div.length; i++) {
  	// read data value from current DIV element
    dataValue = div[i].dataset[dataName];
    // add value to the array if dataValue exists in HTML attribute
  	// and array already doesnt contain that value
    if (dataValue !== undefined && arr.indexOf(dataValue) === -1) {
			arr.push(dataValue);
    }
  }
  // display uniq values from "data-" attributes
  alert(dataName + ' - ' + arr.toString());
};


// add onload event listener
if (window.addEventListener) {
    window.addEventListener('load', redips.init, false);
}
else if (window.attachEvent) {
    window.attachEvent('onload', redips.init);
}