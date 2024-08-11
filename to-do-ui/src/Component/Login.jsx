import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';



const Login = ({serverurl}) => {
    const [usrname,setUsrname] = useState('');
    const [password,setPassword] = useState('');
    sessionStorage.setItem('login','false')
    const [result,setResult] = useState('')

 
    const navigate = useNavigate();
    const serverUrl= serverurl;

    const submitcred = async (url) => {
        const act_url = `${url}/`
        const login_cred = {usrname,password}
        const response = await fetch(act_url,{
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body:JSON.stringify(login_cred)
        })
        const responsedata = await response.json();

        if (responsedata === 'Success'){
            sessionStorage.setItem('login','true')
            sessionStorage.setItem('username',usrname)
            navigate('/Home')
        }
        else{
            setResult(responsedata)
            navigate('/')
            sessionStorage.setItem('login','false')
            sessionStorage.setItem('username','')
        }
    }

  return (
    <div className='Login'>
        <div>
            <div>
            <div>LOGIN</div>
                <div>{result}</div>
                <div>
                    <div>
                        <input 
                            type='text'
                            placeholder='Username'
                            value={usrname}
                            onChange={(e)=>{setUsrname(e.target.value)}}
                        />
                    </div>
                    <div>
                        <input 
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                    </div>
                    <div>
                        <div>
                        <button onClick={()=>(submitcred(serverUrl))}>Login</button>
                        </div>
                    </div>
                    <div>
                        Don't have an account ?
                        <Link to='/Register'>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


export default Login