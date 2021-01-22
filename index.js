const { app, BrowserWindow } = require('electron');
const path = require('path');
const myUserAgent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'



let mainWindow


function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: false,
    center: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, '/js/preload.js'),
    }
  })
  mainWindow.webContents.userAgent = myUserAgent
  mainWindow.setSize(770, 600, true)
  mainWindow.loadURL('http://wynk.in')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})