// Stub for Tauri-only APIs when running in web/browser mode
export default {}
export const open = () => Promise.resolve(null)
export const save = () => Promise.resolve(null)
export const message = () => Promise.resolve()
export const ask = () => Promise.resolve(false)
export const confirm = () => Promise.resolve(false)
export const invoke = () => Promise.resolve()
export const convertFileSrc = (s: string) => s
export const readTextFile = () => Promise.resolve('')
export const writeTextFile = () => Promise.resolve()
export const readDir = () => Promise.resolve([])
export const exists = () => Promise.resolve(false)
export const Command = class { static create() { return { execute: () => Promise.resolve({ stdout: '', stderr: '' }) } } }
export const arch = () => Promise.resolve('web')
export const platform = () => Promise.resolve('web')
export const version = () => Promise.resolve('0.0.0')
export const checkUpdate = () => Promise.resolve(null)
export const installUpdate = () => Promise.resolve()
export const writeText = () => Promise.resolve()
export const readText = () => Promise.resolve('')
export const sendNotification = () => {}
