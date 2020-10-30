import React, { useState, useEffect }  from 'react';

import { 
  StyleSheet,
  View, 
  Text, 
  Button, 
  StatusBar,
  ScrollView,
  SafeAreaView,
  FlatList,
  VirtualizedList,
} from 'react-native';

import { useTheme } from '@react-navigation/native';

//import Colors from './Colors';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  
  const [quotes, setQuotes] = React.useState([{id:'0', quote: 'You are enough just as you are.', name: 'Meghan Markle'}]);

  const [quoteId, setQuoteId] = React.useState(0);

  const currDay = Math.floor(Date.now()/(86400000));

  useEffect(() => {

    firestore()
        .collection('quotes')
        .orderBy('id')
        .get()
        .then(querySnapshot => {

          const todos = [];
          //console.log("Total quotes :", querySnapshot.size);

            querySnapshot.forEach(doc => {

                //console.log("quote : ", doc.data());

                  const newQuote = {
                    id:    doc.data().id,
                    quote: doc.data().quote,
                    name:  doc.data().name,
                  };

                  todos.push(newQuote);

                  //console.log("todos: ", todos, ", todos size : ", todos.length);
                });

                setQuotes(todos);
                setQuoteId(currDay%todos.length);
                //console.log("DidMount counselers: ", quotes, ", # num quotes: ", quotes.length);
           });
  }, []);

/*   const quoteCount = () => {

    return quotes.length;
  };

  const getQuote = (data, index) => {

    return {
      id: Math.random().toString(12).substring(0),
      title: data.quote
    }
  };
 */

  console.log("Day number", currDay);
  console.log("Quote Id", quoteId);

  const renderQuotes = (quote) => {

    return (
  
      <View style={{ flex: 1, width: 300 }}>
          <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
          <Text style={styles.quote}>"{quote.quote}"</Text>
          <Text style={styles.author}>{quote.name}</Text>
          </View>
        <View style={styles.separator} />
      </View>
    );

  };


  return (

      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Mission San Jose High School</Text>
            <Text style={styles.sectionTitle}>Mental Health Committee</Text>
            <Text style={styles.sectionDescription}>
                  We strive to initiate open discussion about mental health and 
                  suicide prevention by hosting workshops, panels, and other 
                  events about a wide range of mental health-related topics. 
                  With this app, we hope to expand our opportunities to perpetuate 
                  the conversation about mental health awareness and receive 
                  feedback from MSJ students.
              </Text>
              <View style={styles.separator} />
              <Text style={styles.quoteSection}>Quote of the Day</Text>
              <View style={styles.separator} />
              <Text style={styles.quote}>"{quotes[quoteId].quote}"</Text>
              <Text style={styles.author}>{quotes[quoteId].name}</Text>
              <View style={styles.separator} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: "column",
    alignItems: 'center', 
    justifyContent: 'center'
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    alignItems: 'center', 
    justifyContent: 'center',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.dark,
  },
  quoteSection: {
    marginTop:20,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center', 
    justifyContent: 'center',
    color: Colors.dark,
  },
  quote: {
    marginTop:12,
    fontSize: 18,
    fontStyle : 'italic',
    fontWeight: '900',
    color: Colors.dark,
  },
  author: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  name: {
    marginTop: 8,
    fontSize: 8,
    fontWeight: '800',
    color: Colors.dark,
  },
  separator: {
    marginTop: 16,
    backgroundColor: Colors.light,
    height: 1,
  },
});

export default HomeScreen;

 
/*
                <FlatList //style={styles.feed} 
                    data={quotes} 
                    renderItem={({ item }) => renderQuotes(item)} 
                    keyExtractor={item => item.id} 
                    showsVerticalScrollIndicator={true} >
                </FlatList> 
 */