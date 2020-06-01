const { app, BrowserWindow } = require('electron');
var os 	= require('os-utils');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences:{
      nodeIntegration: true
    }
  
    
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  os.cpuUsage(function(v){
    console.log('cpu usage (%) ' + v*100);
    mainWindow.webContents.send('cpu', v*100);
  
    console.log('mem usage (%) ' + os.freememPercentage()*100);
    mainWindow.webContents.send('mem', os.freememPercentage()*100);
  
    console.log('total mem (GB) ' + os.totalmem()/1024);
    mainWindow.webContents.send('total-mem', os.totalmem()/1024);
  });


/** l'accolade endessous est la fin de const creatWindow */
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});