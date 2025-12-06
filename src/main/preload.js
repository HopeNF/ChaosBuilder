const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process to use
// limited Electron functionality
contextBridge.exposeInMainWorld('electronAPI', {
  // We'll add functions here later for file system access, etc.
});