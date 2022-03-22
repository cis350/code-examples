import { React, useState, useRef } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';

// image style
const styles = StyleSheet.create({
    img: {
        width: 90,
        height:90,
    }

});

// retrieve the props
// pros are in the params attribute of the route
function Questions({ route, navigation }){   //questionslist, player
 // retrieve the props
 let { questionslist, player, points } = route.params;

    const [counter, setCounter] = useState(0);
    let answer = useRef('');
    let score = useRef(points);
    // pick a question
    const question = questionslist[Math.floor(Math.random() * 10) % 2];

   

// test correctness move to te next question
    function handleSubmit(e){
        if(answer.current === question.correct){
            console.log('1');
            score.current = score.current +1;
        }
        setCounter(counter +1);
        //navigate to the next question
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

                <Text>Your answer:</Text>
                <Button
                title={question.option1}
                onPress={() => answer.current = question.option1}
                />
                <Button
                title={question.option2}
                onPress={() => answer.current = question.option2}
                />
                <Button
                title={question.option3}
                onPress={() => answer.current = question.option3}
                />
                <Button
                title={question.option4}
                onPress={() => answer.current = question.option4}
                />              
                <Button 
                title='Submit' 
                onPress={handleSubmit}/>
        
</View>

    );


}
export default Questions;
