import React, { useState } from 'react'
import { addEvent } from '../../../api/adminapis'
import { toast } from 'react-toastify'

const AddEvent = () => {

  const inputDivStyle = "w-auto flex flex-col justify-center text-left text-sm"

  const inputStyle = "rounded-md p-2 my-2 text-white text-md bg-[#b32610]"

  const [event, setEvent] = useState({
    instaURL: '',
    eventName: '',
    year: '',
    date: ''
  })

  const [submit, setSubmit] = useState(false);

  const handleAdd = async () => {
    try {
      //When input field is empty
      if (Object.values(event).some(item => item === '')) {
        toast.warning("Fill the required inputs");
        return;
      }

      setSubmit(true)
      const result = await addEvent(event);
      toast.success(result.data.message);
    } catch (error) {
      toast.error("server error ! try again later");
    } finally {
      setSubmit(false);
    }
  }

  return (
    <>
      <div className='grid grid-cols-2 justify-center gap-6 items-center py-6 my-3'>
        <div className={inputDivStyle}>
          <label htmlFor="instaURL" className='text-white'>Instagram event URL</label>
          <input type="text"
            className={inputStyle}
            name='instaURL'
            value={event.instaURL}
            placeholder='enter instagram URL' onChange={(e) => setEvent({ ...event, instaURL: e.target.value })}
            required />
        </div>
        <div className={inputDivStyle}>
          <label htmlFor="instaURL" className='text-white'>Event Name</label>
          <input type="text"
            className={inputStyle}
            name='eventName'
            value={event.eventName}
            placeholder='enter event name'
            onChange={(e) => setEvent({ ...event, eventName: e.target.value })}
            required />
        </div>
        <div className={inputDivStyle}>
          <label htmlFor="instaURL" className='text-white'>Event year</label>
          <input type="text"
            className={inputStyle}
            name='year'
            value={event.year}
            placeholder='enter year of event'
            onChange={(e) => setEvent({ ...event, year: e.target.value })}
            required />
        </div>
        <div className={inputDivStyle}>
          <label htmlFor="instaURL" className='text-white'>Event date</label>
          <input type="text"
            className={inputStyle}
            name='date'
            value={event.date}
            placeholder='enter date of event'
            onChange={(e) => setEvent({ ...event, date: e.target.value })}
            required />
        </div>
      </div>
      <div>
        <button className='my-2 py-2 px-4 bg-[#be2525] hover:bg-red-800 rounded-lg inline-flex text-white' onClick={handleAdd} disabled={submit}>{submit ? "Adding Event" : "Add Event"}</button>
      </div>
    </>
  )
}

export default AddEvent