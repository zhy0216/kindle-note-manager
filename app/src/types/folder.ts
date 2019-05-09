

export type Provider = {
  name: string;
  api: string;
  port: string
  accessKey: string;
  secretKey: string;
}

export type Folder = { // more like a bucket
  createAt: number,
  name: string, // bucketName
}

export type ProviderFolder = {
  provider: Provider,
  folder: Folder,
  id?: string, // gen from api + bucketName
  valid?: boolean, // == null => pending,
}

export type FileMeta = {
  createAt: number,
  name: string, //
  md5: string,
  localPath?: string,
  state: string, // "onCloud", "downloaded", "pending"
}
