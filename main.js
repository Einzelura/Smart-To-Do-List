const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

// منع تشغيل نسخة ثانية
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit(); // لو فيه نسخة مفتوحة، يخرج
} else {
  app.on('second-instance', () => {
    // أي محاولة ثانية لفتح التطبيق
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus(); // يركز على نفس النافذة
    }
  });

  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1400,
      height: 900,
      minWidth: 1350,
      minHeight: 800,
      icon: path.join(__dirname, 'icon.png'),
      title: "Smart To Do List",  // <--- هذا مهم
      webPreferences: {
        nodeIntegration: true
      },
    });


    Menu.setApplicationMenu(null);
    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }

  app.whenReady().then(createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}
