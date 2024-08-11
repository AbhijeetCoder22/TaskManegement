import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = ({serverurl}) => {
    const [usrnm,setUsrnm] = useState('')
    const [paswrd,setPaswrd] = useState('')
    const [cnfrm,setCnfrm] = useState('')
    const [result,setResult] = useState('')
    const [link,setLink] = useState('')

    const submitRegister = async (url) => {
        const act_url = `${url}/Register`

        const currentdate = new Date()
        const hours = currentdate.getHours()
        const minutes = currentdate.getMinutes()
        const seconds = currentdate.getSeconds()
        const date = currentdate.getDate()
        const month = currentdate.getMonth() + 1
        const year = currentdate.getFullYear();

        const act_date = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`

        const registerdata = {usrnm,paswrd,cnfrm,act_date} 


        const response = await fetch(act_url,{
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(registerdata)
        }
            )

        const responsedata = await response.json()

        if (responsedata === "Sucesfully Registered!!! " || responsedata === 'User Exist!!! '){
            setResult(responsedata)
            setLink(<Link to='/'>Sign In</Link>)
        }
        else{
            setResult(responsedata)
            setLink('')
        }
    }

  return (
    <div className='Register'>
        <div>
            <div><h1>REGISTER</h1></div>
            <div>{result}{link}</div>
            <div>
                <input
                    type='text'
                    placeholder='Username'
                    value={usrnm}
                    onChange={(e)=>{setUsrnm(e.target.value)}}/>            
            </div>
            <div>
                <input
                    type='text'
                    placeholder='New Password'
                    value={paswrd}
                    onChange={(e)=>{setPaswrd(e.target.value)}}/>
            </div>
            <div>
                <input
                    type='password'
                    placeholder='Confirm New Password'
                    value={cnfrm}
                    onChange={(e)=>{setCnfrm(e.target.value)}}/>
            </div>
            <div>
                <button onClick={()=>{submitRegister(serverurl)}}>Register</button>
            </div>
        </div>
    </div>
  )
}

export default Register