import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import Join from './component/join/Join';
import Chat from './component/chat/Chat';





function App() {



  return (
    <div className="App">
     <Router>
     <Route exact path="/" component={Join} />

       <Route path="/chat" component={Chat} />
     </Router>
      </div>
  );
}

export default App;
