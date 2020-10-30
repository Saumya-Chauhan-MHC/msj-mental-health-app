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

const drugAlcoholLinks = [
  {
    id: 1,
    title: 'National Council on Alcoholism and Drug Dependence (NCADD)',
    link: 'https://www.ncadd.org/get-help/find-local-assistance',
    description: '1-800-622-2255',
    phone: '8006222255',
  },
  {
    id: 2,
    title: 'Partnership for Drug Free Kids',
    link: 'https://drugfree.org/',
    description: '1-855-DRUGFREE (855-374-3733)',
    phone: '8553743733',
  },
  {
    id: 3,
    title: 'Substance Abuse and Mental Health Services Administration (SAMHSA)',
    link: 'https://www.samhsa.gov/find-help/national-helpline',
    description: '1-800-662-4357',
    phone: '8006624357',
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

const DrugAlcoholLinksList = (): Node => (
  <View style={styles.container}>
    {drugAlcoholLinks.map(({id, title, link, description, phone}) => {
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

export default DrugAlcoholLinksList;
