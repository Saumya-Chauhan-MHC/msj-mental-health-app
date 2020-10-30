
'use strict';
import React from 'react';

import {
  View, 
  Text, 
  Linking,
  StyleSheet, 
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native';

//import Colors from './Colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

//import type {Node} from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const selfHelpLinks = [
    {
        id : '1',
        name: 'Domestic Abuse And Child Abuse Hotline',
        links:
        [
            {
                id: '1',
                title: 'Child Abuse Hotline',
                link: 'https://www.childhelp.org/',
                description: '1-800-4-A-CHILD (800-422-4453)',
                phone: '8004224453',
            },
            {
                id: '2',
                title: 'National Domestic Violence Hotline',
                link: 'https://www.thehotline.org/',
                description: '1-800-799-7233',
                phone: '8007997233',
            },
            {
                id: '3',
                title: 'Missing & Exploited Children Hotline',
                link: 'http://www.missingkids.org/home',
                description: '1-800-843-5678',
                phone: '8008435678',
            }
        ]
    },
    {
        id : '2',
        name: 'Drug and Alcohol',
        links:
        [
            {
              id: '1',
              title: 'National Council on Alcoholism and Drug Dependence (NCADD)',
              link: 'https://www.ncadd.org/get-help/find-local-assistance',
              description: '1-800-622-2255',
              phone: '8006222255',
            },
            {
              id: '2',
              title: 'Partnership for Drug Free Kids',
              link: 'https://drugfree.org/',
              description: '1-855-DRUGFREE (855-374-3733)',
              phone: '8553743733',
            },
            {
              id: '3',
              title: 'Substance Abuse and Mental Health Services Administration (SAMHSA)',
              link: 'https://www.samhsa.gov/find-help/national-helpline',
              description: '1-800-662-4357',
              phone: '8006624357',
            },
        ]    
    }, 
    {
        id : '3',
        name: 'Eating Disorders',
        links:
        [
            {
              id: '1',
              title: 'National Eating Disorder Association (NEDA) HelpLine',
              link: 'https://www.nationaleatingdisorders.org/help-support/contact-helpline',
              description: '1-800-931-2237 ',
              phone: '8009312237',
            },
            {
              id: '2',
              title: 'National Association of Anorexia Nervosa and Associated Disorders (ANAD) ',
              link: 'https://anad.org/',
              description: '1-630-577-1330',
              phone: '6305771330',
            },
            {
              id: '3',
              title: 'Over eater’s Anonymous',
              link: 'https://oa.org/',
              description: '1-505-891-2664',
              phone: '5058912664',
            },
        ]
    },
    {
        id : '4',
        name: 'Learning Disabilities and ADHD',
        links:
        [
            {
              id: '1',
              title: 'Children & Adults with Attention Deficit/Hyperactivity Disorder Resource Center (CHADD) ',
              link: 'http://www.chadd.org/',
              description: '1-800-233-4050',
              phone: '8002334050',
            },
            {
              id: '2',
              title: 'National Center for Learning Disabilities ',
              link: 'https://www.ncld.org/',
              description: '1-888-575-7373',
              phone: '8885757373',
            },
        ]
    },
    {
        id : '5',
        name: 'Mental Health Crisis Lines / Suicide HotlinesEating Disorders',
        links: 
        [
            {
              id: '1',
              title: 'National Suicide Prevention Lifeline ',
              link: 'https://suicidepreventionlifeline.org/',
              description: '1-800-273-TALK (1-800-273-8255)',
              phone: '8002738255'
            },
            {
              id: '2',
              title: 'Trevor HelpLine / Suicide Prevention for LGBTQ+ Teens ',
              link: 'https://www.thetrevorproject.org/',
              description: '1-866-488-7386',
              phone: '8664887386'
            },
            {
              id: '3',
              title: 'Crisis Text Line ',
              link: 'https://www.crisistextline.org/text-us/',
              description: 'Text HOME to 741741',
              phone: ''
            },
            {
              id: '4',
              title: 'Gay & Lesbian National Hotline ',
              link: 'https://www.glbthotline.org/contact.html',
              description: '1-888-THE-GLNH (1-888-843-4564)',
              phone: '8888434564'
            },
            {
              id: '5',
              title: 'IMAlive',
              link: 'https://www.imalive.org/',
              description: 'N/A',
              phone: ''
            },
            {
              id: '6',
              title: 'National Runaway Safeline ',
              link: 'https://www.1800runaway.org/',
              description: '1-800-RUNAWAY',
              phone: '8007862929'
            },
            {
              id: '7',
              title: 'Teenline ',
              link: 'https://teenlineonline.org/',
              description: '1-310-855-4673',
              phone: '3108554673'
            },
        ]

    },
    {
        id : '6',
        name: 'Rape and Sexual Assault',
        links: 
        [
            {
              id: '1',
              title: 'Rape, Abuse, Incest, National Network (RAINN)',
              link: 'https://www.rainn.org/',
              description: '1-800-656-HOPE (1-800-656-4673)',
              phone: '8006564673',
            },
            {
              id: '2',
              title: 'Sexual Abuse - Stop It Now! ',
              link: 'https://www.stopitnow.org/',
              description: '1-888-PREVENT',
              phone: '8007738368',
            },
        ]

    },
    {
        id : '7',
        name: 'STD / AIDS',
        links: 
        [
            {
              id: '1',
              title: 'AIDS National Hotline',
              link: 'https://www.projectinform.org/helplines/',
              description: '1-800-342-2437',
              phone: '8003422437',
            },
            {  id: '2',
              title: 'Project Inform HIV/AIDS Treatment Infoline',
              link: 'https://www.projectinform.org/helplines/',
              description: '1-800-822-7422',
              phone: '8004227422',
            },
            {
              id: '3',
              title: 'Project Inform Hepatitis C Helpline ',
              link: 'https://www.projectinform.org/helplines/',
              description: '1-877-435-7443',
              phone: '8774357443',
            },
        ]

    }
];

