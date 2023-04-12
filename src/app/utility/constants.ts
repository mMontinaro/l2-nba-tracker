export const constants = {
  labels: {
    trackTeam: 'Track team',
    back: 'Back',
    backToDashboard: 'Back to dashboard',
    details: 'Details',
    conference_LOWER: 'conference',
    pastResults: 'Results of past 12 days:',
    noPlayedGames: 'This team has not played a game in the past 12 days.',
    pastScores: 'Scores of past 12 days:',
    avgPointsScored: 'Avg pts scored: ',
    avgPointsConceded: 'Avg pts conceded: ',
    seeGameResults: 'See game results >>',
    teamAlreadyTracked: 'The selected team is already being tracked!',
    east: 'East',
    west: 'West',
  },
  actionType: {
    addToTrack: 'ADD_TO_TRACK',
    backToDashboard: 'BACK_TO_DASHBOARD',
    goToGameResults: 'GO_TO_RESULTS',
  },
  results: {
    home: 'HOME_TEAM',
    visitor: 'VISITOR_TEAM',
    win: 'W',
    lose: 'L',
    draw: 'D',
  },
};

export const endpoints = {
  base_url_teams: 'https://free-nba.p.rapidapi.com/teams/',
  base_url_games: 'https://free-nba.p.rapidapi.com/games',
  dashboard: '/dashboard',
  results: '/results/',
  notFound: '/error-page',
  logos: 'https://interstate21.com/nba-logos/',
  extention_png: '.png',
};
