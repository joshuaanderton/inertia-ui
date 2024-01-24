import React, { useMemo } from 'react'
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleBand, scaleLinear } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { ScaleSVG } from '@visx/responsive'
import { lang as __ } from '@inertia-ui/Hooks/useLang'
import classNames from 'classnames'

export type BarsProps = {
  dataset: {label: string, value: number}[]
}

const BarChart: React.FC<BarsProps> = ({ dataset = [] }) => {

  const isEmpty = dataset.length === 0 || dataset.every(ds => ds.value === 0)

  const width = 400,
        height = width / 2,
        xMargin = 16,
        yMargin = 16 * 2,
        xMax = width - xMargin,
        yMax = height - yMargin

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        domain: dataset.map(({ label }) => label),
        padding: 0.4,
      }),
    [xMax],
  )

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [0, Math.max(...dataset.map(({ value }) => value))],
      }),
    [yMax],
  )

  return (
    <div className="relative">
      {isEmpty && (
        <div className="z-10 absolute inset-0 flex items-center justify-center">
          <p className="text-lg site-text-muted">{__('No data for this range...')}</p>
        </div>
      )}
      <div className={classNames((isEmpty ? '[&_*]:opacity-0' : ''), 'bg-chrome-300 dark:bg-chrome-900')}>
        <ScaleSVG width={width} height={height}>
          <Group top={yMargin / 2} left={xMargin / 2}>
            {dataset.map(({ label, value }) => {

              const barWidth = xScale.bandwidth(),
                    barHeight = yMax - (yScale(value) ?? 0),
                    barX = xScale(label),
                    barY = yMax - barHeight

              return (
                <Bar
                  key={label}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill="currentColor"
                  className="text-chrome-950 dark:text-chrome-50"
                  data-tooltip-content={`${label}: ${value}`}
                  onMouseOver={() => {
                    //
                  }}
                />
              )
            })}

            {/* <AxisLeft
              hideAxisLine
              hideTicks
              scale={xScale}
              tickFormat={(val) => val}
              stroke="white"
              tickStroke="white"
              tickLabelProps={{
                fill: 'white',
                fontSize: 11,
                textAnchor: 'end',
                dy: '0.33em',
              }}
            />

            <AxisBottom
              top={yMax}
              scale={yScale}
              stroke="white"
              tickStroke="white"
              tickLabelProps={{
                fill: 'white',
                fontSize: 11,
                textAnchor: 'middle',
              }}
            /> */}

          </Group>
        </ScaleSVG>
      </div>
    </div>
  )
}

export default BarChart
