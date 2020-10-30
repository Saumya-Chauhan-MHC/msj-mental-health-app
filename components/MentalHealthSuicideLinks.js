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

const MentalHealthSuicideLinks = [
  {
    id: 1,
    title: 'National Suicide Prevention Lifeline ',
    link: 'https://suicidepreventionlifeline.org/',
    description: '1-800-273-TALK (1-800-273-8255)',
    phone: '8002738255'
  },
  {
    id: 2,
    title: 'Trevor HelpLine / Suicide Prevention for LGBTQ+ Teens ',
    link: 'https://www.thetrevorproject.org/',
    description: '1-866-488-7386',
    phone: '8664887386'
  },
  {
    id: 3,
    title: 'Crisis Text Line ',
    link: 'https://www.crisistextline.org/text-us/',
    description: 'Text HOME to 741741',
    phone: ''
  },
  {
    id: 4,
    title: 'Gay & Lesbian National Hotline ',
    link: 'https://www.glbthotline.org/contact.html',
    description: '1-888-THE-GLNH (1-888-843-4564)',
    phone: '8888434564'
  },
  {
    id: 5,
    title: 'IMAlive',
    link: 'https://www.imalive.org/',
    description: 'N/A',
    phone: ''
  },
  {
    id: 6,
    title: 'National Runaway Safeline ',
    link: 'https://www.1800runaway.org/',
    description: '1-800-RUNAWAY',
    phone: '8007862929'
  },
  {
    id: 7,
    title: 'Teenline ',
    link: 'https://teenlineonline.org/',
    description: '1-310-855-4673',
    phone: '3108554673'
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

const MentalHealthSuicideLinksList = (): Node => (
  <View style={styles.container}>
    {MentalHealthSuicideLinks.map(({id, title, link, description, phone}) => {
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

export default MentalHealthSuicideLinksList;
