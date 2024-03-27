import React, { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

export interface BarChartProps {
  data: Array<{
    label: string
    dataset: {
      label: string
      value: number
      color: string
    }[]
  }>
  horizontal?: boolean
}

const BarChart: React.FC<BarChartProps> = ({ data, horizontal = false }) => {

  let chartDataset: {labels: string[], datasets: {label: string, data: number[], backgroundColor: string[], borderColor: string[], borderWidth: number}[]} = {
    labels: [],
    datasets: []
  }

  const wrap = useRef<HTMLDivElement>(null)

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

  if (horizontal) {
    options.indexAxis = 'y' as const
  }

  return (
    <div ref={wrap} className="w-full relative h-0 pb-[52%] [&>canvas]:absolute [&>canvas]:inset-0">
      <Bar options={options} data={chartDataset} />
    </div>
  )
}

export default BarChart
