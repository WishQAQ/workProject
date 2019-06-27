import configModule from '../../../config.json'

interface ConfigWindow {
    minWidth: number
    minHeight: number
}

interface DevConfig {
    port: number
    host: string
}

interface DevTypeConfig {
    main: DevConfig
    test: DevConfig
}

interface Config {
    hieipServer: string
    medicalServer: string
    window: ConfigWindow
    dev: DevTypeConfig
    admin: string
}

let configJson = configModule

if (process.env.NODE_ENV === 'production') {
    if ((window as any).config) configJson = (window as any).config
}

export const config: Config = configJson