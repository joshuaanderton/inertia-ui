import React from 'react'
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

let options: any = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    }
  },
}

export interface LineChartProps {
  data: Array<{
    label: string
    dataset: {
      label: string
      value: number
      color: string
    }[]
  }>
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {

  let chartDataset: {labels: string[], datasets: {label: string, data: number[], backgroundColor: string[], borderColor: string[], borderWidth: number}[]} = {
    labels: [],
    datasets: []
  }

  data.forEach(({ label, dataset }, datasetIdx) => {

    if (datasetIdx === 0) {
      dataset.forEach(({ label }) => chartDataset.labels.push(label))
    }

    let newDataset = {
      label,
      data: [] as number[],
      borderColor: [] as string[],
      backgroundColor: [] as string[],
      borderWidth: 5
    }

    dataset.forEach(({ value, color }) => {
      newDataset.data.push(value)
      newDataset.borderColor.push(color)
      newDataset.backgroundColor.push(color)
    })

    chartDataset.datasets.push(newDataset)

  })

  if (data.length === 1) {
    options.plugins.legend = null
  }

  return <Line style={{ width: '100%' }} options={options} data={chartDataset} />
}

export default LineChart
