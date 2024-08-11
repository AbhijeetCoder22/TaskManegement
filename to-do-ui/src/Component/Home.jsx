import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Todotask from './todotask'

const Home = ({serverurl}) => {
  const [title,setTitle] = useState('')
  const [Description,setDescription] = useState('')
  const [responsedata,setResposedata] = useState('')
  const [refresh_api,setRefresh_api] = useState(0)
  sessionStorage.setItem("Reresh",0)
  let [taskid,setTaskid] = useState([])
  let [tasktitle,setTasktitle] = useState([])
  let [taskdescription,setTaskdescription] = useState([])

  const signout = ()=>{
    sessionStorage.setItem('login','false')
    sessionStorage.setItem('username','')
    sessionStorage.setItem('Refresh',0)
  }

  const submit = async (url)=>{
    const act_url = `${url}/Homeinput`
    const user = sessionStorage.getItem('username')
    const actual_data = {title,Description,user} 

    const response = await fetch (act_url,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(actual_data)
    })

    const url_responsedata = await response.json()
    setRefresh_api(sessionStorage.getItem("Refresh")+1)
    sessionStorage.setItem("Refresh",sessionStorage.getItem("Refresh")+1)
    setResposedata(url_responsedata)
    setTitle("")
    setDescription("")
  }

  useEffect(()=>{

    const get_url = 'http://127.0.0.1:5000'
    const get_data_url = `${get_url}/Homeoutput`
    const get_data = async ()=>{
        const response = await fetch(get_data_url,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(sessionStorage.getItem('username'))
        })
        const responsedata = await response.json()
        setTasktitle([...responsedata.title])
        setTaskdescription([...responsedata.description])
        setTaskid([...responsedata.id])
    }
    get_data()
  },[refresh_api])



  return (
    <div className='Home'>
        <div>
          <div>
          Hi , {sessionStorage.getItem('username')}
          </div>
         <div>
         <div>
          Wanna Log Out? 
          <Link to='/' onClick={signout}>Log Out</Link>
        </div>
         </div>
        </div>

      <div className='inputdata'>
        <div>{responsedata}</div>
        <div>
          <input
           type='text'
          placeholder='Enter Title:'
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}
        />
      </div>
      <div>
        <input
        type='text'
        placeholder='Enter Description:'
        value={Description}
        onChange={(e)=>{setDescription(e.target.value)}}
        />
      </div>  
      <div>
        <button className="submitbtn" onClick={()=>{submit(serverurl)}}>Submit</button>
      </div>
      </div> 
      <div className='todotaskshow'>  
        <Todotask 
        title={tasktitle}
        description={taskdescription}
        id={taskid}
        serverurl={serverurl}
        setRefresh_api ={setRefresh_api}/> 
      </div>
    </div>
  )
}

export default Home