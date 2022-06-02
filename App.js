//import * as React from 'react';
import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Alert, Modal, Button, Pressable, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PrefListCost } from './cost_algo';
import { PrefListReward } from './reward_algo';
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="cost" component={ChoiceTrialCost} />
        <Stack.Screen name="reward" component={ChoiceTrialReward} />
        
        <Stack.Screen name="costResults" component={SurpriseResultsReminderCost} />
        <Stack.Screen name="rewardResults" component={SurpriseResultsReminderReward} />
        <Stack.Screen name="trials" component={SelectNumberOfTrials} />
        <Stack.Screen name="surprise" component={SurpriseTrialChoicePage} />
        <Stack.Screen name="surpriseTutorial" component={SurpriseTrialChoicePageTutorial} />
        <Stack.Screen name="randomImage" component={SurpriseOutputYes} />
        <Stack.Screen name="continue" component={SurpriseOutputNo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

var costCategories = [];
var rewardCategories = [];
var potential_cost_categories = ["Be_Robbed", "Be_Shell_Shocked", "Endure_Tornado", "Get_Lost", "Humvee_Stuck", "Lose_Pet", "Scary_Clown", "Tank_Battle",];
var potential_reward_categories = ["Beach_Ride", "Drive_Sports_Car", "Family_Reunion", "Go_Glamping", "Rather_Paint", "Restore_Car", "Win_Nobel_Prize", "Workout",];
var t1 = new PrefListCost(5)
var q1;
var t2 = new PrefListReward(5)
var q2;
var output1 = [];
var output2 = [];

function preferenceCost() {
  // PERFORM SORT BASED ON TABLE AND DISPLAY RESULT
  var index = t1.getOrder();
  var new_arr = [];
  console.log("LIST IN ORDER FOR COST:");
  for(var i = 0, pos = 1; i < index.length; i++){
    for(var j = 0; j < index[i].length; j++){
      console.log(costCategories[index[i][j]]);
      new_arr.push(costCategories[index[i][j]]);
    }
    pos += index[i].length;
  }
  return(new_arr)
}

function preferenceReward() {
  // PERFORM SORT BASED ON TABLE AND DISPLAY RESULT
  var index = t2.getOrder();
  var new_arr = [];
  console.log("LIST IN ORDER FOR REWARD:");
  for (var i = 0, pos = 1; i < index.length; i++){
    for (var j = 0; j < index[i].length; j++){
      console.log(rewardCategories[index[i][j]]);
      new_arr.push(rewardCategories[index[i][j]]);
    }
    pos += index[i].length;
  }
  return(new_arr)
}

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('./assets/homescreen.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={styles.appContainer}>
        <Text style={styles.title}>Human Decision Making</Text>
        <Pressable style={styles.trialButton} onPress={() => navigation.navigate('cost')}>
          <Text style={styles.sub_title}>Start Trial</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};


function LogChoiceTrial(action, Image1, Image2, time) {
  this.action = action;
  this.Image1 = Image1;
  this.Image2 = Image2;
  this.time = time;
}

function outputTableChoiceTrial(n, img1, img2) {
  var timestamp = new Date();
  if (n == 1){
    var a = new LogChoiceTrial("User selected Image2", img1, img2, timestamp);
    console.table([a]);
  }
  if (n == 0){
    var a = new LogChoiceTrial("User selected Image1", img1, img2, timestamp);
    console.table([a]);
  }
}

const ChoiceTrialCost = ({ navigation }) => {
  // img randomization
  //var x = (Math.floor(Math.random() * 5 + 1));
  // Generate random cost array
  for (let i = 0; i < 6; i++) {
    var random_index = Math.floor(Math.random()*potential_cost_categories.length);
    var random_cost = potential_cost_categories[random_index];
    costCategories.push(random_cost)
    potential_cost_categories.splice(random_index,1);
  }
  q1 = t1.getQuestion()
  if (q1 != null){
    return (
      <View>
        <View style={styles.appContainer}>
          <View style ={styles.imageContainer}>
            <Image resizeMode='contain'
              style = {{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2}}
              source = {require('./assets/cost/' + costCategories[q1.a] + '/img1.png')}/>
            <Image resizeMode='contain'
              style = {{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2}}
              source = {require('./assets/cost/' + costCategories[q1.b] + '/img1.png')}/>
          </View>
          <Pressable style={styles.choiceTrialButton1} onPress={() => navigation.push("cost")}>
            <Text onClick={() => {t1.addAnswer(-1); outputTableChoiceTrial(0, costCategories[q1.a], costCategories[q1.b]);}} style={styles.sub_title}>select</Text>
          </Pressable>
          <Pressable style={styles.choiceTrialButton2} onPress={() => navigation.push("cost")}>
            <Text onClick={() => {t1.addAnswer(1); outputTableChoiceTrial(1, costCategories[q1.a], costCategories[q1.b]);}} style={styles.sub_title}>select</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  else{
    output1 = preferenceCost()
    console.log(output1);
  }
  return (
    <View>
      <View style ={styles.container}>
        <Text style={styles.sub_title3}>Your results:</Text>
        <View style ={styles.imageContainer}>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost/' + output1[0] + '/img' + 1 + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost/' + output1[1] + '/img' + 1 + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost/' + output1[2] + '/img' + 1 + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost/' + output1[3] + '/img' + 1 + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost/' + output1[4] + '/img' + 1 + '.png')}/>
        </View>
        <Pressable style={styles.continueButton} onPress={() => navigation.navigate('reward')}>
          <Text style={styles.sub_title}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

const ChoiceTrialReward = ({ navigation }) => {
  // Generate random reward array
  for (let i = 0; i < 6; i++) {
    var random_index = Math.floor(Math.random()*potential_reward_categories.length);
    var random_reward = potential_reward_categories[random_index];
    rewardCategories.push(random_reward)
    potential_reward_categories.splice(random_index,1);
  }
  q2 = t2.getQuestion()
  if (q2 != null){
    return (
        <View>
          <View style={styles.appContainer}>
            <View style ={styles.imageContainer}>
              <Image resizeMode='contain'
                    style = {{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2}}
                    source = {require('./assets/reward/' + rewardCategories[q2.a] + '/img1.png')}/>
              <Image resizeMode='contain'
                    style = {{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2}}
                    source = {require('./assets/reward/' + rewardCategories[q2.b] + '/img1.png')}/>
            </View>
            <Pressable style={styles.choiceTrialButton1} onPress={() => navigation.push("reward")}>
              <Text onClick={() => {t2.addAnswer(-1); outputTableChoiceTrial(0, rewardCategories[q2.a], rewardCategories[q2.b]);}} style={styles.sub_title}>select</Text>
            </Pressable>
            <Pressable style={styles.choiceTrialButton2} onPress={() => navigation.push("reward")}>
              <Text onClick={() => {t2.addAnswer(1); outputTableChoiceTrial(1, rewardCategories[q2.a], rewardCategories[q2.b]);}} style={styles.sub_title}>select</Text>
            </Pressable>
          </View>
        </View>
    );
  }
  else{
    output2 = preferenceReward()
    console.log(output2);
  }
  return (
    <View>
      <View style ={styles.container}>
        <Text style={styles.sub_title3}>Your results:</Text>
        <View style ={styles.imageContainer}>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[0] + '/img' + 1 + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[1] + '/img' + 1 + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[2] + '/img' + 1 + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[3] + '/img' + 1 + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[4] + '/img' + 1 + '.png')}/>
        </View>
        <Pressable style={styles.continueButton} onPress={() => navigation.navigate('trials')}>
          <Text style={styles.sub_title}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};


























// SURPRISE TRIAL PIPELINE
const SurpriseResultsReminderCost = ({ navigation }) => {
  return (
    <View>
      <View style ={styles.container}>
        <Text style={styles.sub_title3}>Your results for cost images:</Text>
        <View style ={styles.imageContainer2}>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost/' + output1[0] + '/img' + 1 + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost/' + output1[1] + '/img' + 1 + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost/' + output1[2] + '/img' + 1 + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost/' + output1[3] + '/img' + 1 + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost/' + output1[4] + '/img' + 1 + '.png')}/>
        </View>
        <Pressable style={styles.continueButton} onPress={() => navigation.push('rewardResults')}>
          <Text style={styles.sub_title}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SurpriseResultsReminderReward = ({ navigation }) => {
  return (
    <View>
      <View style ={styles.container}>
        <Text style={styles.sub_title3}>Your results for reward images:</Text>
        <View style ={styles.imageContainer2}>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[0] + '/img' + 1 + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[1] + '/img' + 1 + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[2] + '/img' + 1 + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[3] + '/img' + 1 + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[4] + '/img' + 1 + '.png')}/>
        </View>
        <Pressable style={styles.continueButton} onPress={() => navigation.push('surprise')}>
          <Text style={styles.sub_title}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};







function LogSurpriseTrial(action, graphCost, graphReward, time) {
  this.action = action;
  this.graphCost = graphCost;
  this.graphReward = graphReward;
  this.time = time;
}

function outputTableSurpriseTrial(n, graph1, graph2) {
  var timestamp = new Date();
  if (n == 1){
    var a = new LogSurpriseTrial("User selected Yes", graph1, graph2, timestamp);
    console.table([a]);
  }
  if (n == 0){
    var a = new LogSurpriseTrial("User selected No", graph1, graph2, timestamp);
    console.table([a]);
  }
}



// ask user for surprise trials to be generated
const SelectNumberOfTrials = ({ navigation }) => {
  return (
    <ImageBackground source={require('./assets/homescreen.jpg')} style={{width: '100%', height: '100%'}}>
      <View style = {styles.appContainer}>
        <Text style={styles.title}>Final Part</Text>
        <Text style={styles.sub_title2}>Select the number of trials you wish to complete.</Text>
        <Pressable style={styles.surpriseTrialInput25} onPress={() => navigation.navigate('surpriseTutorial')}>
          <Text onClick={() => surpriseCombos(25)} style={styles.sub_title}>25 Trials</Text>
        </Pressable>
        <Pressable style={styles.surpriseTrialInput50} onPress={() => navigation.navigate('surpriseTutorial')}>
          <Text onClick={() => surpriseCombos(50)} style={styles.sub_title}>50 Trials</Text>
        </Pressable>
        <Pressable style={styles.surpriseTrialInput75} onPress={() => navigation.navigate('surpriseTutorial')}>
          <Text onClick={() => surpriseCombos(75)} style={styles.sub_title}>75 Trials</Text>
        </Pressable>
        <Pressable style={styles.surpriseTrialInput100} onPress={() => navigation.navigate('surpriseTutorial')}>
          <Text onClick={() => surpriseCombos(100)} style={styles.sub_title}>100 Trials</Text>
        </Pressable>
        <Pressable style={styles.surpriseTrialInputUnlimited} onPress={() => navigation.navigate('surpriseTutorial')}>
          <Text onClick={() => surpriseCombos(100)} style={styles.sub_title}>100+ Trials</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};


const SurpriseTrialChoicePageTutorial = ({ navigation }) => {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  return (
    <View>
      <View style ={styles.appContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => {setModalVisible1(!modalVisible1);}}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>You have selected Yes! A good or bad image will be displayed and you will press continue.</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible1(!modalVisible1)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible2(!modalVisible2);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>You have selected No! No image will be displayed and you will press continue.</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible2(!modalVisible2)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style ={styles.imageContainer}>
          <Text style={styles.sub_title3}>Two options are present. If you choose to select Yes, 
          you will have a 50% chance of being shown a positive image and 50% chance of being shown a negative image.
          The image presented to you will be based on either of the two levels shown below. 
          Select Yes if you would like to be shown an image, or No if you would like to skip this offer. </Text>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost&rewardimages/graphs/cost/level1.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost&rewardimages/graphs/reward/level5.png')}/>
        </View>
        <Pressable style={styles.surpriseTrialButtonYes} onPress={() => setModalVisible1(true)}>
          <Text style={styles.text}>Yes</Text>
        </Pressable>
        <Pressable style={styles.surpriseTrialButtonNo} onPress={() => setModalVisible2(true)}>
          <Text style={styles.text}>No</Text>
        </Pressable>
        <Pressable style={styles.exitTutorialButton} onPress={() => navigation.navigate('costResults')}>
          <Text style={styles.sub_title}>Exit Tutorial</Text>
        </Pressable>
      </View>
    </View>
  );
};

// Generate all possible combinations
function allPossibleCombinations(input, length, curstr) {
  if(curstr.length == length) return [ curstr ];
  var ret = [];
  for(var i = 0; i < input.length; i++){
    ret.push.apply(ret, allPossibleCombinations(input, length, curstr + input[i]));
  }
  return ret;
}

var input = [ '1', '2', '3', '4', '5']; // 5 graphs
var possible_combos;
var v;
function surpriseCombos(n) {
  possible_combos = allPossibleCombinations(input, 2, '');
  if (n == 25){ // user selects 25 trials
    v = 1;
    return
  }
  if (n == 50){ // user selects 50 trials
    v = 2;
    [].push.apply(possible_combos, possible_combos); // double array size
    return
  }
  if (n == 75){ // user selects 75 trials
    v = 3;
    [].push.apply(possible_combos, possible_combos); // triple array size
    [].push.apply(possible_combos, possible_combos);
    return
  }
  if (n == 100){ // user selects 100 trials
    v = 4;
    [].push.apply(possible_combos, possible_combos); // quadruple array size
    [].push.apply(possible_combos, possible_combos);
    [].push.apply(possible_combos, possible_combos);
    return
  }
}


const SurpriseTrialChoicePage = ({ navigation }) => {

  var local_possible_combos = possible_combos;
  var random_index = Math.floor(Math.random() * local_possible_combos.length);
  var random_output = local_possible_combos[random_index]; // generating two random graphs
  local_possible_combos.splice(random_index,1); // removes index selected

  return (
    <View>
      <View style ={styles.appContainer}>
        <View style ={styles.imageContainer}>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost&rewardimages/graphs/cost/level' + random_output.split("")[0] + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost&rewardimages/graphs/reward/level' + random_output.split("")[1] + '.png')}/>
        </View>
        <Pressable style={styles.surpriseTrialButtonYes} onPress={() => navigation.push('randomImage')}>
          <Text onClick={() => outputTableSurpriseTrial(1, random_output.split("")[0], random_output.split("")[1])} style={styles.text}>Yes</Text>
        </Pressable>
        <Pressable style={styles.surpriseTrialButtonNo} onPress={() => navigation.push('continue')}>
          <Text onClick={() => outputTableSurpriseTrial(0, random_output.split("")[0], random_output.split("")[1])} style={styles.text}>No</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SurpriseOutputYes = ({ navigation }) => {
  // 50/50 cost or reward
  var image = ''
  if (Math.random() > 0.5){
    image = 'cost'
  }
  else{
    image = 'reward'
  }
  // random image selected either cost or reward
  return(
    <ImageBackground source={require('./assets/cost&rewardimages/output/' + image + '/img6.jpeg')} style={styles.image1}>
      <View>
        <Pressable style={styles.continueButton} onPress={() => navigation.push('surprise')}>
          <Text style={styles.sub_title}>Continue</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const SurpriseOutputNo = ({ navigation }) => {
  return(
    <View>
      <View style ={styles.appContainer}>
        <Pressable style={styles.continueButton} onPress={() => navigation.push('surprise')}>
          <Text style={styles.sub_title}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};












const styles = StyleSheet.create({

  appContainer: {
    flex: 1,  // helps keep it centered vertically
    justifyContent: 'center', // helps keep it centered horizontally
    alignItems: 'center', // helps keep it centered vertically
    flexDirection: 'row',
    marginTop: 22,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },

  // TEXT

  title: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
  },
  sub_title: {
    fontSize: 18,
    lineHeight: 0,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
  sub_title2: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
    top: 350,
  },
  sub_title3: {
    fontSize: 20,
    color: 'black',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    top: 100,
    //left: 250,
  },
  text: {
    fontSize: 20,
    lineHeight: 10,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  // IMAGES

  image1: {
    width: '70%',
    height: '100%',
    resizeMode: 'center',
    position: 'absolute',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContainer2: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },

  // BUTTONS

  trialButton: {
    backgroundColor: "black",
    justifyContent: 'center',
    borderRadius: 200,
    position: 'absolute',
    //top: 400,
    padding: 20,
    marginTop: 200,
  },
  continueButton: {
    backgroundColor: "black",
    justifyContent: 'center',
    borderRadius: 200,
    position: 'absolute',
    top: 620,
    left: 1200,
    padding: 20
  },
  surpriseTrialButtonYes: {
    backgroundColor: "green",
    justifyContent: 'center',
    borderRadius: 200,
    position: 'absolute',
    top: 500,
    right: 40,
    padding: 30,
  },
  surpriseTrialButtonNo: {
    backgroundColor: "red",
    justifyContent: 'center',
    borderRadius: 200,
    position: 'absolute',
    top: 500,
    left: 40,
    padding: 30,
  },
  surpriseTrialInput25: {
    backgroundColor: "black",
    justifyContent: 'center',
    borderRadius: 200,
    position: 'absolute',
    top: 400,
    right: 1050,
    padding: 20
  },
  surpriseTrialInput50: {
    backgroundColor: "black",
    justifyContent: 'center',
    borderRadius: 200,
    position: 'absolute',
    top: 400,
    right: 850,
    padding: 20
  },
  surpriseTrialInput75: {
    backgroundColor: "black",
    justifyContent: 'center',
    borderRadius: 200,
    position: 'absolute',
    top: 400,
    right: 650,
    padding: 20
  },
  surpriseTrialInput100: {
    backgroundColor: "black",
    justifyContent: 'center',
    borderRadius: 200,
    position: 'absolute',
    top: 400,
    right: 450,
    padding: 20
  },
  surpriseTrialInputUnlimited: {
    backgroundColor: "black",
    justifyContent: 'center',
    borderRadius: 200,
    position: 'absolute',
    top: 400,
    right: 250,
    padding: 20
  },
  choiceTrialButton1: {
    backgroundColor: "black",
    justifyContent: 'center',
    borderRadius: 200,
    position: 'absolute',
    top: 600,
    left: 40,
    padding: 30,
  },
  choiceTrialButton2: {
    backgroundColor: "black",
    justifyContent: 'center',
    borderRadius: 200,
    position: 'absolute',
    top: 600,
    right: 40,
    padding: 30,
  },
  exitTutorialButton: {
    backgroundColor: "black",
    justifyContent: 'center',
    borderRadius: 200,
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 20
  },

  // MODAL OVERLAY

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MyStack;