import Header from './components/Header.js'
import Footer from './components/Footer.js'
import Workspace from './components/Workspace.js'
import Judge from './components/Judge.js'
import Participant from './components/Participant.js'
import { useState } from 'react'
import { useEffect } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
function App() {
  const [name, setName] = useState("Score-Keeper")
  const [participantCnt, setParticipantCount] = useState(null);
  const [token, setToken] = useState(null);
  const [participantScores, setParticipantScores] = useState([
    {
      "sn":0,
      "name": "test subject",
      "score": 0
    }
  ])
  useEffect(() => {
    let new_arr = []
    for (let i = 1; i <= participantCnt; i++) {
      new_arr.push({
        "sn":i,
        "name": "participant " + i,
        "score": 0
      });
    }
    setParticipantScores([...new_arr])
  }, [participantCnt]);
  return (
    <Router>
      <div className="flex flex-col justify-between bg-gray-100">
        <Header contest_name={name} />
        <Routes>
          <Route exact path='/' element={
              <Workspace
                set_name={setName}
                name={name}
                token={token}
                set_token={setToken}
                part_count={participantCnt}
                set_part_count={setParticipantCount}
              />
          }></Route>
          <Route path='/Judge' element={
            <Judge
              part_scores = {participantScores}
              set_score = {setParticipantScores}
            />
          }></Route>
          <Route path='/Participant' element = {
            <Participant
              part_scores = {participantScores}
            />
          }></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
