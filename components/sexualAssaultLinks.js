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
import Colors from './Colors';
import type {Node} from 'react';

import {
  View, 
  Text, 
  Linking,
  StyleSheet, 
  TouchableOpacity
} from 'react-native';

import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const sexualAssaultLinks = [
  {
    id: 1,
    title: 'Rape, Abuse, Incest, National Network (RAINN)',
    link: 'https://www.rainn.org/',
    description: '1-800-656-HOPE (1-800-656-4673)',
    phone: '8006564673',
  },
   {
    id: 2,
    title: 'Sexual Abuse - Stop It Now! ',
    link: 'https://www.stopitnow.org/',
    description: '1-888-PREVENT',
    phone: '8007738368',
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

const SexualAssaultLinksList = (): Node => (
  <View style={styles.container}>
    {sexualAssaultLinks.map(({id, title, link, description, phone}) => {
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
  separator: {
    backgroundColor: Colors.light,
    height: 1,
  },
  phonecall: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  phonecall: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
});

export default SexualAssaultLinksList;
