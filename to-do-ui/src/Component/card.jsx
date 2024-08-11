import React from 'react'
import { MdDelete } from "react-icons/md";

const card = ({title,description,id,deletetask,serverurl}) => {


  return (
    <div className='Card' >
      <div>
      <span className='title'>
            {title}
        </span>
        <p className='description'>
            {description}
        </p>
      </div>

        <div>
          <div>
            <button className='deletebtn' onClick={()=>(deletetask(id,serverurl))}><MdDelete/></button>
          </div>
        </div>
    </div>
  )
}

export default card