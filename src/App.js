import * as React from 'react';

let thingsToDo = ["Play a game!", "Watch a movie!", 
                  "Read a book!", "Take a walk!"];

const ANIMATION_ITERATION_COUNT = 10;

let animationIterationNumber = 0;
const App = () => {
  const initialText = "Click the button to delegate this decision to our program";
  const [currentToDo, setCurrentToDo] = React.useState(initialText);
  const [animationStartStatus, setAnimationStartStatus] = React.useState(false);
  React.useEffect(() => {
    if (animationStartStatus) {
      const intervalId = setInterval(() => {
        const animationObject = {
          intervalId: intervalId,
          currentToDo: currentToDo,
          setCurrentToDo: setCurrentToDo,
          setAnimationStartStatus: setAnimationStartStatus
        }
        startAnimation(animationObject);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  });

  return (
    <div>
      <h1>What to Do App</h1>

      <ol>
        {thingsToDo.map((item) => {
            return <li>{item}</li>;

        })}
      </ol>

      <p>{currentToDo}</p>
      <button id="whatToDoButton" onClick={() => setAnimationStartStatus(true)}>What to Do</button>
    </div> 
  ); 
}

const startAnimation = (animationObject) => {
  animationIterationNumber++;
  if (animationIterationNumber === ANIMATION_ITERATION_COUNT) {
    stopAnimation(animationObject.setAnimationStartStatus, animationObject.intervalId);
  }
  const toDo = getNextNonrepetitiveToDo(animationObject.currentToDo);
  animationObject.setCurrentToDo(toDo);
}

const stopAnimation = (setAnimationStartStatus, intervalId) => {
  animationIterationNumber = 0;
  setAnimationStartStatus(false);
  clearInterval(intervalId);
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
