!function(){var e=document.querySelector("body"),t=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]");a.disabled=!0;var d=null;t.addEventListener("click",(function(){d=setInterval((function(){e.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.disabled=!0,a.disabled=!1})),a.addEventListener("click",(function(){clearInterval(d),a.disabled=!0,t.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.eb52f396.js.map