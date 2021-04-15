import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import VideoUpload from './VideoUpload';

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <Switch>
        <Route path="/upload" component={VideoUpload} />
      </Switch>
    </div>
  </Router>
);

export default App;
