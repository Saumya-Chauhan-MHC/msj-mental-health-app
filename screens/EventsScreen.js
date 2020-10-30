import React, { useState, useEffect }  from 'react';

import {
  StyleSheet,
  Button,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

//import Colors from './Colors';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import firestore from '@react-native-firebase/firestore';

//import firebase from '@react-native-firebase/app';

import * as AddCalendarEvent from 'react-native-add-calendar-event';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import moment from "moment";

const EventsScreen = ({navigation}) => {

  const [events, setEvents] = React.useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {

    //_getEvents();

    firestore()
        .collection('msjhs_events')
        .orderBy('id')
        .get()
        .then(querySnapshot => {

          const todos = [];
          console.log("Total Events :", querySnapshot.size);

            querySnapshot.forEach(doc => {

                console.log("document : ", doc.data());

                  const newEvent = {
                    id:        doc.data().id,
                    name:      doc.data().name,
                    title:     doc.data().title,
                    date:      doc.data().Time,
                    startDate: doc.data().startDate,
                    endDate:   doc.data().endDate,
                    allDay:    doc.data().allDay,
                    location:  doc.data().location,
                    desc:      doc.data().description,
                    notes:     doc.data().notes,
                  };

                  todos.push(newEvent);

                  //console.log("todos: ", todos, ", todos size : ", todos.length);
                });

                setEvents(todos);
                //console.log("todos: ", todos);
                console.log("DidMount events: ", events, ", events size : ", events.length);
           });
  }, []);

  const _getEvents = () => {
                    
    setRefreshing(true);

    firestore()
        .collection('msjhs_events')
        .orderBy('id')
        .get()
        .then(querySnapshot => {

          const todos = [];
          console.log("Total Events :", querySnapshot.size);

            querySnapshot.forEach(doc => {

                console.log("document : ", doc.data());

                  const newEvent = {
                    id:        doc.data().id,
                    name:      doc.data().name,
                    title:     doc.data().title,
                    date:      doc.data().Time,
                    startDate: doc.data().startDate,
                    endDate:   doc.data().endDate,
                    allDay:    doc.data().allDay,
                    location:  doc.data().location,
                    desc:      doc.data().description,
                    notes:     doc.data().notes,
                  };

                  todos.push(newEvent);

                  //console.log("todos: ", todos, ", todos size : ", todos.length);
                });

                setEvents(todos);
                console.log("events: ", events, ", events size : ", events.length);
           });

    setRefreshing(false);
  };
 
  const utcDateToString = (momentInUTC) => {
    let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    return s;
  };

  const addToCalendar = (_event) => {

    const title    = _event.title;
    const notes    = _event.notes;
    const location = _event.location;
    const allDay   = _event.allDay;

    const startDate = utcDateToString(_event.startDate._seconds*1000);
    const endDate   = utcDateToString(_event.endDate._seconds*1000);

    const eventConfig = {
      title,
      startDate: startDate,
      endDate: endDate,
      notes: notes,
      location: location,
      allDay: allDay,
      navigationBarIOS: {
        tintColor: 'orange',
        backgroundColor: 'green',
        titleColor: 'blue',
      },
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then(
        (eventInfo: {
          calendarItemIdentifier: string,
          eventIdentifier: string,
        }) => {
          //alert('eventInfo -> ' + JSON.stringify(eventInfo));
          console.log('eventInfo -> ' + JSON.stringify(eventInfo));
        }
      )
      .catch((error: string) => {
        // handle error such as when user rejected permissions
        //alert('Error -> ' + error);
        console.log('Error -> ' + error);
      });
  };

  const renderEvent = (_event) => {

    const endTime = moment(_event.endDate.toDate()).format("hh:mm A");

    console.log("event.DateUTC: ", utcDateToString(_event.date._seconds*1000));

    return (

      <View style={{ flex: 1, width: 300 }}>
        <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
            <Text style={styles.eventName}>{'\u25CF'}  {_event.title}</Text>
        </View>
        <View>
            <TouchableHighlight
                underlayColor="#DDDDDD"
                activeOpacity={0.6}
                onPress={()=>{addToCalendar(_event)}}>
              <View style={{flexDirection:'row', justifyContent: "space-between", paddingVertical: 8}}>
                  <Icon name="calendar-month-outline" size={25} color={Colors.dark} />
                  <Text style={styles.eventTime}>{moment(_event.startDate.toDate()).format("lll")} - {endTime}</Text>
              </View>
            </TouchableHighlight>
            <Text style={styles.eventVenue}>Venue : {_event.location}</Text>
            <Text style={styles.eventDescription}>{_event.desc}</Text>
        </View>
        <View style={styles.separator} />
      </View>
    );    
  };

  //console.log("showEvents : ", showEvents);
  console.log("Render events : ", events, "events Size : ", events.length);

  return (

    <SafeAreaView  style={styles.container}>
      <View style={styles.separator} />
      <View >
      <Text style={{color: 'red', alignItems:'center', justifyContent: 'center'}}>Pull down to refresh</Text>
        <FlatList //style={styles.feed} 
                  data={events} 
                  renderItem={({ item }) => renderEvent(item)} 
                  keyExtractor={item => item.id} 
                  refreshing={refreshing}
                  onRefresh={_getEvents}
                  showsVerticalScrollIndicator={false} >
        </FlatList> 
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  eventName: {
    marginTop: 24,
    fontSize: 18,
    //paddingHorizontal: 24,
  },
  eventTime: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  eventVenue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  eventDescription: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '400',
    color: Colors.dark,
  },
  separator: {
    marginTop: 16,
    backgroundColor: Colors.light,
    height: 1,
  },
});

export default EventsScreen;

/* <Button title="Add to Calender"
onPress={() => {addToCalendar(_event)}}
/>
 */