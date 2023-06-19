import Header from './components/Header.js'
import Footer from './components/Footer.js'
import Workspace from './components/Workspace.js'
import Judge from './components/Judge.js'
import Participant from './components/Participant.js'
import Login from './components/Login.js'
import UserInfo from './components/UserInfo.js'
import SignUp from './components/SignUp.js'
import { useState } from 'react'
import { useEffect } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
function App() {
  const baseUrl = 'https://score-keeper-by-jinish.onrender.com/'
  const [userName, setUserName] = useState("User")
  const [emailId, setEmailId] = useState("example@gmail.com")
  const [name, setName] = useState("Score-Keeper")
  const [participantCnt, setParticipantCount] = useState(null);
  const [token, setToken] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('auth-token'))
  const [participantScores, setParticipantScores] = useState([
    {
      "sn": 0,
      "name": "test subject",
      "score": 0
    }
  ])
  // const goToLogin = ()=>{
  //   console.log(baseUrl)
  //   console.log(window.location.href)
  //   console.log(baseUrl+'Login')
  //   if((authToken === null || authToken === 'null') && (window.location.href === baseUrl || window.location.href === 'http://localhost:3000/')) {
  //     window.location.href = '/Login'
  //   }
  // }
  const getUserId = async ()=>{
    await setAuthToken(await localStorage.getItem('auth-token'))
    console.log(authToken)
    if(authToken !== 'null' && authToken !== null) {
      console.log(typeof(authToken))
      console.log(authToken)
      console.log("authToken not null")
      let url = baseUrl+'api/auth/getUser';
      let header = {
        'Content-Type': 'application/json',
        'auth-token':authToken
      }
      let res = await fetch(url, {
        method: 'get',
        headers: header
      })
      if(res.ok) {
        let json_ = await res.json();
        console.log(json_)
        setUserName(json_.user_name)
        setEmailId(json_.email)
      }
    } else {
      setUserName('User')
      setEmailId('example@gmail.com')
    }
  }
  useEffect(()=>{
    getUserId()
  }, [])
  useEffect(() => {
    let new_arr = []
    for (let i = 1; i <= participantCnt; i++) {
      new_arr.push({
        "sn": i,
        "name": "participant " + i,
        "score": 0
      });
    }
    setParticipantScores([...new_arr])
  }, [participantCnt]);
  return (
    <Router>
      <div className="flex flex-col justify-between bg-gray-100">
        <Header contest_name={name} user_name={userName} token={authToken} />
        <Routes>
          <Route exact path='/' element={
            (authToken === null || authToken === 'null')?(<Login baseUrl={baseUrl} set_user_name={setUserName} set_token={setToken}></Login>):
            (<Workspace
              set_name={setName}
              name={name}
              token={token}
              set_token={setToken}
              part_count={participantCnt}
              set_part_count={setParticipantCount}
            />)
          }></Route>
          <Route path='/Login' element={
            <Login baseUrl={baseUrl} set_user_name={setUserName} set_token={setToken}></Login>
          }>
          </Route>
          <Route path='/UserInfo' element={
            <UserInfo name={userName} email={emailId}></UserInfo>
          }>
          </Route>
          <Route path='/SignUp' element={
            <SignUp setUserName={setUserName} baseUrl={baseUrl}></SignUp>
          }></Route>
          <Route path='/Judge' element={
            <Judge
              part_scores={participantScores}
              set_score={setParticipantScores}
            />
          }></Route>
          <Route path='/Participant' element={
            <Participant
              part_scores={participantScores}
            />
          }></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
