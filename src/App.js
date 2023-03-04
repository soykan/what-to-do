import * as React from 'react';

let thingsToDo = ["Play a game!", "Watch a movie!", 
                  "Read a book!", "Take a walk!"];

let animationIterateIndex = 0;

const ANIMATION_ITERATION_COUNT = 10;

const App = () => {
  const initialText = "Click the button to delegate this decision to our program";
  const [currentToDo, setCurrentToDo] = React.useState(initialText);
  return (
    <div>
      <h1>What to Do App</h1>

      <ol>
        {thingsToDo.map((item) => {

            return <li>{item}</li>;

        })}
      </ol>

      <p>{currentToDo}</p>
      <button id="whatToDoButton" onClick={() => handleWhatToDoButtonOnClickEvent(currentToDo, setCurrentToDo)}>What to Do</button>
    </div> 
  ); 
}

const handleWhatToDoButtonOnClickEvent = (currentToDo, setCurrentToDo) => {
  startAnimation(currentToDo, setCurrentToDo);
}


const startAnimation = (currentToDo, setCurrentToDo) => {
  setTimeout(() => {
    increaseIterationNumberByOne();
    if (isIterationCompleted === true) {
      return;
    }
    const nextToDo = getNextNonrepetitiveToDo(currentToDo);
    setCurrentToDo(nextToDo);
    startAnimation(currentToDo, setCurrentToDo);
  }, 1000);
}

const increaseIterationNumberByOne = () => {
  animationIterateIndex++;
}


const isIterationCompleted = () => {
  if (animationIterateIndex === ANIMATION_ITERATION_COUNT) {
    return true;
  }
  return false;
}


const getNextNonrepetitiveToDo = (currentToDo) => {
  let nextToDo = thingsToDo[animationIterateIndex % thingsToDo.length];
  if (currentToDo === nextToDo) {
    nextToDo = thingsToDo[(animationIterateIndex + 1) % thingsToDo.length];
  }
  return nextToDo;
}

export default App;
