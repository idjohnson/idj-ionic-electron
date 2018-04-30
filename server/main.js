const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')
const menuManager = require('./menu-manager')

let win
const iconPath = path.join(__dirname, 'images/icon.png')

app.on('ready', appReady)

function appReady() {
  menuManager.onAbout = () => {console.log('You Really Clicked About...')}
  const menu = menuManager.build()
  Menu.setApplicationMenu(menu)

  //Only for Mac
  if (app.dock) {
    app.dock.setIcon(iconPath)
  }

  createWindow()
}

function createWindow () {
  // create the browser window
  win = new BrowserWindow({width: 1200, height: 800, title: 'Dispatcher', icon: iconPath})

  win.loadURL(url.format({
    pathname: path.join(__dirname, '../www/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools
  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('window-all-closed', () => {
  // On macintosh it is common for aps and their menu bar to stay active
  // until the user quicks with cmd Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
