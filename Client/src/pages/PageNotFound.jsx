import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className="bg-[#660909] min-h-screen text-[white]">

      <h1 className='mt-20 text-[5vw]'>Page Not Found !!</h1>
      <Link to="/">
        <button className='mt-5 text-[#650808] font-bold bg-[#FFB5B5] text-[1.3rem] w-[150px] h-[45px] rounded-[50px]	'>Home</button>
      </Link>
    </div>
  )
}

export default PageNotFound