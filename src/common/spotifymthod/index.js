const axios = require('axios');
const qs = require('qs');
require('dotenv').config()


const client_id = process.env.SPOTIFY_API_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

const getAuth = async () => {
    try{
      const token_url = 'https://accounts.spotify.com/api/token';
      const data = qs.stringify({'grant_type':'client_credentials'});
  
      const response = await axios.post(token_url, data, {
        headers: { 
          'Authorization': `Basic ${auth_token}`,
          'Content-Type': 'application/x-www-form-urlencoded' 
        }
      })
      console.log("response.data.access_token",response?.data);
      return response?.data?.access_token;
    }catch(error){
      console.log(error);
    }
  }
  


  const getAudioFeatures_Track = async (track_id) => {
    const access_token = await getAuth();
    const api_url = `https://api.spotify.com/v1/artists/6XyY86QOPPrYVGvF9ch6wz`;
    console.log("access_token",access_token);
    try{
      const response = await axios.get(api_url, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json' ,
          'accept':"application/json"
        }
      });
      console.log(response.data);
      return response.data;
    }catch(error){
      console.log(error);
    }  
  };
  

  module.exports = { getAuth,getAudioFeatures_Track }