import Constants from './constants'
import { DeviceType, OsType, AppType } from './enums'

const Env = {
    get userAgent(): string {
        return window.navigator.userAgent
    },

    get device(): DeviceType {
        if (/ipad/i.test(Env.userAgent)) {
            return DeviceType.iPad
        } else if (/iphone/i.test(Env.userAgent)) {
            return DeviceType.iPhone
        } else if (/ipod/i.test(Env.userAgent)) {
            return DeviceType.iPod
        } else {
            return DeviceType.Unknown
        }
    },

    get os(): OsType {
        if (/(ipad|iphone|ipod)/i.test(Env.userAgent)) {
            return OsType.iOS
        } else if (/android/i.test(Env.userAgent)) {
            return OsType.Android
        } else {
            return OsType.Unknown
        }
    },

    get osVersion(): string {
        if (Env.os === OsType.iOS) {
            const version = /ios ((\d+)(\.\d+){0,2})/i.exec(Env.userAgent)
            if (version) {
                return version[1]
            }
        } else if (Env.os === OsType.Android) {
            const version = /android ((\d+)(\.\d+){0,2})/i.exec(Env.userAgent)
            if (version) {
                return version[1]
            }
        }
        return '0.0'
    },

    get inIos(): boolean {
        return Env.os === OsType.iOS
    },

    get inAndroid(): boolean {
        return Env.os === OsType.Android
    },

    get inWechat(): boolean {
        return Env.app === AppType.Wechat
    },

    get inWeibo(): boolean {
        return Env.app === AppType.Weibo
    },

    get inBrowser(): boolean {
        return Env.app === AppType.Browser
    },

    get app(): AppType {
        if (/micromessenger/i.test(Env.userAgent)) return AppType.Wechat
        if (/weibo/i.test(Env.userAgent)) return AppType.Weibo
        return AppType.Browser
    },
}

export default Env
