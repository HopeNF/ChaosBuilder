const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL('data:text/html,<h1>ChaosBuilder Test - It Works!</h1>');
  win.webContents.openDevTools();
});

app.on('window-all-closed', () => app.quit());