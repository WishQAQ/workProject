import {Remote} from 'electron'

export const isElectron = !!(window as any).require && !!global.process.versions.node
const electron = isElectron && (window as any).require('electron')

export const remote: Remote = isElectron && electron.remote

export const BrowserWindow = isElectron && remote.BrowserWindow

export function getMainWindow() {
    if (!isElectron) return null
    let focusedWindow = BrowserWindow.getFocusedWindow()
    if (!focusedWindow) focusedWindow = BrowserWindow.getAllWindows()[0]
    return focusedWindow
}
