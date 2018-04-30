const {app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')
const url = require('url')
const menuManager = require('./menu-manager')

let win
let tray
const iconPath = path.join(__dirname, 'images')

app.on('ready', appReady)

function appReady() {
  menuManager.onAbout = () => {console.log('You Really Clicked About...')}
  const menu = menuManager.build()
  Menu.setApplicationMenu(menu)

  //Only for Mac
  if (app.dock) {
    app.dock.setIcon(path.join(iconPath, 'icon.png'))
  }

  initTray()
  createWindow()
}


function initTray() {
  if (process.platform === 'darwin') {
    tray = new Tray(path.join(iconPath, 'mac-tray.png'))
    tray.setPressedImage(path.join(iconPath, 'mac-tray-pressed.png'))
  } else {
    tray = new Tray(path.join(iconPath, 'icon.ico'))
  }

  tray.setToolTip(app.getName())
  tray.setContextMenu(menuManager.buildTrayMenu())
}

function createWindow () {
  // create the browser window
  const windowIcon = process.platform === 'darwin' ? 'icon.png' : 'icon.ico'
  win = new BrowserWindow({width: 1200, height: 800, title: 'Dispatcher', icon: path.join(iconPath, windowIcon)})

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
