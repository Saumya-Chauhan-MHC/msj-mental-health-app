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

const eatingDisordersLinks = [
  {
    id: 1,
    title: 'National Eating Disorder Association (NEDA) HelpLine',
    link: 'https://www.nationaleatingdisorders.org/help-support/contact-helpline',
    description: '1-800-931-2237 ',
    phone: '8009312237',
  },
  {
    id: 2,
    title: 'National Association of Anorexia Nervosa and Associated Disorders(ANAD) ',
    link: 'https://anad.org/',
    description: '1-630-577-1330',
    phone: '6305771330',
  },
  {
    id: 3,
    title: 'Over eater’s Anonymous',
    link: 'https://oa.org/',
    description: '1-505-891-2664',
    phone: '5058912664',
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

const EatingDisordersLinksList = (): Node => (
  <View style={styles.container}>
    {eatingDisordersLinks.map(({id, title, link, description, phone}) => {
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
});

export default EatingDisordersLinksList;
