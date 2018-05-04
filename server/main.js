const {app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')
const url = require('url')
const menuManager = require('./menu-manager')

let win
let tray
let splashScreen

const iconPath = path.join(__dirname, 'images')

app.on('ready', appReady)

function appReady() {
  menuManager.onAbout = () => {console.log('You Really Clicked About...')}
  menuManager.onMap = () => { activateAndNav('map') }
  menuManager.onLocations = () => { activateAndNav('locations') }

  const menu = menuManager.build()
  Menu.setApplicationMenu(menu)

  //Only for Mac
  if (app.dock) {
    app.dock.setIcon(path.join(iconPath, 'icon.png'))
  }

  createSplashScreen()
  initTray()
  createWindow()
}

function activateAndNav(page) {
  if (!win) {
    createWindow(page)
  } else {
    navigateTo(page)
  }
}

function navigateTo(page) {
  app.focus()

  if (page === 'map') {
    win.webContents.send('onMap')
  }
  if (page === 'locations') {
    win.webContents.send('onLocations')
  }
}

function createSplashScreen() {
  splashScreen = new BrowserWindow({
    width: 640,
    height: 480,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    closable: false,
    skipTaskbar: true,
    show: true,
    minimizable: false,
    maximizable: false,
    resizable: false,
    center: true,
    frame: false
  })

  splashScreen.loadURL('http://localhost:8100/assets/imgs/splash.jpg')
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

function createWindow (page) {
  // create the browser window
  const windowIcon = process.platform === 'darwin' ? 'icon.png' : 'icon.ico'
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Dispatcher',
    icon: path.join(iconPath, windowIcon),
    show: false
  })

  win.loadURL('http://localhost:8100')
/*
  win.loadURL(url.format({
    pathname: path.join(__dirname, '../www/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  */

  // discards event handler after rendering.. its a "one time deal"
  win.once('ready-to-show', () => {
    if (splashScreen && splashScreen.isVisible()) {
      splashScreen.destroy()
      splashScreen = null
    }

    if (!win.isVisible()) {
      win.show()
    }

    if (page) {
      navigateTo(page)
    }
  })
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

app.on('activate', () => {
  // On macintosh it is common for aps and their menu bar to stay active
  // until the user quicks with cmd Q
  if (win === null) {
    createWindow()
  }
})
