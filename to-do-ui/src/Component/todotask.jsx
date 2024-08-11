import React from 'react'
import Card from './card'

const todotask = ({title,description,id,serverurl,setRefresh_api}) => {

    const deletetsk = async (ind,serverurl)=>{
        const url = `${serverurl}/deletetask`

        const response = await fetch(url,{
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body:JSON.stringify(ind)
        })
        const responsedata = await response.json();
        console.log(responsedata)
        if (responsedata === "Deleted"){
            setRefresh_api(sessionStorage.getItem("Refresh")+1)
            sessionStorage.setItem("Refresh",sessionStorage.getItem("Refresh")+1)
        }
    }



  return (
    <div className='todotask'>
        <h1 className='tskttle'>Task List</h1>
        {
            title.map((item,index)=>( 
                <Card 
                title={item} 
                description={description[index]} 
                id={id[index]}
                deletetask = {deletetsk}
                serverurl={serverurl}
                key={id[index]}/>
            ))
        }
    </div>
  )
}

export default todotask