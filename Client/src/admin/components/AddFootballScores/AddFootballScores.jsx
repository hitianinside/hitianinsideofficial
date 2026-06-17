import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { addFootballScores } from '../../../api/adminapis'


const FootballScores = () => {

  // css style
  const inputDivStyle = "flex flex-col w-[200px] justify-center text-left text-red-100"
  const inputStyle = "rounded-md p-2 my-2 text-white text-md bg-[#b32610]"


  const [footballScores, setFootballScores] = useState({
    matchType: '',
    team1Name: '',
    team2Name: '',
    team1Logo: null,
    team2Logo: null,
    team1Goals: 0,
    team2Goals: 0,
    completed: "no"
  })

  const [submit, setSubmit] = useState(false);

  //add cricket scores
  const handleAdd = async () => {
    try {
      if (Object.values(footballScores).some(item => item === '') || footballScores.team1Logo === null || footballScores.team2Logo === null) {
        toast.warning("fill the required field");
        return;
      }
      setSubmit(true)
      const res = await addFootballScores(footballScores);
      toast.success(res.data.message);
    } catch (error) {
      toast.error("server error ! try again later");
    } finally {
      setSubmit(false);
    }
  }

  return (
    <>
      <div className='flex flex-wrap gap-5 justify-center'>
        <div className={inputDivStyle}>
          <label htmlFor="matchType">Match Type (eg - Final)</label>
          <input type="text"
            className={inputStyle}
            name='matchType'
            value={footballScores.matchType}
            placeholder='Enter here'
            onChange={(e) => setFootballScores({ ...footballScores, matchType: e.target.value })}
            required />
        </div>


        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 1 name</label>
          <input type="text"
            className={inputStyle}
            name='team1Name'
            value={footballScores.team1Name}
            placeholder='Enter here'
            onChange={(e) => setFootballScores({ ...footballScores, team1Name: e.target.value })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 2 name</label>
          <input type="text"
            className={inputStyle}
            name='team2Name'
            value={footballScores.team2Name}
            placeholder='Enter here'
            onChange={(e) => setFootballScores({ ...footballScores, team2Name: e.target.value })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 1 logo</label>
          <input type="file"
            className={inputStyle}
            name='team1Logo'
            onChange={(e) => setFootballScores({ ...footballScores, team1Logo: e.target.files[0] })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 2 logo</label>
          <input type="file"
            className={inputStyle}
            name='team2Logo'
            onChange={(e) => setFootballScores({ ...footballScores, team2Logo: e.target.files[0] })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 1 Goals</label>
          <input type="number"
            className={inputStyle}
            name='team1Goals'
            value={footballScores.team1Goals}
            placeholder='Enter here'
            onChange={(e) => setFootballScores({ ...footballScores, team1Goals: e.target.value })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 2 Goals</label>
          <input type="number"
            className={inputStyle}
            name='team2Goals'
            value={footballScores.team2Goals}
            placeholder='Enter here'
            onChange={(e) => setFootballScores({ ...footballScores, team2Goals: e.target.value })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Match is completed</label>
          <select
            name="completed"
            className={inputStyle}
            value={footballScores.completed}
            onChange={(e) => setFootballScores({ ...footballScores, completed: e.target.value })}>
            <option value="no">no</option>
            <option value="yes">yes</option>
          </select>
        </div>
      </div>
      <div className="text-red-200 w-full font-medium">
        <button className='p-2 bg-[#be2525] hover:bg-red-800 rounded-lg w-40' onClick={handleAdd} disabled={submit}>{submit ? "Adding" : "Add"}</button>
      </div>
    </>
  )
}

export default FootballScores;
