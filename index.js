const { app, Menu, BrowserWindow, nativeImage, Tray, clipboard, dialog } = require('electron');
const path = require('path');
const os = require('os')
const myUserAgent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'


let mainWindow, tray

let iconImage = nativeImage.createFromPath(
  path.join(__dirname, "/build/icon.png")
);

// Create the main menu template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: "Force Reload",
        accelerator: "CmdOrCtrl+Shift+R",
        click() {
          mainWindow.webContents.reload();
        },
      },
      {
        label: "Quit",
        accelerator: "CmdOrCtrl+Q",
        click() {
          // Quit the app
          app.exit(0);
        },
      },
    ],
  },
  {
    label: "Edit",
    submenu: [
      {
        label: "Undo",
        accelerator: "CmdOrCtrl+Z",
        selector: "undo:",
      },
      {
        label: "Redo",
        accelerator: "Shift+CmdOrCtrl+Z",
        selector: "redo:",
      },
      {
        type: "separator",
      },
      {
        label: "Cut",
        accelerator: "CmdOrCtrl+X",
        selector: "cut:",
      },
      {
        label: "Copy",
        accelerator: "CmdOrCtrl+C",
        selector: "copy:",
      },
      {
        label: "Paste",
        accelerator: "CmdOrCtrl+V",
        selector: "paste:",
      },
      {
        label: "Select All",
        accelerator: "CmdOrCtrl+A",
        selector: "selectAll:",
      }
    ],
  },
  {
    label: "View",
    submenu: [
      {
        label: "Toggle Fullscreen",
        accelerator: "F11",
        click() {
          mainWindow.setFullScreen(!mainWindow.fullScreen);
        },
      },
    ],
  },
  {
    label: "About",
    submenu: [
      {
        label: "About",
        click() {
          let versionInfo = `Wynk music: ${app.getVersion()}
  Electron: ${process.versions.electron}
  Chrome: ${process.versions.chrome}
  V8: ${process.versions.v8}
  OS: ${os.type()} ${os.arch()} ${os.release()}`;

          dialog.showMessageBox({
            type: "info",
            title: `Wynk music v${app.getVersion()}`,
            message: `Made by Jothi Prasath.`,
            detail: `${versionInfo}`,
            icon: iconImage,
            buttons: ["Copy Version Info", "OK"],
          })
            .then((res) => {
              let buttonClicked = res.response;
              switch (buttonClicked) {
                case 0:
                  clipboard.write({
                    text: versionInfo,
                  });
                  break;
              }
            })
            .catch((err) => {
              console.error(err);
            });
        },
      },
      {
        label: "Links",
        submenu: [
          {
            label: "Report Bugs/Issues",
            click: () => {
              shell.openExternal(
                "https://github.com/jothi-prasath/wynk-music/issues"
              );
            },
          },
          {
            label: "Repository",
            click: () => {
              shell.openExternal("https://github.com/jothi-prasath/wynk-music");
            },
          },
        ],
      },
    ],
  }
]

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

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1202,
    height: 600,
    minWidth: 1202,
    minHeight: 600,
    center: true,
    // Set main window background color to hide loading
    backgroundColor: "#282C34",
    icon: iconImage,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, '/js/preload.js'),
    }
  })
  mainWindow.webContents.userAgent = myUserAgent
  mainWindow.setSize(1260, 600, false)
  mainWindow.loadURL('http://wynk.in')
  // Building main menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Setting the main menu
  Menu.setApplicationMenu(mainMenu)
}

app.whenReady().then(() => {
  // Show the main window after app ready
  mainWindow.show()
  tray = new Tray(iconImage)
  tray.setToolTip('Wynk music')
  tray.on('click', () => mainWindow.show())
  // Setting the tray menu
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


