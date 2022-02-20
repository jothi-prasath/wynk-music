const path = require('path');
const url = require('url');

const customTitlebar = require('custom-electron-titlebar');

// Custom title bar
window.addEventListener('DOMContentLoaded', () => {
  const titlebar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#202224'),
    icon: true, // Icon on top left corner in title bar
    menu: false // Menu disabled because of minimal look
  })
})
