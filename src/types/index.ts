export type hourWeahter = {
    time: string
    temp_c: number
    humidity: number
}[]

export type hourData = {
    hour: { time: string; temp_c: number; humidity: number }[]
}

export type ApiData = { forecast: { forecastday: [hourData] } }

export type CityOption = { value: string; label: string }

export type WeatherOption = { value: string; label: string }

export type LineChartProps = {
    temperatureDataSet: number[]
    title: string
    humidityDataSet: number[]
    isSingle: boolean
}
