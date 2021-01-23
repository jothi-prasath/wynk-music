const { app, BrowserWindow, nativeImage, globalShortcut } = require('electron');
const path = require('path');
const myUserAgent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'



let mainWindow

let iconImage = nativeImage.createFromPath(
  path.join(__dirname, "/build/icon.png")
);

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1202,
    height: 600,
    minWidth: 1202,
    minHeight: 600,
    frame: false,
    center: true,
    icon: iconImage,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, '/js/preload.js'),
    }
  })
  mainWindow.webContents.userAgent = myUserAgent
  mainWindow.setSize(1250, 600, false)
  mainWindow.loadURL('http://wynk.in')
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

app.on('ready', createWindow)


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


