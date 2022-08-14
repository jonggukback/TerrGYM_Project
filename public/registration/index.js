  /* *******************nav바 유저이름 유지하기********************* */


  

/* ************************************************************* */


/* ************ bootstrap js ************* */
  
/* global bootstrap: false */
(() => {
  'use strict'
  const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()

/* ****************************************** */


