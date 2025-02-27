
export interface WeatherData {
  coord: {
    lon: number;
    lan: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}


/*
{
  "coord": {
    "lon": -3.18,
    "lat": 51.48
  },
  "weather": [
    {
      "id":801,
      "main":"Clouds",
      "description":"few clouds",
      "icon":"02n"
    }
  ],
  "base":"stations",
  "main": {
    "temp":277.19,
    "feels_like":273.76,
    "temp_min":276.64,
    "temp_max":278.64,
    "pressure":1018,
    "humidity":91,
    "sea_level":1018,
    "grnd_level":1013
  },
  "visibility":10000,
  "wind": {
    "speed":4.12,
    "deg":300
  },
  "clouds": {
    "all":20
  },
  "dt":1740630995,
  "sys": {
    "type":2,
    "id":2084271,
    "country":"GB",
    "sunrise":1740639733,
    "sunset":1740678539
  },
  "timezone":0,
  "id":2653822,
  "name":"Cardiff",
  "cod":200
}
*/