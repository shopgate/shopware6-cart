import * as Logger from 'bunyan'

interface PipelineContext {
  config: PipelineConfiguration
  log: Logger
  meta: PipelineContextMeta
  storage: PipelineStorageContainer
}

interface PipelineStorageGetCallback {
  (err: Error | null, value: any): void
}

interface PipelineStorageDelCallback {
  (err: Error | null, value: string | number | Object): void
}

interface PipelineStorageSetCallback {
  (err: Error | null, value: string | number | Object): void
}

interface PipelineStorage {
  get(key: string, callback: PipelineStorageGetCallback): void

  get(key: string): Promise<any>

  set(key: string, value: string | number | Object, callback: PipelineStorageSetCallback): void

  set(key: string, value: string | number | Object): Promise<void>

  del(key: string, callback: PipelineStorageDelCallback): void | Promise<void>

  del(key: string): Promise<void>
}

interface PipelineStorageContainer {
  user: PipelineStorage
  device: PipelineStorage
  extension: PipelineStorage
}

interface PipelineConfiguration {
  shopware: PipelineConfigShopware,
  settings: PipelineConfigSettings
}

interface PipelineConfigShopware {
  endpoint: string
  accessToken: string
  languageId: string
}

interface PipelineConfigSettings {
  enableCoupons: boolean
  legalText: string
  legalInfo: string
}

interface PipelineContextMeta {
  userId?: string
  appId: string,
  deviceId: string,
  headers: Array<string> | undefined,
  cookies: Array<string> | undefined,
}