const dialPhone = (phoneNumber) => {

  console.log('Phone : ' + phoneNumber);

  if (phoneNumber != '') 
  {
    const url = `telprompt://${phoneNumber}`;

    Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        // handle the error
	      console.error('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url)
	        .then((data) => console.log("then", data))
	        .catch((err) => { throw err; });
      }
    })
  }
};

  const renderLink = (entry) => {
        
    return (
        <View>
            <View style={styles.separator} />
                <TouchableOpacity
                    accessibilityRole={'button'}
                    onPress={() => Linking.openURL(entry.link)}
                    style={styles.linkContainer}>
                  <Text style={styles.link}>{entry.title}</Text>
                </TouchableOpacity>
                <View style={styles.phoneContainer}>
                  <Text style={styles.phoneNumber}>{entry.description}</Text>
                      <Icon
                      name='phone'
                      size={24}
                      color='gray'
                      onPress={() => {dialPhone(entry.phone)}}>
                      </Icon>
                </View>
        </View>
    );

  };
  
  const renderLinkGroup = (group) => {

    return (
        <>
        <View style={styles.separator} />
        <Text style={styles.groupTitle}>{group.name}</Text>
        <View style={styles.body}>
            <FlatList //style={styles.feed} 
                data={group.links} 
                renderItem={({ item }) => renderLink(item)} 
                keyExtractor={item => item.id} 
                showsVerticalScrollIndicator={false} >
            </FlatList> 
        </View>
        </>
    );
};

const HotlinesScreen = () => {

    return (
      <>
        <SafeAreaView>
          <View style={styles.body}>
                <Text style={{color: 'red', alignItems:'center', justifyContent: 'center'}}>Scroll down for entire list</Text>
                <FlatList //style={styles.feed} 
                    data={selfHelpLinks} 
                    renderItem={({ item }) => renderLinkGroup(item)} 
                    keyExtractor={item => item.id} 
                    showsVerticalScrollIndicator={false} >
              </FlatList> 
          </View>
        </SafeAreaView>
      </>
  );
    
};


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  body: {
    backgroundColor: Colors.white,
  },
  groupTitle: {
    marginTop: 12,
    fontSize: 21,
    fontWeight: '900',
    textAlign: 'center',
    color: Colors.black,
  
  },
  linkContainer: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    paddingEnd: 18,
    paddingStart: 18,
    paddingVertical: 8,
  },
  link: {
    //flex: 2,
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
    //paddingEnd: 12,
    //paddingStart: 12,
  },
  description: {
    //flex: 3,
    paddingVertical: 16,
    fontWeight: '400',
    fontSize: 18,
    color: Colors.dark,
  },
  phoneContainer: {
    flexDirection:'row', 
    paddingVertical: 8, 
    paddingStart: 18,
    paddingRight: 24,
  },
  phoneNumber: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
    paddingEnd: 12,
    //paddingStart: 12,
  },
  separator: {
    marginTop: 8,
    backgroundColor: Colors.light,
    height: 1,
  },
});

export default HotlinesScreen;
