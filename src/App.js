import * as React from 'react';

let thingsToDo = ["Play a game!", "Watch a movie!", 
                  "Read a book!", "Take a walk!"];

const ANIMATION_ITERATION_COUNT = 10;

let animationIterationNumber = 0;



const App = () => {
  return (
    <div>

      <h1>What to Do App</h1>

      <WhatToDo />

      <br/>

    </div> 
  ); 
}

const WhatToDo = () => {
  const initialText = "Click the button to delegate this decision to our program";
  const [currentToDo, setCurrentToDo] = React.useState(initialText);
  const [animationStartStatus, setAnimationStartStatus] = React.useState(false);
  const [whatToDoButtonDisabledStatus, setWhatToDoButtonDisabledStatus] = React.useState(false);
  const [
    removeButtonForListItemDisabledStatus, 
    setRemoveButtonForListItemDisabledStatus
  ] = React.useState(false);

  React.useEffect(() => {
    let intervalId;
    if (animationStartStatus) {
      intervalId = setInterval(() => {
        const animationObject = {
          currentToDo,
          setCurrentToDo,
          setAnimationStartStatus,
          setWhatToDoButtonDisabledStatus,
          setRemoveButtonForListItemDisabledStatus
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
    enableRemoveButtons(setRemoveButtonForListItemDisabledStatus);
  }
  }, [animationStartStatus, currentToDo]);



  return (
    <div>
      <ThingsToDo removeButtonsDisabledStatus={removeButtonForListItemDisabledStatus} animationStatus={animationStartStatus} />
      <p>{currentToDo}</p>
      <button id="whatToDoButton" onClick={() => setAnimationStartStatus(true)} disabled={whatToDoButtonDisabledStatus}>
        What to Do
      </button>
    </div>
  )
}

const ThingsToDo = (props) => {
  const [thingsToDoArray, setThingsToDoArray] = React.useState(thingsToDo);

  const removeThingToDo = (listItemToRemove) => {
    thingsToDo = thingsToDo.filter((item) => {
      return item !== listItemToRemove;
    });
    setThingsToDoArray(thingsToDo);
  }

  return  (
    <div>
      <ol>
        {thingsToDo.map((item) => {
          return (
            <div>
              <li>
                {item + " "}
                <button id="removeButtonForListItem" disabled={props.removeButtonsDisabledStatus} onClick={() => removeThingToDo(item)}>
                  X
                </button>
              </li>
            </div>
          );
        })}
      </ol>
      <br/>
      <NewThingsForm addThingToThingsToDoArray={setThingsToDoArray} animationStatus={props.animationStatus} />
    </div>
  );
}
const NewThingsForm = (props) => {

  const [addNewThingButtonDisabilityStatus, setAddNewThingButtonDisabilityStatus] = React.useState(false);

  const handleSubmit = (event) => {
    const newThingToDo = event.target.newThing.value;
    event.preventDefault();
    thingsToDo.push(newThingToDo);
    props.addThingToThingsToDoArray(newThingToDo);
  }

  React.useEffect(() => {
    if (props.animationStatus) {
      setAddNewThingButtonDisabilityStatus(true);
    } else {
      setAddNewThingButtonDisabilityStatus(false);
    }
  }, [props.animationStatus]);

  return (
    <div>
      <form onSubmit={handleSubmit}>  
        <input type="text" name="newThing" placeholder="ToDo" />
        <input type="submit" id="addNewThingButton" value="Add to list" disabled={addNewThingButtonDisabilityStatus}/>
      </form>
    </div>
  )
}


const disableWhatToDoButton = (setWhatToDoButtonDisabledStatus) => {
  setWhatToDoButtonDisabledStatus(true);
}


const enableWhatToDoButton = (setWhatToDoButtonDisabledStatus) => {
  setWhatToDoButtonDisabledStatus(false);
}


const disableRemoveButtons = (setRemoveButtonForListItemDisabledStatus) => {
  setRemoveButtonForListItemDisabledStatus(true);
}


const enableRemoveButtons = (setRemoveButtonForListItemDisabledStatus) => {
  setRemoveButtonForListItemDisabledStatus(false);
}


const startAnimation = (animationObject) => {
  disableRemoveButtons(animationObject.setRemoveButtonForListItemDisabledStatus);
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