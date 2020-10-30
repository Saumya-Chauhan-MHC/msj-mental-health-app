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
  ImageBackground,
  Linking,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

//import Colors from './Colors';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CounselingContactLinks = [
{
        id: '1',
        name: 'DeAnne Andrews  (A-Gh)',
        email: 'dandrews@fusdk12.net',
        phone: '37211',
    },
    {
        id: '2',
        name: 'Jitin Sharma  (Gi-Ln)',
        email: 'jsharma@fusdk12.net',
        phone: '37248',
    },
    {
        id: '3',
        name: 'Celina Cesena  (Lo-Sh)',
        email: 'ccesena@fusdk12.net',
        phone: '37215',
    },
    {
        id: '4',
        name: 'Lindsay Rotter  (Si-Z)',
        email: 'lrotter@fusdk12.net',
        phone: '37218',
    },
];

const CounselingScreen = ({navigation}) => {

/*  const [counselors, setCounselors] = React.useState([]);

  useEffect(() => {

    firestore()
        .collection('Counselors')
        .orderBy('id')
        .get()
        .then(querySnapshot => {

          const todos = [];
          //console.log("Total counselors :", querySnapshot.size);

            querySnapshot.forEach(doc => {

                //console.log("counselor : ", doc.data());

                  const newCounselor = {
                    id:        doc.data().id,
                    name:      doc.data().name,
                    email:     doc.data().email,
                    phone:     doc.data().extension,
                  };

                  todos.push(newCounselor);

                  //console.log("todos: ", todos, ", todos size : ", todos.length);
                });

                setCounselors(todos);
                //console.log("DidMount counselers: ", counselors, ", # numCounselors: ", counselors.length);
           });
  }, []);
  */
  const renderCounselors = (counselor) => {

      //const counselorEmail = 'mailto:' + counselor.email + '?subject=Subject Here&body=Type Here';
      const counselorEmail = 'mailto:' + counselor.email; // + '?subject=Subject Here&body=Type Here';
    
      return (
    
         <View style={{ flex: 1, width: 300 }}>
            <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
              <Text style={styles.name}>{counselor.name}</Text>
            </View>
            <View >
                <TouchableHighlight
                    underlayColor="#DDDDDD"
                    activeOpacity={0.6}
                    onPress={()=>{Linking.openURL(counselorEmail)}}>
                    <View style={{flexDirection:'row', paddingVertical: 8}}>
                        <Text style={styles.email}>{counselor.email}</Text>
                       <Icon name="email" size={25} color="grey" />
                    </View>
                </TouchableHighlight>
                <Text style={styles.phone}>Ext: {counselor.phone}</Text>
            </View>
            <View style={styles.separator} />
          </View>
      );    
  };
      
  return (
    
        <SafeAreaView style={styles.container}>
            <Text style={styles.name}>Contact Information</Text>
            <View style={styles.separator} />
            <FlatList //style={styles.feed} 
                        //data={counselors} 
                        data={CounselingContactLinks} 
                        renderItem={({ item }) => renderCounselors(item)} 
                        keyExtractor={item => item.id} 
                        //refreshing={refreshing}
                        //onRefresh={_getEvents}
                        showsVerticalScrollIndicator={false} >
              </FlatList> 
          <Text style={styles.footer}>Serving Our Students:</Text>
          <Text style={styles.officeHours}>Monday-Friday during School hours</Text>
        </SafeAreaView>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  name: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
    //paddingHorizontal: 24,
  },
  email: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  phone: {
    //marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.dark,
  },
  footer: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
    //paddingHorizontal: 24,
  },
  officeHours: {
    marginTop: 0,
    fontSize: 18,
    fontWeight: '800',
    paddingVertical: 8,
  },
  separator: {
    marginTop: 16,
    backgroundColor: Colors.light,
    height: 1,
  },
});

export default CounselingScreen;
