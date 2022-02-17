import { React, useState } from 'react';

function Questions({ questionslist }){
    const [ counter, setCounter] = useState(0);
    // pick a question
    const question = questionslist[Math.floor(Math.random() * 10) % 2];
function handleSubmit(e){
e.preventDefault();
setCounter(counter +1);
}
    return (
        <div>
            <img src={question.img} alt="hello" width="100" height="100" />
            <form>
                <p>Your answer</p>
                <div>
                    <label>
                        {question.option1}
                        <input
                        type="radio"
                        id="ans1"
                        name="ans"
                        value={question.option1}
                        />
                        </label>

                        <label>
                        {question.option2}
                        <input
                        type="radio"
                        id="ans2"
                        name="ans"
                        value={question.option2}
                        />
                        </label>
                        <label>
                        {question.option3}
                        <input
                        type="radio"
                        id="ans3"
                        name="ans"
                        value={question.option3}
                        />
                        </label>
                        <label>
                        {question.option4}
                        <input
                        type="radio"
                        id="ans4"
                        name="ans"
                        value={question.option4}
                        />
                        </label>
                </div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
 

            </form>
        </div>


    );


}
export default Questions;