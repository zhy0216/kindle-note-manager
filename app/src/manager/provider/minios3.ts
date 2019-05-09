import { Provider, Folder, FileMeta } from '../../types/folder';
import {Client} from "minio";


export interface ProviderManager {
  isValid: () => Promise<boolean>;
  existBucket: (bucketName: string) => Promise<boolean>;
  listBuckets: () => Promise<Folder>;
  listFiles: (bucketName: string) => Promise<FileMeta[]>;
  // sendFile: (filename: string) => Promise<boolean>;
  // fetchFile: (bucketName: string, filename: string) => Promise<boolean>;

}


export class MinioManager implements ProviderManager {
  private readonly provider: Provider;
  private readonly client;
  constructor(provider: Provider) {
    this.provider = provider;
    this.client = new Client({
      endPoint: provider.api,
      port: parseInt(provider.port || "443", 10),
      useSSL: true,
      accessKey: provider.accessKey,
      secretKey: provider.secretKey,
    });
  }

  existBucket(bucketName: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.client.bucketExists(bucketName, (err, exists) => {
        if (err) return reject(err.code);

        return resolve(exists)
      })
    })
  }
  // fetchFile: (bucketName: string, filename: string) => Promise<boolean>;
  isValid(): Promise<boolean> {
    return this.listBuckets().then(_ => true)
  }

  listFiles(): Promise<FileMeta[]> {
    const stream = this.client.listObjectsV2('strongbox','', false,'');
    const files: FileMeta[] = [];

    return new Promise<FileMeta[]>((resolve) => {
      stream.on('data', (obj) => {
        files.push({ createAt: new Date(obj.lastModified).getTime(), name: obj.name, md5: obj.eTag, state: "onCloud" })
      });
      stream.on('end', () => {
        resolve(files)
      });
    })
  }

  listBuckets():  Promise<Folder> {
    return new Promise<Folder>((resolve, reject) => {
      this.client.listBuckets((err, buckets) => {
        // code: 'InvalidAccessKeyId',
        //   resource: '/',
        //   requestid: '15998B59235D6C15',
        //   hostid: 'de47cd06-cd3d-43d2-be56-1588badc363f',
        //   amzRequestid: null,
        //   amzId2: null,
        //   amzBucketRegion: null
        if (err) reject(err.code);
        else {
          // buckets : [ { name: 'strongbox', creationDate: 2019-04-26T04:02:24.437Z },
          //   { name: 'strongbox1', creationDate: 2019-04-27T16:29:44.633Z } ]
          resolve(buckets);
          console.log('buckets :', buckets)
        }
      })

    })
  }
  // listFiles: (bucketName: string) => Promise<FileMeta[]>;
  // sendFile: (filename: string) => Promise<boolean>;

}
