const { app, BrowserWindow } = require('electron')

function createWindows() {
    let winNodeIntegrationFalse = new BrowserWindow({
        title: "nodeIntegration=false",
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false
        }
    });
    // winNodeIntegrationFalse.loadURL("https://get.webgl.org/webgl2/")
    winNodeIntegrationFalse.loadURL('chrome://gpu/');

    // let winNodeIntegrationTrue = new BrowserWindow({
    //     title: "nodeIntegration=true",
    //     width: 800,
    //     height: 600,
    //     webPreferences: {
    //         nodeIntegration: true
    //     }
    // });
    // winNodeIntegrationTrue.loadURL("https://get.webgl.org/webgl2/")
}

app.whenReady().then(createWindows)