import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar'
import News from './components/News';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

const App =()=> {
  const [progress, setProgress] = useState(0);
    return (
      <div>
       <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
        />
        <Routes>
          <Route exact path="/" element = {<News setProgress ={setProgress}/>}/>
          <Route exact path="/technology" element = {<News setProgress ={setProgress} category = "technology" key = "technology" />}/>
          <Route exact path="/sports" element = {<News setProgress ={setProgress} category = "sports" key = "sports" />}/>
          <Route exact path="/science" element = {<News setProgress ={setProgress} category = "science" key = "science" />}/>
          <Route exact path="/health" element = {<News setProgress ={setProgress} category = "health" key = "health" />}/>
          <Route exact path="/entertainment" element = {<News setProgress ={setProgress} category = "entertainment" key = "entertainment" />}/>
          <Route exact path="/business" element = {<News setProgress ={setProgress} category = "business" key = "business" />}/>
          <Route exact path="/general" element = {<News setProgress ={setProgress} category = "general" key = "general" />}/>
        </Routes>
       </Router>
      </div>
    )
}

export default App;