import * as React from 'react';

let thingsToDo = ["Play a game!", "Watch a movie!", 
                  "Read a book!", "Take a walk!"];

const ANIMATION_ITERATION_COUNT = 10;

let animationIterationNumber = 0;


const App = () => {
  return (
    <div>

      <h1>What to Do App</h1>

      <ThingsToDo />

      <WhatToDo />

    </div> 
  ); 
}

const WhatToDo = () => {
  const initialText = "Click the button to delegate this decision to our program";
  const [currentToDo, setCurrentToDo] = React.useState(initialText);
  const [animationStartStatus, setAnimationStartStatus] = React.useState(false);
  const [whatToDoButtonDisabledStatus, setWhatToDoButtonDisabledStatus] = React.useState(false);

  React.useEffect(() => {
    let intervalId;
    if (animationStartStatus) {
      intervalId = setInterval(() => {
        const animationObject = {
          currentToDo,
          setCurrentToDo,
          setAnimationStartStatus,
          setWhatToDoButtonDisabledStatus
        }
        startAnimation(animationObject);
      }, 1000);
    return () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    }     
  } else {
    enableWhatToDoButton(setWhatToDoButtonDisabledStatus);
  }
  }, [animationStartStatus, currentToDo]);

  return (
    <div>
      <p>{currentToDo}</p>
      <button id="whatToDoButton" onClick={() => setAnimationStartStatus(true)} disabled={whatToDoButtonDisabledStatus}>
        What to Do
      </button>
    </div>
  )
}

const ThingsToDo = () => (
  <ol>
    {thingsToDo.map((item) => {
      return <li>{item}</li>;
    })}
  </ol>
)

const disableWhatToDoButton = (setWhatToDoButtonDisabledStatus) => {
  setWhatToDoButtonDisabledStatus(true);
}


const enableWhatToDoButton = (setWhatToDoButtonDisabledStatus) => {
  setWhatToDoButtonDisabledStatus(false);
}

const startAnimation = (animationObject) => {
  disableWhatToDoButton(animationObject.setWhatToDoButtonDisabledStatus);
  const {currentToDo, setCurrentToDo, setAnimationStartStatus} = animationObject;
  animationIterationNumber++;
  if (animationIterationNumber === ANIMATION_ITERATION_COUNT) {
    stopAnimation(setAnimationStartStatus);
  }
  setNextWhatToDo(currentToDo, setCurrentToDo);
}


const setNextWhatToDo = (currentToDo, setCurrentToDo) => {
  const toDo = getNextNonrepetitiveToDo(currentToDo);
  setCurrentToDo(toDo);
}


const stopAnimation = (setAnimationStartStatus) => {
  animationIterationNumber = 0;
  setAnimationStartStatus(false);
}


const getNextNonrepetitiveToDo = (currentToDo) => {
  const randomNumber = Math.floor(Math.random() * thingsToDo.length);
  let nextToDo = thingsToDo[randomNumber];
  if (currentToDo === nextToDo) {
    nextToDo = thingsToDo[(randomNumber + 1) % thingsToDo.length];
  }
  return nextToDo;
}


export default App;
