export type WeatherUnits = 'metric' | 'imperial' | 'standard';
export type MainView = 'list' | 'tabs' | 'accordion';

export const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
export const forecastUrl = 'https://pro.openweathermap.org/data/2.5/forecast';
export const forecastCnt = 16;
export const weatherUnits: WeatherUnits = 'metric';
export const appId = '1fb8934edcc6c3920a04b5c0939973d6';

export const citiesList = ['Cardiff', 'London', 'Edinburgh', 'Belfast', 'Inverness'];
export const tempSuffixes = { 'metric': '°C', 'imperial': '°F', 'standard': '°K' };
export const windSuffixes = { 'metric': 'm/s', 'imperial': 'mph', 'standard': 'm/s' };
