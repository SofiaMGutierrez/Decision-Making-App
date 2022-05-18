import * as React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Alert, Button, Pressable, Dimensions } from 'react-native';
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

function getTimeStamp(){
  var timestamp = new Date();
  return timestamp;
}

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('./assets/homescreen.jpg')} style={{width: '100%', height: '100%'}}>
      <View style = {styles.appContainer}>
        <Text style={styles.title}>Human Decision Making</Text>
        <Pressable style={styles.trialButton} onPress={() => navigation.navigate('cost')}>
          <Text style={styles.sub_title}>Start Trial</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

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
        <View style={styles.container}>
          <View style ={styles.imageContainer}>
            <Image resizeMode='contain'
              style = {{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2}}
              source = {require('./assets/cost/' + costCategories[q1.a] + '/img1.JPG')}/>
            <Image resizeMode='contain'
              style = {{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2}}
              source = {require('./assets/cost/' + costCategories[q1.b] + '/img1.JPG')}/>
          </View>
          <Pressable style={styles.choiceTrialButton1} onPress={() => navigation.push("cost")}>
            <Text onClick={() => t1.addAnswer(-1)} style={styles.sub_title}>select</Text>
          </Pressable>
          <Pressable style={styles.choiceTrialButton2} onPress={() => navigation.push("cost")}>
            <Text onClick={() => t1.addAnswer(1)} style={styles.sub_title}>select</Text>
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
            source = {require('./assets/cost/' + output1[0] + '/img' + 1 + '.JPG')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost/' + output1[1] + '/img' + 1 + '.JPG')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost/' + output1[2] + '/img' + 1 + '.JPG')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost/' + output1[3] + '/img' + 1 + '.JPG')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost/' + output1[4] + '/img' + 1 + '.JPG')}/>
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
          <View style={styles.container}>
            <View style ={styles.imageContainer}>
              <Image resizeMode='contain'
                    style = {{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2}}
                    source = {require('./assets/reward/' + rewardCategories[q2.a] + '/img1.JPG')}/>
              <Image resizeMode='contain'
                    style = {{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2}}
                    source = {require('./assets/reward/' + rewardCategories[q2.b] + '/img1.JPG')}/>
            </View>
            <Pressable style={styles.choiceTrialButton1} onPress={() => navigation.push("reward")}>
              <Text onClick={() => t2.addAnswer(-1)} style={styles.sub_title}>select</Text>
            </Pressable>
            <Pressable style={styles.choiceTrialButton2} onPress={() => navigation.push("reward")}>
              <Text onClick={() => t2.addAnswer(1)} style={styles.sub_title}>select</Text>
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
            source = {require('./assets/reward/' + output2[0] + '/img' + 1 + '.JPG')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[1] + '/img' + 1 + '.JPG')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[2] + '/img' + 1 + '.JPG')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[3] + '/img' + 1 + '.JPG')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/8, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[4] + '/img' + 1 + '.JPG')}/>
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
  if(counter <= 25){
    return (
      <View>
        <View style ={styles.container}>
          <Text style={styles.sub_title3}>Your results for cost images:</Text>
          <View style ={styles.imageContainer2}>
            <Image resizeMode='contain'
              style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
              source = {require('./assets/cost/' + output1[0] + '/img' + 1 + '.JPG')}/>
            <Image resizeMode='contain'
              style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
              source = {require('./assets/cost/' + output1[1] + '/img' + 1 + '.JPG')}/>
            <Image resizeMode='contain'
              style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
              source = {require('./assets/cost/' + output1[2] + '/img' + 1 + '.JPG')}/>
            <Image resizeMode='contain'
              style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
              source = {require('./assets/cost/' + output1[3] + '/img' + 1 + '.JPG')}/>
            <Image resizeMode='contain'
              style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
              source = {require('./assets/cost/' + output1[4] + '/img' + 1 + '.JPG')}/>
          </View>
          <Pressable style={styles.continueButton} onPress={() => navigation.push('rewardResults')}>
            <Text style={styles.sub_title}>Continue</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  else{
    <View>
      <View style ={styles.container}>
        <Text style={styles.sub_title3}>Your trial has ended</Text>
      </View>
    </View>
  }
};

const SurpriseResultsReminderReward = ({ navigation }) => {
  return (
    <View>
      <View style ={styles.container}>
        <Text style={styles.sub_title3}>Your results for reward images:</Text>
        <View style ={styles.imageContainer2}>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[0] + '/img' + 1 + '.JPG')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[1] + '/img' + 1 + '.JPG')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[2] + '/img' + 1 + '.JPG')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[3] + '/img' + 1 + '.JPG')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/10, height: Dimensions.get('window').width/2}}
            source = {require('./assets/reward/' + output2[4] + '/img' + 1 + '.JPG')}/>
        </View>
        <Pressable style={styles.continueButton} onPress={() => navigation.push('surprise')}>
          <Text style={styles.sub_title}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};





