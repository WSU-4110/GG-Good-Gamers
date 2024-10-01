import "./App.css";
import logo from './gg.png';  // Make sure the path to the logo is correct

function App() {
  return (
    <div className="App">
      <h1>Welcome to GG-Good Gamers Team!</h1>
      <img src={logo} alt="Logo" width="200" />
      <p>This is the ultimate platform for gamers to connect and compete.</p>
      <button onClick={() => alert("Button clicked!")}>Click Me</button>
    </div>
  );
}

export default App;
