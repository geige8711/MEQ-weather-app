const key = 'c717ab506269416bab9231151220103'
export const getWeatherDataByCityName = (cityName: string) =>
    `http://api.weatherapi.com/v1/forecast.json?key=${key}&days=3&q=${cityName}&aqi=no&alerts=no`
