/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/selector.js":
/*!**********************************!*\
  !*** ./resources/js/selector.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.Selector = function () {
  //parse date
  function parseDate(date) {
    var ymd = String(date).split('-');
    var dd = String(ymd[2]).padStart(2, '0');
    var mm = String(ymd[1]).padStart(2, '0');
    var yyyy = ymd[0];
    return new Date(yyyy, mm, dd);
  } //calculate diff in days


  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  } //constucting todays date


  function getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }

  var str = ""; //increment date

  function dateincrement(inputdate, daystoadd) {
    var date = new Date();
    var ymd = String(inputdate).split('-');
    var dd = String(parseInt(ymd[2]) + daystoadd).padStart(2, '0');
    var mm = String(ymd[1]).padStart(2, '0');
    var yyyy = ymd[0];
    date = yyyy + '-' + mm + '-' + dd;
    return date;
  }

  $("select option:selected").each(function () {
    str += $(this).text() + " ";
    $.post("/scheduler/order/" + this.value, {
      '_token': $('meta[name=csrf-token]').attr('content')
    }).done(function (data) {
      var station = data['destination_station_id'];
      var ordered_types = data['ordered_products'];
      ordered_types = ordered_types.split(',');
      var ordered_quantities = data['ordered_quantities'];
      ordered_quantities = ordered_quantities.split(',');
      var deadline = data['deadline'];
      $("#starting_station_id").replaceAll("");
      $("#starting_station_id").append(data['starting_station_id']); //console.log($("#starting_station_id").text());

      var diffDays = datediff(parseDate(getToday()), parseDate(deadline)); //deleting cells from previous orders

      $("#table1").find('td').each(function () {
        if ($(this).attr('id') != "cim") {
          $(this).remove();
        }
      }); //hideing all rows

      $("#table1").find('tr').each(function () {
        $(this).hide();
      }); //showing only the necessery row

      $("#table1").find('tr').each(function () {
        if ($(this).attr('id') == "station" + station || $(this).attr('id') == "timeline") {
          $(this).show();
        }

        for (var i = 0; i < ordered_types.length; i++) {
          if ($(this).attr('id') == "type" + ordered_types[i]) {
            $(this).show();
          }
        }
      }); //filling

      for (var i = 0; i <= diffDays; i++) {
        var nl = "<td id=timelinecolumn" + (i + 1) + " class='redips-mark'>" + dateincrement(getToday(), i) + "</td>";
        $("#timeline").append(nl);
        var nl = "<td id=stationcolumn" + (i + 1) + "></td>";
        $("#station" + station).append(nl);

        for (var j = 0; j < ordered_types.length; j++) {
          var nl = "<td id=type" + ordered_types[j] + "column" + (i + 1) + "></td>";
          $("#type" + ordered_types[j]).append(nl);
        }
      } //adding order cells


      for (var j = 0; j < ordered_types.length; j++) {
        $("#type" + ordered_types[j] + "column1").append("<div id=" + ordered_types[j] + "_" + ordered_quantities[j] + " class='redips-drag'>" + ordered_quantities[j] + "</div>");
      }

      window.REDIPS.drag.init();
    });
  });
};

window.processShipment = function () {
  var starting_station_id = $("#starting_station_id").text(); //console.log(starting_station_id);

  var wagons = [];
  $.post("/scheduler/wagon/" + starting_station_id, {
    '_token': $('meta[name=csrf-token]').attr('content')
  }).done(function (data) {
    console.log(Object.keys(data));
    Object.keys(data).forEach(function (item) {
      //console.log(data[item]['type_id']);
      var temp = data[item]['id'] + "_" + data[item]["type_id"] + "_" + data[item]['capacity'];
      wagons.push(temp);
    }); //console.log(wagons);

    var temp = window.REDIPS.drag.saveContent('table1', 'plain').split('&');

    for (var i = 0; i < temp.length; i++) {
      temp[i] = temp[i].split('=')[1];
    }

    var temp1 = $("#table1 tr");
    var ordered_types = [];
    var ordered_quantities = [];

    for (var i = 0; i < temp.length; i++) {
      ordered_types.push(temp[i].split('_')[0]);
      ordered_quantities.push(temp[i].split('_')[1]);
    } // console.log(ordered_types);
    //console.log(ordered_quantities);


    var wagons_needed = [];

    for (var i = 0; i < ordered_types.length; i++) {
      var quantity_needed = ordered_quantities[i];

      for (var j = 0; j < wagons.length; j++) {
        if (ordered_types[i] == wagons[j].split('_')[1] && quantity_needed > 0) {
          wagons_needed.push(wagons[j].split('_')[0]);
          quantity_needed = quantity_needed - wagons[j].split('_')[2];
        }
      }
    }

    console.log(wagons_needed);
  }); //console.log(temp1);
};

/***/ }),

/***/ 2:
/*!****************************************!*\
  !*** multi ./resources/js/selector.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\József\Desktop\Szakdolgozat\Szakdolgozat\resources\js\selector.js */"./resources/js/selector.js");


/***/ })

/******/ });