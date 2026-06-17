//Base interface for all sports
interface BaseMatchType {
  matchType: string;
  team1Name: string;
  team2Name: string;
  completed?: string;
}

//Event Type
export interface EventType {
  instaURL: string;
  eventName: string;
  year: string;
  date: string;
}

//Cricket
export interface CricketScoreType extends BaseMatchType {
  team1Run?: number;
  team2Run?: number;
  team1OverPlayed?: number;
  team2OverPlayed?: number;
  team1WicketLoss?: number;
  team2WicketLoss?: number;
}

//Football
export interface FootballScoreType extends BaseMatchType {
  team1Goals?: number;
  team2Goals?: number;
}

//Volleyball
export interface VolleyballScoreType extends BaseMatchType {
  team1Score?: number;
  team2Score?: number;
}

//Basketball
export interface BasketballScoreType extends BaseMatchType {
  team1Score?: number;
  team2Score?: number;
}