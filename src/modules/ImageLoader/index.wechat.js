/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */
import { getImageInfo } from "@remax/wechat"
let id = 0;
const requests = {};

const ImageLoader = {
  abort(requestId: number) {
    let image = requests[`${requestId}`];
    if (image) {
      image.onerror = image.onload = image = null;
      delete requests[`${requestId}`];
    }
  },
  getSize(uri, success, failure) {
    getImageInfo({
      src:uri,
      success:({width,height})=>{
        success(width,height)
      },
      failure
    })
  },
  load(uri, onLoad, onError): number {
    throw new Error("Image.load is not supported in wechat")
    return id;
  },
  prefetch(uri): Promise {
    throw new Error("Image.prefetch is not supported in wechat")
    // return new Promise((resolve, reject) => {
    //   ImageLoader.load(uri, resolve, reject);
    // });
  }
};

export default ImageLoader;
