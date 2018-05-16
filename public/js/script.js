
$( document ).ready(function() {
  "use strict";

/* ------------------------------------- */
/* Page Loading    ................... */
/* ------------------------------------- */

  $(".animsition").animsition({
    inClass: 'fade-in',
    outClass: 'fade-out',
    inDuration: 1500,
    outDuration: 800,
    linkElement: '.a-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : false,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });



});


  /* ------------------------------------- */
  /* Side-Nav   ................... */
  /* ------------------------------------- */

  function openNav() {
    document.getElementById("sidenav").style.width = "180px";
    document.getElementById("sidenav").style.opacity = "1";
  }

  function closeNav() {
      document.getElementById("sidenav").style.width = "0";
      document.getElementById("sidenav").style.opacity = "0";
  }

    // Side-Nav theme change
  document.getElementById('default').onclick = function () { 
      document.getElementById('theme_css').href = './static/css/default.css';    
  };
  document.getElementById('theme1').onclick = function () { 
      document.getElementById('theme_css').href = './static/css/theme1.css';
  };
  document.getElementById('theme2').onclick = function () { 
      document.getElementById('theme_css').href = './static/css/theme2.css';
  };
  document.getElementById('theme3').onclick = function () { 
      document.getElementById('theme_css').href = './static/css/theme3.css';
  };
  document.getElementById('theme4').onclick = function () { 
      document.getElementById('theme_css').href = './static/css/theme4.css';
  };
  document.getElementById('theme5').onclick = function () { 
      document.getElementById('theme_css').href = './static/css/theme5.css';
  };