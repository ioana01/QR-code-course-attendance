import "./App.css";
import Subject from "./SubjectPage/Subject.js";
import Form from "./SubjectPage/Form.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Subject} />
        {/* <Route path="/" exact component={Form} /> */}
      </Switch>
    </Router>
  );
}

export default App;
