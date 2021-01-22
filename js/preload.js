const path = require('path');
const url = require('url');

const customTitlebar = require('custom-electron-titlebar');


window.addEventListener('DOMContentLoaded', () => {
  const titlebar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#2f3241'),
    icon: false,
    menu: false,
  });
  titlebar.updateTitle(wynk)
})
