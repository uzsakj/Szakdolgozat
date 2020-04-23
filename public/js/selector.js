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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
  }

  function formatDate(date) {} //calculate diff in days


  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  } //constucting todays date


  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
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
    var timeLine = "<td class='redips-mark'>Timeline</td>";
    $("#t1").append(timeLine);
    $.post("/scheduler/order/" + this.value, {
      '_token': $('meta[name=csrf-token]').attr('content')
    }).done(function (data) {
      console.log(data);
      var overlap = 0;
      var deadline = new Date();
      deadline = data['deadline'];
      var diffDays = datediff(parseDate(today), parseDate(deadline));

      if (document.getElementById($("#t1").find('td').last().attr("id")) != null) {
        var lastDate = document.getElementById($("#t1").find('td').last().attr("id")).innerText;
        console.log(datediff(parseDate(lastDate), parseDate(deadline)));
        overlap = datediff(parseDate(lastDate), parseDate(deadline));
      } //deleting eyisting columns before insert


      $("#t1").find('td').each(function () {
        $(this).remove();
      });

      for (var i = 0; i <= diffDays; i++) {
        //create column to be inserted
        var nl = "<td id=column" + (i + 1) + " class='redips-mark'>" + dateincrement(today, i) + "</td>"; //insert column

        $("#t1").append(nl);
      }

      console.log(document.getElementById($("#t1").find('td').last().attr("id")).innerText);
    });
  });
  document.getElementById("demo").innerHTML = str;
};

/***/ }),

/***/ 3:
/*!****************************************!*\
  !*** multi ./resources/js/selector.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\József\Desktop\Szakdolgozat\Szakdolgozat\resources\js\selector.js */"./resources/js/selector.js");


/***/ })

/******/ });