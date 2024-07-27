import axios from 'axios';

const API_KEY = '8eb4eed78a864c348361cfbef43f9f30'; // Din uppdaterade API-nyckel från Weatherbit
const CURRENT_WEATHER_URL = 'https://api.weatherbit.io/v2.0/current';
const DAILY_FORECAST_URL = 'https://api.weatherbit.io/v2.0/forecast/daily';

export const fetchCurrentWeather = async (city) => {
  try {
    const response = await axios.get(CURRENT_WEATHER_URL, {
      params: {
        city: city,
        key: API_KEY,
      },
    });
    return response.data.data[0];
  } catch (error) {
    if (error.response && error.response.status === 204) {
      return null; // Returnera null om staden inte hittas
    }
    throw error;
  }
};

export const fetchDailyForecast = async (city) => {
  try {
    const response = await axios.get(DAILY_FORECAST_URL, {
      params: {
        city: city,
        key: API_KEY,
        days: 8,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 204) {
      return null; // Returnera null om staden inte hittas
    }
    throw error;
  }
};