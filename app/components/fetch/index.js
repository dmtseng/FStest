'use strict';
import type {Node} from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import RNFetchBlob from 'rn-fetch-blob';

var lastPath = '';

function downloadFile(e) {
  var url =
    'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
  handleFileCacheRequest(url);
}

function handleFileCacheRequest(url) {
  //need to set permissions or do some sort of request
  //PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)

  //todo:change downloaddir location?
  RNFetchBlob.config({
    path: RNFetchBlob.fs.dirs.DownloadDir + '/' + localFilenameForUrl(url),
  })
    .fetch('GET', url)
    .then(result => {
      lastPath = result.path();

      //   this.props.completeFileCache(url, result.path());
      //   this.removeRequestFromQueue(url);
    })
    .catch(error => {
      this.props.failFileCach(url);
      this.removeRequestFromQueue(url);
    });
}

//some sort of mapping
function localFilenameForUrl(url) {
  return 'pexels.jpeg';
}

function showFile(e) {
  RNFetchBlob.android.actionViewIntent(lastPath, 'image/jpeg');
}

const LinkList = (): Node => (
  <View>
    <Button onPress={e => downloadFile(e)} title="Fetch" />
    <Button onPress={e => showFile(e)} title="Show" />
  </View>
);

import {PermissionsAndroid} from 'react-native';

// async function requestWritePermission() {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       {
//         title: 'MGY storage request',
//         message:
//           'mgy needs access to storage ' + 'so you can learn awesome content.',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can use the storage');
//     } else {
//       console.log('storage permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// }

export default LinkList;
