import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteFootballScores, editFootballScores, getAdminFootballScores } from '../../../api/adminapis';
import { handleChangeFootballScores } from '../../../actions/actions';

const FootballPanel = () => {

  const [originalScores, setOriginalScores] = useState([]);
  const [footballScores, setFootballScores] = useState([]);
  const [loading, setLoading] = useState(true);

  //get the football scores
  useEffect(() => {
    const printScorecard = async () => {
      const result = await getAdminFootballScores();
      setFootballScores(result.data.data);
      setOriginalScores(result.data.data);
      setLoading(false);
    }

    printScorecard();
  }, [])

  //delete the football scores
  const handleDelete = async (id) => {
    try {
      const result = await deleteFootballScores(id);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  //changes saved in database
  const handleChange = async (index, id) => {
    try {
      const data = footballScores[index];
      if (data === originalScores[index]) {
        toast.warning("first make changes then apply");
        return;
      }

      const res = await editFootballScores(id, {
        matchType: data.match_type,
        team1Goals: data.team1_details.team_goals,
        team2Goals: data.team2_details.team_goals,
        completed: data.completed
      });

      toast.success(res.data.message);

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    loading ? <h2 className='w-full text-2xl text-[#ffb5b5] text-left px-3 font-semibold'>Loading...</h2> :
      <>
        <div className='w-full text-xl text-[#ffb5b5] text-left  px-3 font-semibold'>Matches</div>

        {/* map all matches */}
        <div className='mx-6 flex flex-wrap gap-5'>
          {
            (footballScores.length > 0) && footballScores.map((score, index) => (
              <div className="w-auto sm:w-[350px] bg-white/10 text-white rounded-xl shadow-md p-2 my-2" key={index}>
                <h2>{score.match_type}</h2>
                <div className="flex justify-between items-center border-b border-gray-400 pb-2 mb-2">
                  {/* team 1 information */}
                  <div className="flex flex-col">
                    <div className='grid grid-cols-2 items-center p-1'>
                      <img src={score.team1_details.team_logo} alt={score.team1_details.team_name}
                        className='w-12 rounded-full' />
                      <span className="font-bold text-lg">{score.team1_details.team_name}</span>
                    </div>
                    <span className="text-sm">Goals:
                      <input
                        type="number"
                        value={score.team1_details.team_goals}
                        onChange={(e) => handleChangeFootballScores(footballScores, setFootballScores, e, index, "team1Goals")}
                        className="text-sm w-12 bg-[#6b0909] p-1" /></span>
                  </div>

                  <div className="text-center text-lg text-gray-300">vs</div>

                  {/* team 2 information */}
                  <div className="flex flex-col">
                    <div className='grid grid-cols-2 items-center p-1'>
                      <span className="font-bold text-lg">{score.team2_details.team_name}</span>
                      <img src={score.team2_details.team_logo} alt={score.team2_details.team_name}
                        className='w-12 rounded-full' />
                    </div>
                    <span className="text-sm">Goals:
                      <input
                        type="number"
                        value={score.team2_details.team_goals}
                        onChange={(e) => handleChangeFootballScores(footballScores, setFootballScores, e, index, "team2Goals")}
                        className="text-sm w-12 bg-[#6b0909] p-1" />
                    </span>
                  </div>
                </div>

                {/* match complete status */}
                <div>
                  <label htmlFor="completed">Match complete - </label>
                  <input
                    type='text'
                    value={score.completed}
                    onChange={(e) => handleChangeFootballScores(footballScores, setFootballScores, e, index, "complete")}
                    className="text-sm w-10 bg-[#6b0909] p-1"
                  />
                </div>

                <div className="w-full flex justify-between text-white mt-3">
                  <button
                    className='bg-[#bb1d1d] hover:bg-[#e01414] p-2 rounded-lg font-medium'
                    onClick={() => handleChange(index, score._id)}>Make Changes</button>
                  <button
                    className='bg-[#bb1d1d] hover:bg-[#e01414] p-2 rounded-lg font-medium'
                    onClick={() => handleDelete(score._id)}>Delete</button>
                </div>
              </div>
            ))
          }
          {
            (footballScores.length === 0) && <p className='text-sm text-[#ffb5b5]'>Currently no matches</p>
          }
        </div >
      </>
  )
}

export default FootballPanel;