import { MinioManager, ProviderManager } from './minios3';
import { Provider, ProviderFolder } from '../../types/folder';

const cached = {};

export const getProviderManager = async (provider: Provider): Promise<ProviderManager> => {
  return new Promise<ProviderManager>(async (resolve, reject) => {
    const hash = getHash(provider)
    if (cached[hash]) {
      return cached[hash]
    }
    if (provider.name === "minio/s3") { // use switch
      try {
        const manager = new MinioManager(provider);
        if (await manager.isValid()){
          cached[hash] = manager;
          return resolve(manager)
        }
      }catch(error) {
        console.log(error)
        return reject(error)
      }
      reject("invalid provider info")
    }
  })
};

export const getId = (providerFolder: ProviderFolder) => ""

export const getHash = (provider: Provider) => 1
