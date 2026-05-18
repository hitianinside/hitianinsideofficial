import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { addCricketScores } from '../../../api/adminapis'

const CricketScores = () => {

  // css style
  const inputDivStyle = "flex flex-col w-[200px] justify-center text-left text-red-100"
  const inputStyle = "rounded-md p-2 my-2 text-white text-md bg-[#b32610]"

  //form submition
  const [cricketScores, setCricketScores] = useState({
    matchType: '',
    team1Name: '',
    team2Name: '',
    team1Logo: null,
    team2Logo: null,
    team1Run: 0,
    team2Run: 0,
    team1OverPlayed: 0,
    team2OverPlayed: 0,
    team1WicketLoss: 0,
    team2WicketLoss: 0,
    completed: "no"
  })

  const [submit, setSubmit] = useState(false);

  const handleAdd = async () => {
    try {
      if (Object.values(cricketScores).some(item => item === '') || cricketScores.team1Logo === null || cricketScores.team2Logo === null) {
        toast.warning("fill the required field");
        return;
      }
      setSubmit(true)
      const res = await addCricketScores(cricketScores);
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
            value={cricketScores.matchType}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...cricketScores, matchType: e.target.value })}
            required
          />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 1 name</label>
          <input type="text"
            className={inputStyle}
            name='team1Name'
            value={cricketScores.team1Name}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...cricketScores, team1Name: e.target.value })}
            required
          />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 2 name</label>
          <input type="text"
            className={inputStyle}
            name='team2Name'
            value={cricketScores.team2Name}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...cricketScores, team2Name: e.target.value })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 1 logo</label>
          <input type="file"
            className={inputStyle}
            name='team1Logo'
            onChange={(e) => setCricketScores({ ...cricketScores, team1Logo: e.target.files[0] })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 2 logo</label>
          <input type="file"
            className={inputStyle}
            name='team2Logo'
            onChange={(e) => setCricketScores({ ...cricketScores, team2Logo: e.target.files[0] })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 1 run</label>
          <input type="number"
            className={inputStyle}
            name='team1Run'
            value={cricketScores.team1Run}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...cricketScores, team1Run: e.target.value })} />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 2 run</label>
          <input type="number"
            className={inputStyle}
            name='team2Run'
            value={cricketScores.team2Run}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...cricketScores, team2Run: e.target.value })} />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 1 over played</label>
          <input type="number"
            className={inputStyle}
            name='team1over'
            value={cricketScores.team1OverPlayed}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...cricketScores, team1OverPlayed: e.target.value })} />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 2 over played</label>
          <input type="number"
            className={inputStyle}
            name='team2Over'
            value={cricketScores.team2OverPlayed}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...cricketScores, team2OverPlayed: e.target.value })} />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 1 wicket loss</label>
          <input type="number"
            className={inputStyle}
            name='team1WicketTaken'
            value={cricketScores.team1WicketLoss}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...cricketScores, team1WicketLoss: e.target.value })} />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 2 wicket loss</label>
          <input type="number"
            className={inputStyle}
            name='team2WicketTaken'
            value={cricketScores.team2WicketLoss}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...cricketScores, team2WicketLoss: e.target.value })} />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Match is completed</label>
          <select
            name="completed"
            className={inputStyle}
            value={cricketScores.completed}
            onChange={(e) => setCricketScores({ ...cricketScores, completed: e.target.value })}>
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

export default CricketScores;