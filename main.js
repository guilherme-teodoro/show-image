const {ipcRenderer, ipcMain, app, BrowserWindow} = require('electron');

let mainWindow;
let showWindow;

function createShowWindow () {
  // Create the browser window.
  showWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  showWindow.loadFile('index-show.html');
  showWindow.on('closed', function () {
    mainWindow = null;
  });
}

function createMainWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

ipcMain.on('synchronous-message', (event, arg) => {
  showWindow.webContents.send('goback', arg);
});

app.on('ready', createMainWindow);
app.on('ready', createShowWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createMainWindow();
    createShowWindow();
  }
});
