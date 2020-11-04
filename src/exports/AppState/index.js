/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import findIndex from 'array-find-index';
import invariant from 'fbjs/lib/invariant';
import { onAppShow, onAppHide } from '@remax/wechat'

const EVENT_TYPES = ['change', 'memoryWarning'];

const AppStates = {
  BACKGROUND: 'background',
  ACTIVE: 'active'
};

const listeners = [];

export default class AppState {
  static isAvailable = true;

  static currentState = AppStates.ACTIVE;


  static addEventListener(type: string, handler: Function) {
    if (AppState.isAvailable) {
      invariant(
        EVENT_TYPES.indexOf(type) !== -1,
        'Trying to subscribe to unknown event: "%s"',
        type
      );
      if (type === 'change') {
        if(listeners.length === 0){
          registerListeners();
        }
        const callback = () => handler(AppState.currentState);
        listeners.push([handler, callback]);
      }
    }
  }

  static removeEventListener(type: string, handler: Function) {
    if (AppState.isAvailable) {
      invariant(
        EVENT_TYPES.indexOf(type) !== -1,
        'Trying to remove listener for unknown event: "%s"',
        type
      );
      if (type === 'change') {
        const listenerIndex = findIndex(listeners, pair => pair[0] === handler);
        invariant(
          listenerIndex !== -1,
          'Trying to remove AppState listener for unregistered handler'
        );
        const callback = listeners[listenerIndex][1];
        listeners.splice(listenerIndex, 1);
      }
    }
  }
}

const registerListeners = () =>{
  onAppShow((event)=>{
    AppState.currentState = AppStates.ACTIVE;
    handleCallback();
  })
  onAppHide(()=>{
    AppState.currentState = AppStates.BACKGROUND;
    handleCallback();
  })
}
const handleCallback = ()=>{
  for(const i in listeners){
    const [handler,callback] = listeners[i];
    if(callback){
      callback();
    }
  }
}
