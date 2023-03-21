import { React, useState, useRef } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';

// style
const styles = StyleSheet.create({
    img: {
        width: '100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        position: 'relative',
        width: "30%", 
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },


});

// separator
const Separator = () => <View style={styles.separator} />;

// retrieve the props
// pros are in the params attribute of the route
function Questions({ route, navigation }){   //questionslist, player
 // retrieve the props
 let { questionslist, player, points } = route.params;

    const [counter, setCounter] = useState(0);



    let score = useRef(points);
    // pick a question
    const question = questionslist[Math.floor(Math.random() * 10) % 4];

   

// test correctness move to the next question
// update score
    function handleSubmit(option){
        if(option === question.correct){
            score.current = score.current +1;
        }
        setCounter(counter +1);
        //navigate to the next question on the same screen
        navigation.push('Questions',{
            questionslist: questionslist,
            player: player,
            points: score.current,
        })
    }


    return (
        <View>
            <View>
                <Text>{player}: {score.current}/10</Text>
            </View>
        
            <Image source={{uri: question.img}} 
            style={styles.img} 
            />
            
            <Separator />
            <View style={styles.container}>
                <Button style={styles.btn} 
                title={question.option1}
                onPress={() => handleSubmit(question.option1)}
                />
            </View>
            <Separator />
            <View style={styles.container}>
                <Button
                title={question.option2}
                onPress={() => handleSubmit(question.option2)}
                />
            </View>
            <Separator />
            <View style={styles.container}>
                <Button
                title={question.option3}
                onPress={() => handleSubmit(question.option3)}
                />
            </View>
            <Separator />
            <View style={styles.container}>
                <Button
                title={question.option4}
                onPress={() => handleSubmit(question.option4)}
                /> 
            </View>  
            <Separator />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Separator />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
);


}
export default Questions;
