import type { NextApiRequest, NextApiResponse } from 'next';
type Data = {
  name: string;
};
const apiKey = process.env.WEATHER_API;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // get country from query
  const { country } = req.query;
  // get geo data
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=1&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  const geoData = await response.json();
  console.log(geoData);
  // get weather data
  const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${apiKey}`;
  const weatherResponse = await fetch(weatherApiUrl);
  const weatherData = await weatherResponse.json();
  console.log(weatherData);
  res.status(200).json(weatherData);
}
