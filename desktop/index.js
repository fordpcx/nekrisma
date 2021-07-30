const electron = require("electron");
const {app} = electron;
const {BrowserWindow} = electron;

// const url = require("url");
const path = require("path");
const isDev = require("electron-is-dev");

const location = isDev ?
	"http://localhost:3000" : `file://${path.join(__dirname, "../web/out/index.html")}`;

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({width: 900, height: 680});
	mainWindow.loadURL(location);
	mainWindow.on("closed", () => mainWindow = null);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});