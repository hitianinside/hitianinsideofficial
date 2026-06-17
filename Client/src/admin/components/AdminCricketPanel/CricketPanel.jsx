import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { handleChangeCricketScores } from '../../../actions/actions';
import { getAdminCricketScores } from '../../../api/adminapis';
import { deleteCricketScores } from '../../../api/adminapis';
import { editCricketScores } from '../../../api/adminapis';
import CricketScore from './CricketScore';

const CricketPanel = () => {

  const [originalScores, setOriginalScores] = useState([]);
  const [cricketScores, setCricketScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const printScorecard = async () => {
    const result = await getAdminCricketScores();
    setCricketScores(result.data.data);
    setOriginalScores(result.data.data);
    setLoading(false);
  }

  //get the cricket scores
  useEffect(() => {
    printScorecard();
  }, [])

  //delete the cricket scores
  const handleDelete = async (id) => {
    try {
      const result = await deleteCricketScores(id);
      printScorecard();
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  //changes saved in database
  const handleChange = async (index, id) => {
    try {
      const data = cricketScores[index];
      if (data === originalScores[index]) {
        toast.warning("first make changes then apply");
        return;
      }

      const res = await editCricketScores(id, {
        matchType: data.match_type,

        team1Run: data.team1_details.team_run,
        team2Run: data.team2_details.team_run,

        team1OverPlayed: data.team1_details.team_over_played,
        team2OverPlayed: data.team2_details.team_over_played,

        team1WicketLoss: data.team1_details.team_wicket_loss,
        team2WicketLoss: data.team2_details.team_wicket_loss,

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
            (cricketScores.length > 0) && cricketScores.map((score, index) => (
              <CricketScore
                score={score}
                index={index}
                handleChange={handleChange}
                handleChangeCricketScores={handleChangeCricketScores}
                cricketScores={cricketScores}
                setCricketScores={setCricketScores}
                handleDelete={handleDelete}
              />
            ))
          }
          {
            (cricketScores.length === 0) && <p className='text-sm text-[#ffb5b5]'>Currently no matches</p>
          }
        </div >
      </>
  )
}

export default CricketPanel;