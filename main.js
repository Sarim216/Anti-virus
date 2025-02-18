const { app, BrowserWindow,ipcMain,dialog } = require('electron')
const path = require('path')
let win;
// const userDataPath = app.getPath('userData');
const exePath = app.getPath('exe');
var basePath = exePath.slice(0, exePath.lastIndexOf("\\"));
basePath = "./backend";
console.log(basePath);
function createWindow() {
    let backend;
    backend = path.join(process.cwd(), './backend/dist')
    var execfile = require('child_process').execFile;
    execfile(
        backend,
        {
            windowsHide: true,
        },
        (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            }
            if (stdout) {
                console.log(stdout);
            }
            if (stderr) {
                console.log(stderr);
            }
        }
    )
    win = new BrowserWindow({
        width: 790,
        height: 620,
        frame:false,
        webPreferences: {
            nodeIntegration:true,
            contextIsolation: false
        }
    })
    win.removeMenu();
    win.webContents.openDevTools();
    win.loadFile('index.html');

    ipcMain.on('byteAvenger-get-path',(event,data)=>{
        if (data ==="byteAvenger_GET_APP_PATH"){
            event.reply('byteAvenger-get-path', basePath);
        }
    });
    ipcMain.on('minimize',() => {
        win.minimize()
    })
    ipcMain.on('close',() => {
        win.close()
    });
    ipcMain.handle('file-picker', (params) => {
        return dialog.showOpenDialog(params);
    });
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    const { exec } = require('child_process');
    exec('taskkill /f /t /im engine.exe', (err, stdout, stderr) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
    if (process.platform !== 'darwin') {
        app.quit()
    }
})