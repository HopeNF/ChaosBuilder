const { app, BrowserWindow } = require('electron');

console.log('🚀 Starting ChaosBuilder...');

function createWindow() {
  console.log('🖥️ Creating browser window...');
  
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Load the React dev server
  console.log('📡 Loading React app from http://localhost:3000');
  mainWindow.loadURL('http://localhost:3000');
  
  // Open DevTools automatically
  mainWindow.webContents.openDevTools();

  console.log('✅ ChaosBuilder should be visible now!');
}

app.whenReady().then(() => {
  console.log('⚡ Electron is ready');
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});