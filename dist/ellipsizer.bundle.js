/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

__webpack_require__(1);
// require('underscore');
$.fn.ellipsize = function (options) {

  var $this = this;

  /*
      TODO: add options for fadeInOut effect and slideUpDown effect
    for now, we just do a hard show/hide effect
     */

  var default_options = {
    maxLines: 10,
    overflowLineCountThreshold: 3,
    ellipsisHtml: '&hellip;',
    readMoreHtml: 'Read More',
    readLessHtml: 'Read Less',
    onReadMore: function onReadMore() {
      console.log('do read more!');
    },
    onReadLess: function onReadLess() {
      console.log('do read less!');
    }
  };

  var opts = _extends({}, default_options, options);

  $(document).off('.elli');
  this.find('.elli-overflow').show().removeClass('elli-overflow');
  this.find('.elli-read-more, .elli-read-less').remove();

  var last_line = 1;
  this.perWordAction(function ($word, line_number) {
    //console.log('per word', line_number, $word.text());
    if (line_number > opts.maxLines) {
      $word.addClass('elli-overflow');
    }
    last_line = Math.max(last_line, line_number);
  });

  // console.log(last_line, opts.maxLines);

  // var clamped_els = this.find('.elli-overflow');
  if (last_line - opts.maxLines > opts.overflowLineCountThreshold) {
    finalize.call(this);
  }

  function finalize() {
    var $this = this;
    $this.find('.elli-overflow:first').prev().addClass('elli-overflow');

    $this.find('.elli-overflow').hide();
    $('<span class="elli-read-more"><span class="elli-char">' + opts.ellipsisHtml + '</span> <a class="elli-toggle-more" style="cursor:pointer; display:block; margin-top:10px;">' + opts.readMoreHtml + '</a><br/></span>').insertBefore('.elli-overflow:first');
    $('<span class="elli-read-less" style="display:none;"><a class="elli-toggle-less" style="cursor:pointer; display:block; margin-top:10px;">' + opts.readLessHtml + '</a><br/></span>').insertAfter('.elli-overflow:last');

    $(document).on('click.elli', '.elli-toggle-more', function () {
      $this.find('.elli-overflow').show();
      $this.find('.elli-read-more').hide();
      $this.find('.elli-read-less').fadeIn();
      opts.onReadMore.call();
    });

    $(document).on('click.elli', '.elli-toggle-less', function () {
      $this.find('.elli-overflow').hide();
      $this.find('.elli-read-more').fadeIn();
      $this.find('.elli-read-less').hide();
      opts.onReadLess.call();
    });
  }

  $this = null;
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function(){
  $.fn.perWordAction = function(onPerWord){
    var $el = this;

    // idempotent wrap
    if(!$el.attr('data-pwa')){
      $el.attr('data-pwa', true);
      wrap($el);
    }

    // Wrap each word in a unique span for line-checkage
    // http://stackoverflow.com/questions/12105059/how-to-wrap-all-text-into-unique-span-tag
    var count = 0;
    function wrap(el) {
      $(el).filter(':not(script)').contents().each(function () {
        if (this.nodeType === Node.ELEMENT_NODE) {
          wrap(this);
        } else if (this.nodeType === Node.TEXT_NODE && !this.nodeValue.match(/^\s+$/m)) {
          $(this).replaceWith($.map(this.nodeValue.split(/(\S+)/), function (w) {
            return w.match(/^\s*$/) ? document.createTextNode(w) : $('<span>', {class: 'pwa-word', text: w}).get();
          }));
        }
      });
    }

    // our word stepper + line numberer
    function callPerWord(){
      var refPos = 0;
      var prevPos = null;
      var line = 0;

      $('.pwa-word', $el).each(function(){
        var $this = $(this);

        refPos = $this.offset().top;

        if(refPos !== prevPos){
          // next line
          line++;
        }else{
          // same line
        }
        $this.attr('pwa-line', line);

        onPerWord.call($el, $this, line);

        prevPos = refPos;

        $this = null;
      });
    }

    // do per-word loop and call callback
    callPerWord();
    $el.trigger('pwa-wrap-complete');
    $el = null;
  }
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);