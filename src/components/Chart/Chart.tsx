import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { labels } from '../../const/lineChartXLabel'
import { LineChartProps } from '../../types'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export const getChartTitle = (cityName: string) =>
    `${cityName} weather forecast for ${new Date().toISOString().slice(0, 10)}`

export const getOptions = (title: string, isSingle: boolean) =>
    isSingle
        ? {
              responsive: true,
              plugins: {
                  legend: {
                      position: 'top' as const,
                  },
                  title: {
                      display: true,
                      text: title,
                  },
              },
              scales: {
                  x: {
                      display: true,
                      title: {
                          display: true,
                          text: 'Time',
                      },
                  },
              },
          }
        : {
              responsive: true,
              interaction: {
                  mode: 'index' as const,
                  intersect: false,
              },
              stacked: false,
              plugins: {
                  title: {
                      display: true,
                      text: title,
                  },
              },
              scales: {
                  x: {
                      display: true,
                      title: {
                          display: true,
                          text: 'Time',
                      },
                  },
                  y: {
                      type: 'linear' as const,
                      display: true,
                      position: 'left' as const,
                      title: {
                          display: true,
                          text: 'Temperature(°C)',
                      },
                  },
                  y1: {
                      type: 'linear' as const,
                      display: true,
                      position: 'right' as const,
                      grid: {
                          drawOnChartArea: false,
                      },
                      title: {
                          display: true,
                          text: 'Humidity(%)',
                      },
                  },
              },
          }

export const getChartData = (
    temperatureDataSet: number[] = [],
    humidityDataSet: number[] = []
) => {
    if (temperatureDataSet.length === 0 && humidityDataSet.length !== 0) {
        return {
            labels,
            datasets: [
                {
                    label: 'Humidity(%)',
                    data: humidityDataSet,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        }
    }

    if (temperatureDataSet.length !== 0 && humidityDataSet.length === 0) {
        return {
            labels,
            datasets: [
                {
                    label: 'Temperature(°C)',
                    data: temperatureDataSet,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        }
    }
    return {
        labels,
        datasets: [
            {
                label: 'Temperature(°C)',
                data: temperatureDataSet,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Humidity(%)',
                data: humidityDataSet,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1',
            },
        ],
    }
}

export function LineChart({
    temperatureDataSet,
    humidityDataSet,
    title,
    isSingle,
}: LineChartProps) {
    return (
        <Line
            options={getOptions(title, isSingle)}
            data={getChartData(temperatureDataSet, humidityDataSet)}
        />
    )
}
