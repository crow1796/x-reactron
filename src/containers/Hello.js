import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '@/actions/hello'
const { ipcRenderer } = window.require('electron')
const { BrowserWindow, dialog, globalShortcut, Menu, MenuItem, Tray, process } = window.require('electron').remote

class Hello extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: 'Ododz'
        }
        this.mainWindow = BrowserWindow.getAllWindows()[0]
        let mainSession = this.mainWindow.webContents.session
        console.log(mainSession)
        
        this.openGoogle = this.openGoogle.bind(this)
        this.showOpenDialog = this.showOpenDialog.bind(this)
        this.showSaveDialog = this.showSaveDialog.bind(this)
        this.showMessageBox = this.showMessageBox.bind(this)
        this.showErrorBox = this.showErrorBox.bind(this)
        this.toTray = this.toTray.bind(this)
        this.openBrowser = this.openBrowser.bind(this)
        this.sendIpcEvent = this.sendIpcEvent.bind(this)

        let mainMenu = Menu.buildFromTemplate([
            {
                label: 'Electron',
                submenu: [
                    {
                        label: 'Item'
                    },
                    {
                        label: 'Item 2'
                    }
                ]
            },
            {
                label: 'Help',
                submenu: [
                    {
                        label: 'About',
                        click: () => {
                            dialog.showMessageBox({title: 'About', message: 'About'})
                        },
                        accelerator: "Shift+Alt+U"
                    }
                ]
            }
        ])
        Menu.setApplicationMenu(mainMenu)
        console.log(process)
    }

    openGoogle(e){
        let googleWindow = new BrowserWindow({
            width: 400,
            height: 400
        })
        googleWindow.loadURL('http://google.com')
        googleWindow.on('closed', () => googleWindow = null)
    }

    showOpenDialog(e){
        dialog.showOpenDialog({}, (openPath) => {
            console.log(openPath)
        })
    }

    showSaveDialog(e){
        dialog.showSaveDialog({}, (fileName) => {
            console.log(fileName)
        })
    }

    showMessageBox(e){
        let buttons = ['Yes', 'No', 'Maybe']
        dialog.showMessageBox({
            buttons,
            title: 'Message',
            message: 'Are you sure you want to exit?',
            detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed illum deleniti unde quis eum, est odit voluptatum et a dignissimos labore dolore quisquam! Sapiente quod minus error quidem natus! Temporibus?'
        }, (buttonIndex) => {
            console.log(buttons[buttonIndex])
        })
    }

    showErrorBox(e){
        dialog.showErrorBox('Error', 'Ooops! Something went wrong!')
    }

    toTray(e){
        this.tray = new Tray('/home/joshua/Downloads/tray.png')
        this.tray.setToolTip('X-Reactron')
        this.mainWindow.hide()

        const trayMenu = Menu.buildFromTemplate([
            {
                label: 'Show',
                click: () => {
                    this.mainWindow.show()
                    this.tray.destroy()
                    this.tray = null
                }
            },
            {role: 'quit'}
        ])
        this.tray.setContextMenu(trayMenu)
    }

    openBrowser(e){
        window.open = 'https://google.com'
    }

    sendIpcEvent(e){
        ipcRenderer.send('channel1', 'asdasdf')
        ipcRenderer.on('channel1', (e) => console.log(e))
    }

    render(){
        return (
            <div id="hello">
                Hello, { this.state.name }
                <button type="button" className="btn btn-md btn-default" onClick={ this.openGoogle }>
                    Open google.com
                </button>
                <button type="button" className="btn btn-md btn-default" onClick={this.showOpenDialog }>
                    Upload
                </button>
                <button type="button" className="btn btn-md btn-default" onClick={this.showSaveDialog}>
                    Save
                </button>
                <button type="button" className="btn btn-md btn-default" onClick={this.showMessageBox}>
                    Message
                </button>
                <button type="button" className="btn btn-md btn-default" onClick={this.showErrorBox }>
                    Error
                </button>
                <button type="button" className="btn btn-md btn-default" onClick={this.toTray}>
                    To Tray
                </button>
                <button type="button" className="btn btn-md btn-default" onClick={this.openBrowser}>
                    Open Browser
                </button>
                <button type="button" className="btn btn-md btn-default" onClick={this.sendIpcEvent}>
                    Send ipc Event
                </button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        greet: Actions.greet
    }, dispatch)
)

export default connect(null, mapDispatchToProps)(Hello)