var v;
var trialsChosen;
function surpriseTest1(n) {
  trialsChosen = n;
  console.log(n)
  if (n == 25){
    v = 1;
  }
  if (n == 50){
    v = 2;
  }
  if (n == 75){
    v = 3;
  }
  if (n == 100){
    v = 4;
  }
}

function outputFunction(n, graph1, graph2,) {
  var timestamp = new Date();
  console.log(timestamp);
  if (n == 1){
    console.log("Yes")
    console.log("Cost:")
    console.log(graph1, "/5")
    console.log(graph2, "/5")
  }
  if (n == 0){
    console.log("No")
    console.log("Reward:")
    console.log(graph1, "/5")
    console.log(graph2, "/5")
  }
}








// ask user for surprise trials to be generated
const SelectNumberOfTrials = ({ navigation }) => {
  return (
    <ImageBackground source={require('./assets/homescreen.jpg')} style={{width: '100%', height: '100%'}}>
      <View style = {styles.appContainer}>
        <Text style={styles.title}>Human Decision Making</Text>
        <Pressable style={styles.surpriseTrialInput25} onPress={() => navigation.navigate('costResults')}>
          <Text onClick={() => surpriseTest1(25)} style={styles.sub_title}>25 Trials</Text>
        </Pressable>
        <Pressable style={styles.surpriseTrialInput50} onPress={() => navigation.navigate('costResults')}>
          <Text onClick={() => surpriseTest1(50)} style={styles.sub_title}>50 Trials</Text>
        </Pressable>
        <Pressable style={styles.surpriseTrialInput75} onPress={() => navigation.navigate('costResults')}>
          <Text onClick={() => surpriseTest1(75)} style={styles.sub_title}>75 Trials</Text>
        </Pressable>
        <Pressable style={styles.surpriseTrialInput100} onPress={() => navigation.navigate('costResults')}>
          <Text onClick={() => surpriseTest1(100)} style={styles.sub_title}>100 Trials</Text>
        </Pressable>
        <Pressable style={styles.surpriseTrialInputUnlimited} onPress={() => navigation.navigate('costResults')}>
          <Text onClick={() => surpriseTest1(100)} style={styles.sub_title}>100+ Trials</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

// Generate all possible combinations
// Initially 25 in total
function allPossibleCombinations(input, length, curstr) {
  if(curstr.length == length) return [ curstr ];
  var ret = [];
  for(var i = 0; i < input.length; i++){
    ret.push.apply(ret, allPossibleCombinations(input, length, curstr + input[i]));
  }
  return ret;
}

var counter = 0;
const SurpriseTrialChoicePage = ({ navigation }) => {
  counter ++;
  var local_v = v;
  var input = [ '1', '2', '3', '4', '5']; // 5 graphs
  var possible_combos = allPossibleCombinations(input, 2, '');
  if (local_v == 2){
    [].push.apply(possible_combos, possible_combos);
  }
  if (local_v == 3){
    [].push.apply(possible_combos, possible_combos);
    [].push.apply(possible_combos, possible_combos);
  }
  if (local_v == 4){
    [].push.apply(possible_combos, possible_combos);
    [].push.apply(possible_combos, possible_combos);
    [].push.apply(possible_combos, possible_combos);
  }

  var random_index = Math.floor(Math.random() * possible_combos.length);
  var random_output = possible_combos[random_index];
  possible_combos.splice(random_index,1);
  return (
    <View>
      <View style ={styles.container}>
        <Text style={styles.sub_title3}>Select "Yes" to either display a reward image of level 2 or a cost image of level 4. Select "No" to continue to next choice.</Text>
        <View style ={styles.imageContainer}>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost&rewardimages/graphs/cost/level' + random_output.split("")[0] + '.png')}/>
          <Image resizeMode='contain'
            style = {{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2}}
            source = {require('./assets/cost&rewardimages/graphs/reward/level' + random_output.split("")[1] + '.png')}/>
        </View>
        <Pressable style={styles.surpriseTrialButtonYes} onPress={() => navigation.push('randomImage')}>
          <Text onClick={() => outputFunction(1, random_output.split("")[0], random_output.split("")[1])} style={styles.text}>Yes</Text>
        </Pressable>
        <Pressable style={styles.surpriseTrialButtonNo} onPress={() => navigation.push('continue')}>
          <Text onClick={() => outputFunction(0, random_output.split("")[0], random_output.split("")[1])} style={styles.text}>No</Text>
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
        <Pressable style={styles.continueButton} onPress={() => navigation.push('costResults')}>
          <Text style={styles.sub_title}>Continue</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const SurpriseOutputNo = ({ navigation }) => {
  return(
    <View>
      <View style ={styles.container}>
        <Pressable style={styles.continueButton} onPress={() => navigation.push('costResults')}>
          <Text style={styles.sub_title}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};












const styles = StyleSheet.create({

  appContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },

  // TEXT

  title: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    top: 280,
    left: 450,
  },
  sub_title3: {
    fontSize: 20,
    color: 'black',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    top: 50,
    left: 250,
  },
  sub_title: {
    fontSize: 20,
    lineHeight: 0,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
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
  container: {
    flex: 1,
    alignItems: 'center',
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
    borderRadius: 200,
    position: 'absolute',
    top: 400,
    right: 600,
    padding: 20
  },
  continueButton: {
    backgroundColor: "black",
    borderRadius: 200,
    position: 'absolute',
    top: 500,
    left: 1200,
    padding: 20
  },
  surpriseTrialButtonYes: {
    backgroundColor: "green",
    borderRadius: 200,
    position: 'absolute',
    top: 500,
    right: 40,
    padding: 30,
  },
  surpriseTrialButtonNo: {
    backgroundColor: "red",
    borderRadius: 200,
    position: 'absolute',
    top: 500,
    left: 40,
    padding: 30,
  },
  surpriseTrialInput25: {
    backgroundColor: "black",
    borderRadius: 200,
    position: 'absolute',
    top: 400,
    right: 900,
    padding: 20
  },
  surpriseTrialInput50: {
    backgroundColor: "black",
    borderRadius: 200,
    position: 'absolute',
    top: 400,
    right: 700,
    padding: 20
  },
  surpriseTrialInput75: {
    backgroundColor: "black",
    borderRadius: 200,
    position: 'absolute',
    top: 400,
    right: 500,
    padding: 20
  },
  surpriseTrialInput100: {
    backgroundColor: "black",
    borderRadius: 200,
    position: 'absolute',
    top: 400,
    right: 300,
    padding: 20
  },
  surpriseTrialInputUnlimited: {
    backgroundColor: "black",
    borderRadius: 200,
    position: 'absolute',
    top: 400,
    right: 100,
    padding: 20
  },
  choiceTrialButton1: {
    backgroundColor: "black",
    borderRadius: 200,
    position: 'absolute',
    top: 600,
    left: 40,
    padding: 30,
  },
  choiceTrialButton2: {
    backgroundColor: "black",
    borderRadius: 200,
    position: 'absolute',
    top: 600,
    right: 40,
    padding: 30,
  },
});

export default MyStack;