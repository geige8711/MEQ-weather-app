import axios from 'axios'
import { useState, useEffect, useMemo } from 'react'
import Select from 'react-select'
import { getChartTitle, LineChart } from '../components/Chart/Chart'
import { citOptions, weatherOptions } from '../const/selectionOptions'
import { hourWeahter, ApiData } from '../types'
import { getWeatherDataByCityName } from '../util'
import './Home.css'

const Home = () => {
    const [selectedCityOption, setSelectedCityOption] = useState(citOptions[0])
    const [selectedWeatherOption, setSelectedWeatherOption] = useState(
        weatherOptions[0]
    )
    const [weatherData, setWeatherData] = useState<hourWeahter | null>(null)

    const handleCityChange = (selectedOption: any) => {
        if (selectedOption) {
            setSelectedCityOption(selectedOption)
        }
    }
    const handleWeatherOptionChange = (selectedOption: any) => {
        if (selectedOption) {
            setSelectedWeatherOption(selectedOption)
        }
    }

    useEffect(() => {
        const config = {
            headers: { 'Access-Control-Allow-Origin': '*' },
        }
        const url = getWeatherDataByCityName(selectedCityOption.value)
        const fetchWeatherData = async (url: string) => {
            const { data }: { data: ApiData } = await axios.get(url, config)
            const weatherData = data.forecast.forecastday[0].hour
            setWeatherData(weatherData)
        }
        fetchWeatherData(url)
    }, [selectedCityOption])

    const lineChart = useMemo(() => {
        if (weatherData) {
            const temperatureDataSet = weatherData.map((item) => item.temp_c)
            const humidityDataSet = weatherData.map((item) => item.humidity)
            if (selectedWeatherOption.value === 'Humidity') {
                return (
                    <LineChart
                        isSingle={true}
                        temperatureDataSet={[]}
                        humidityDataSet={humidityDataSet}
                        title={getChartTitle(selectedCityOption.label)}
                    />
                )
            }
            if (selectedWeatherOption.value === 'Temperature') {
                return (
                    <LineChart
                        isSingle={true}
                        temperatureDataSet={temperatureDataSet}
                        humidityDataSet={[]}
                        title={getChartTitle(selectedCityOption.label)}
                    />
                )
            }
            return (
                <LineChart
                    isSingle={false}
                    temperatureDataSet={temperatureDataSet}
                    humidityDataSet={humidityDataSet}
                    title={getChartTitle(selectedCityOption.label)}
                />
            )
        }
        return null
    }, [selectedWeatherOption, selectedCityOption, weatherData])

    return (
        <div className="App">
            <div className="app-title">
                Welcome to Weather Forecast Application
            </div>
            <div className="select-container">
                <Select
                    className="select-item"
                    value={selectedCityOption}
                    onChange={handleCityChange}
                    options={citOptions}
                />
                <Select
                    className="select-item"
                    value={selectedWeatherOption}
                    onChange={handleWeatherOptionChange}
                    options={weatherOptions}
                />
            </div>
            <div className="container-wrapper">
                <div className="line-chart-container">{lineChart}</div>
            </div>
        </div>
    )
}

export default Home
