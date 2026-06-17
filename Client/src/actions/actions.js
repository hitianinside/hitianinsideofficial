//make changes in scores
export function handleChangeCricketScores(cricketScores, setCricketScores, e, index, title) {
  const updatedScores = [...cricketScores];

  if (title === "complete") {
    updatedScores[index] = {
      ...updatedScores[index],
      completed: e.target.value
    }
  }

  //team 1 operations
  else if (title === "team1run") {
    updatedScores[index] = {
      ...updatedScores[index],
      team1_details: { ...updatedScores[index].team1_details, team_run: e.target.value }
    }
  }

  else if (title === "team1wicketloss") {
    updatedScores[index] = {
      ...updatedScores[index],
      team1_details: { ...updatedScores[index].team1_details, team_wicket_loss: e.target.value }
    }
  }

  else if (title === "team1overplayed") {
    updatedScores[index] = {
      ...updatedScores[index],
      team1_details: { ...updatedScores[index].team1_details, team_over_played: e.target.value }
    }
  }

  //team 2 operations
  else if (title === "team2run") {
    updatedScores[index] = {
      ...updatedScores[index],
      team2_details: { ...updatedScores[index].team2_details, team_run: e.target.value }
    }
  }

  else if (title === "team2wicketloss") {
    updatedScores[index] = {
      ...updatedScores[index],
      team2_details: { ...updatedScores[index].team2_details, team_wicket_loss: e.target.value }
    }
  }

  else if (title === "team2overplayed") {
    updatedScores[index] = {
      ...updatedScores[index],
      team2_details: { ...updatedScores[index].team2_details, team_over_played: e.target.value }
    }
  }

  setCricketScores(updatedScores);

}

export function handleChangeFootballScores(footballScores, setFootballScores, e, index, title) {
  const updatedScores = [...footballScores];

  if (title === "complete") {
    updatedScores[index] = {
      ...updatedScores[index],
      completed: e.target.value
    }
  }

  //team 1 operations
  else if (title === "team1Goals") {
    updatedScores[index] = {
      ...updatedScores[index],
      team1_details: { ...updatedScores[index].team1_details, team_goals: e.target.value }
    }
  }

  //team 2 operations
  else if (title === "team2Goals") {
    updatedScores[index] = {
      ...updatedScores[index],
      team2_details: { ...updatedScores[index].team2_details, team_goals: e.target.value }
    }
  }

  setFootballScores(updatedScores);

}

//make changes in event
export function handleChangeEvent(events, setEvents, index, e, title) {
  const updatedEvents = [...events];
  
  if(title === "date"){
    updatedEvents[index] = {
      ...updatedEvents[index],
      date: e.target.value
    }
  }else if(title === "year"){
    updatedEvents[index] = {
      ...updatedEvents[index],
      year: e.target.value
    }
  }else if(title === "eventName"){
    updatedEvents[index] = {
      ...updatedEvents[index],
      event_name: e.target.value
    }
  }else if(title === "instaURL"){
    updatedEvents[index] = {
      ...updatedEvents[index],
      insta_url: e.target.value
    }
  }

  setEvents(updatedEvents);
}