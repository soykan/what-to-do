import * as React from 'react';

let thingsToDo = ["Play a game!", "Watch a movie!", 
                  "Read a book!", "Take a walk!"];

let i = 0;
const App = () => {
  const initialText = "Click the button to delegate this decision to our program";
  const [currentToDo, setCurrentToDo] = React.useState(initialText);
  const [animationStartStatus, setAnimationStartStatus] = React.useState(false);
  React.useEffect(() => {
    if (animationStartStatus) {
      const intervalId = setInterval(() => {
        i++;
        if (i === 10) {
          i = 0;
          
          setAnimationStartStatus(false);
          clearInterval(intervalId);
        }
        const toDo = getNextNonrepetitiveToDo(currentToDo);
        setCurrentToDo(toDo);
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

const getNextNonrepetitiveToDo = (currentToDo) => {
  const randomNumber = Math.floor(Math.random() * thingsToDo.length);
  let nextToDo = thingsToDo[randomNumber];
  if (currentToDo === nextToDo) {
    nextToDo = thingsToDo[(randomNumber + 1) % thingsToDo.length];
  }
  return nextToDo;
}


export default App;
