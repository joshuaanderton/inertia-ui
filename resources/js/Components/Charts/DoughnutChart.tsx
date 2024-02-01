import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

let options: any = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    }
  }
}

export interface DoughnutChartProps {
  data: {
    label: string
    value: number
    color: string
  }[]
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {

  let dataset: {labels: string[], datasets: {label: string, data: number[], backgroundColor: string[], borderWidth: number}[]} = {
    labels: [],
    datasets: [{
      label: '',
      data: [],
      backgroundColor: [],
      borderWidth: 0
    }]
  }

  data.forEach(({ label, value, color }) => {
    dataset.labels.push(label)
    dataset.datasets[0].label = label
    dataset.datasets[0].data.push(value)
    dataset.datasets[0].backgroundColor.push(color)
  })

  return <Doughnut options={options} data={dataset} />
}

export default DoughnutChart
