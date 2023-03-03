let thingsToDo = ["Play a game!", "Watch a movie!", 
                  "Read a book!", "Take a walk!"];

function App() {
  return (
    <div>
        <h1>What to Do App</h1>

        <ol>
          {thingsToDo.map((item) => {

              return <li>{item}</li>;

          })}
        </ol>
        
    </div>
  );
}

export default App;
