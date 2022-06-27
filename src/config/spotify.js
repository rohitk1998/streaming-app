var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: '757cb03bc6a84a3f85a40af777a1dadd',
  clientSecret: 'd56a4b9697174255885b67804cbbfb0d',
  redirectUri: 'http://localhost:8000'
});


spotifyApi.setAccessToken('<your_access_token>');

module.exports = spotifyApi ; 