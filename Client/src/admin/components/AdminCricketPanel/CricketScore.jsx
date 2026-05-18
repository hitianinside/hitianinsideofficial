

export default function CricketScore({ score, index, cricketScores, setCricketScores, handleChangeCricketScores, handleChange, handleDelete }) {
  return (
    <div
      className="w-full sm:w-[600px] bg-white/10 text-white rounded-xl shadow-md p-4 my-3 mx-auto"
      key={score._id}
    >
      {/* Match Type */}
      <h2 className="text-lg font-semibold mb-3 text-center uppercase tracking-wide">
        {score.match_type}
      </h2>

      {/* Scoreboard Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 border-b border-gray-500 pb-4">

        {/* Team 1 */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <div className="flex items-center gap-3">
            <img
              src={score.team1_details.team_logo}
              alt={score.team1_details.team_name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <span className="font-bold text-xl">{score.team1_details.team_name}</span>
          </div>

          <div className="text-sm flex flex-col gap-1">
            <span className="flex gap-2">
              <span>Runs:</span>
              <input
                type="number"
                value={score.team1_details.team_run}
                onChange={(e) =>
                  handleChangeCricketScores(cricketScores, setCricketScores, e, index, "team1run")
                }
                className="w-16 bg-[#6b0909] p-1 rounded"
              />
              /
              <input
                type="number"
                value={score.team1_details.team_wicket_loss}
                onChange={(e) =>
                  handleChangeCricketScores(cricketScores, setCricketScores, e, index, "team1wicketloss")
                }
                className="w-14 bg-[#6b0909] p-1 rounded"
              />
            </span>

            <span className="flex gap-2">
              Overs:
              <input
                type="number"
                value={score.team1_details.team_over_played}
                onChange={(e) =>
                  handleChangeCricketScores(cricketScores, setCricketScores, e, index, "team1overplayed")
                }
                className="w-16 bg-[#6b0909] p-1 rounded"
              />
            </span>
          </div>
        </div>

        {/* VS Middle Section */}
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-3xl font-bold text-gray-300">VS</span>
          <div className="text-center text-base text-gray-300">
            <span className="font-medium">Match Status:</span> {score.completed || "Ongoing"}
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex flex-col items-center sm:items-end gap-2">
          <div className="flex items-center gap-3">
            <span className="font-bold text-xl">{score.team2_details.team_name}</span>
            <img
              src={score.team2_details.team_logo}
              alt={score.team2_details.team_name}
              className="w-14 h-14 rounded-full object-cover"
            />
          </div>

          <div className="text-sm flex flex-col gap-1 items-end">
            <span className="flex gap-2">
              <span>Runs:</span>
              <input
                type="number"
                value={score.team2_details.team_run}
                onChange={(e) =>
                  handleChangeCricketScores(cricketScores, setCricketScores, e, index, "team2run")
                }
                className="w-16 bg-[#6b0909] p-1 rounded"
              />
              /
              <input
                type="number"
                value={score.team2_details.team_wicket_loss}
                onChange={(e) =>
                  handleChangeCricketScores(cricketScores, setCricketScores, e, index, "team2wicketloss")
                }
                className="w-14 bg-[#6b0909] p-1 rounded"
              />
            </span>

            <span className="flex gap-2">
              Overs:
              <input
                type="number"
                value={score.team2_details.team_over_played}
                onChange={(e) =>
                  handleChangeCricketScores(cricketScores, setCricketScores, e, index, "team2overplayed")
                }
                className="w-16 bg-[#6b0909] p-1 rounded"
              />
            </span>
          </div>
        </div>
      </div>

      {/* Match Complete Editable Field */}
      <div className="mt-3 text-center">
        <label className="text-sm mr-2">Match complete:</label>
        <input
          type="text"
          value={score.completed}
          onChange={(e) =>
            handleChangeCricketScores(cricketScores, setCricketScores, e, index, "complete")
          }
          className="text-sm w-24 bg-[#6b0909] p-1 rounded"
        />
      </div>

      {/* Buttons */}
      <div className="w-full flex gap-3 mt-4">
        <button
          className="flex-1 bg-[#bb1d1d] hover:bg-[#e01414] p-2 rounded-lg font-medium"
          onClick={() => handleChange(index, score._id)}
        >
          Make Changes
        </button>

        <button
          className="flex-1 bg-[#bb1d1d] hover:bg-[#e01414] p-2 rounded-lg font-medium"
          onClick={() => handleDelete(score._id)}
        >
          Delete
        </button>
      </div>
    </div>

  )
}