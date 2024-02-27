import { Platform } from 'react-native';
let RNFS = require('react-native-fs');

function hashCode(str) {
  return Array.from(str).reduce(
    // eslint-disable-next-line no-bitwise
    (s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0,
    0,
  );
}

export class SoundCache {
  constructor(uri, onLoad, shouldDelete=false) {

    if (shouldDelete) {
      const hash = this.getHash(uri)
      RNFS.unlink(hash.path)
      .then(() => {
        console.log('FILE DELETED');
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch((err) => {
        console.log(err.message);
      });
    } else {
      this.source = null;
      this.onLoad = onLoad;
      this.load(uri);
    }
  }

  removeCallback = () => {
    this.onLoad = null
  }

  loadPath = (path, err) => {
    this.source = { uri: path };

    // Check callback
    if (this.onLoad) {
      // Trigger callback
      this.onLoad(this.source, err);
      return;
    }

    if (err) {
      this.onLoad(this.source, err);
      return;
    }
  };

  getHash = (uri) => {
    const name = hashCode(uri);
    const extension = Platform.OS === 'android' ? 'file://' : '';
    const path = `${extension}${RNFS.CachesDirectoryPath}/${name}.wav`;
    return {name: name, extension: extension, path: path}
  }

  downloadFile = (uri, path) => {
    console.log('URI =>', uri);
    RNFS.downloadFile({ fromUrl: uri, toFile: path })
      .promise.then(res => {
        if (res.statusCode === 200) {
          console.log('Sound downloaded => ', res);
          this.loadPath(path, null);
        } else {
          console.log('Could not download... => ', res);
          this.loadPath(uri, res.statusCode);
        }
      })
      .catch(err => {
        console.log('[ERROR] downloading file, uri:', uri, 'err =>', err);
      });
  };

  load = uri => {

    if (typeof uri !== 'string') {
      console.log('Expecting a String received =>', typeof uri);
      return;
    }

    console.log(`[SC] loading:  ${uri}`)

    if (uri) {

      const hash = this.getHash(uri)

      RNFS.exists(hash.path).then(exists => {
        if (exists) {
          console.log('[SC] loading sound from cache => ', hash.name);
          this.loadPath(hash.path, null); // Get from cache
        } else {
          console.log('[SC] Downloading sound from url => ', uri);
          this.downloadFile(uri, hash.path); // Download first time
        }
      });
    }
  };
}
