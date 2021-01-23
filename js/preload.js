const path = require('path');
const url = require('url');

const customTitlebar = require('custom-electron-titlebar');


window.addEventListener('DOMContentLoaded', () => {
  const titlebar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#202224'),
    icon: true,
    menu: false
  })
})
