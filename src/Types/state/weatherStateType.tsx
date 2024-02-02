interface WeatherInfo {
  weather: { main: string }[];
  main: { temp: number };
}

export default WeatherInfo