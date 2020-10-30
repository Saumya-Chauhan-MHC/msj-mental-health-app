/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

'use strict';
import React from 'react';

import {
  View, 
  Text, 
  Linking,
  StyleSheet, 
  TouchableOpacity
} from 'react-native';

import Colors from './Colors';

import type {Node} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const domesticChildAbuseLinks = [
  {
    id: 1,
    title: 'Child Abuse Hotline',
    link: 'https://www.childhelp.org/',
    description: '1-800-4-A-CHILD (800-422-4453)',
    phone: '8004224453',
  },
  {
    id: 2,
    title: 'National Domestic Violence Hotline',
    link: 'https://www.thehotline.org/',
    description: '1-800-799-7233',
    phone: '8007997233',
  },
  {
    id: 3,
    title: 'Missing & Exploited Children Hotline',
    link: 'http://www.missingkids.org/home',
    description: '1-800-843-5678',
    phone: '8008435678',
    //phone: '',
  },
];

const dialPhone = (phoneNumber) => {

  console.log('Phone : ' + phoneNumber);

  if (phoneNumber != '') 
  {
    Linking.canOpenURL(`tel:${phoneNumber}`)
    .then(supported => {
      if (!supported) {
        // handle the error
      } else {
        return Linking.openURL(`tel:${phoneNumber}`);
      }
    })
  }
};

const DomesticChildAbuseLinksList = (): Node => (
  <View style={styles.container}>
    {domesticChildAbuseLinks.map(({id, title, link, description, phone}) => {
      return (
        <React.Fragment key={id}>
          <View style={styles.separator} />
          <TouchableOpacity
            accessibilityRole={'button'}
            onPress={() => Linking.openURL(link)}
            style={styles.linkContainer}>
            <Text style={styles.link}>{title}</Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row', paddingVertical: 8}}>
            <Text style={styles.phonecall}> {description}</Text>
              <Icon
                name='phone'
                size={24}
                color='gray'
                onPress={() => {dialPhone(phone)}}>
              </Icon>
          </View>
        </React.Fragment>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  linkContainer: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  link: {
    flex: 2,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.primary,
  },
  description: {
    flex: 3,
    paddingVertical: 16,
    fontWeight: '400',
    fontSize: 18,
    color: Colors.dark,
  },
  phonecall: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.light,
  },
});

export default DomesticChildAbuseLinksList;
