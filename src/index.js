const { app, Menu, BrowserWindow, nativeImage, Tray } = require('electron');
const path = require('path');
const myUserAgent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'



let mainWindow, tray
// Icon
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
  mainWindow.once('ready-to-show', () => mainWindow.show())
}

// System tray icon
app.whenReady().then(() => {
  tray = new Tray(iconImage)
  tray.setToolTip('Wynk')
  tray.on('click', () => mainWindow.show())

  // Create context menu for tray icon
  let trayContextMenu = Menu.buildFromTemplate([
    {
      label: "Maximize",
      click() {
        if (mainWindow) {
          // Show the main window
          mainWindow.show();
          // Focus the main window
          mainWindow.focus();
        }
      }
    },
    {
      label: "Minimize to Tray",
      click() {
        // Hide the main window i.e. minimize to tray
        mainWindow.hide();
      }
    },
    {
      label: "Exit",
      click() {
        // Quit the app
        app.exit(0);
      }
    }
  ])
  tray.setContextMenu(trayContextMenu)
})

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


