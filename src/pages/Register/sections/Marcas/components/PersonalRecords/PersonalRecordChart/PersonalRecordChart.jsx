import { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Label
} from 'recharts'
import './PersonalRecordChart.css'

const PersonalRecordsChart = ({ records, uniqueExercises }) => {
  const [selectedExercise, setSelectedExercise] = useState('')
  const [chartType, setChartType] = useState('line')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getDate()}/${date.getMonth() + 1}/${date
      .getFullYear()
      .toString()
      .substr(-2)}`
  }

  useEffect(() => {
    if (uniqueExercises.length > 0 && !selectedExercise) {
      setSelectedExercise(uniqueExercises[0])
    }
  }, [uniqueExercises, selectedExercise])

  const chartData = useMemo(() => {
    if (!selectedExercise) return []

    const filteredRecords = records
      .filter((record) => record.ejercicio === selectedExercise)
      .map((record) => ({
        ...record,

        dateObj: new Date(record.fecha),
        peso: Number.parseFloat(record.peso),
        repeticiones: Number.parseInt(record.repeticiones || '1')
      }))

      .sort((a, b) => a.dateObj - b.dateObj)

    return filteredRecords.map((record) => ({
      _id: record._id,
      fecha: formatDate(record.fecha),
      fechaCompleta: new Date(record.fecha).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      peso: record.peso,
      repeticiones: record.repeticiones
    }))
  }, [records, selectedExercise])

  const maxWeight = useMemo(() => {
    if (chartData.length === 0) return 100
    return Math.ceil(Math.max(...chartData.map((item) => item.peso)) * 1.1)
  }, [chartData])

  const maxReps = useMemo(() => {
    if (chartData.length === 0) return 10
    return Math.ceil(
      Math.max(...chartData.map((item) => item.repeticiones)) * 1.2
    )
  }, [chartData])

  const avgWeight = useMemo(() => {
    if (chartData.length === 0) return 0
    const sum = chartData.reduce((acc, item) => acc + item.peso, 0)
    return Math.round((sum / chartData.length) * 10) / 10
  }, [chartData])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip'>
          <p className='tooltip-date'>{payload[0]?.payload.fechaCompleta}</p>
          <p className='tooltip-weight'>
            <span className='tooltip-label'>Peso:</span>
            <span className='tooltip-value'>{payload[0]?.value} kg</span>
          </p>
          {payload[1] && (
            <p className='tooltip-reps'>
              <span className='tooltip-label'>Repeticiones:</span>
              <span className='tooltip-value'>{payload[1]?.value}</span>
            </p>
          )}
        </div>
      )
    }
    return null
  }

  const chartColors = {
    weight: '#3366cc',
    reps: '#ff9933',
    avgLine: '#e53935',
    grid: '#e0e0e0',
    axis: '#9e9e9e'
  }

  const handleExerciseChange = (e) => {
    setSelectedExercise(e.target.value)
  }

  const handleChartTypeChange = (type) => {
    setChartType(type)
  }

  if (records.length === 0) {
    return (
      <div className='chart-container empty-chart'>
        <h3>No hay suficientes datos para mostrar gráficos</h3>
        <p>Registra tus marcas personales para visualizar tu progreso.</p>
      </div>
    )
  }

  return (
    <div className='chart-container'>
      <div className='chart-header'>
        <h3>Progreso de Marcas Personales</h3>

        <div className='chart-controls'>
          <div className='chart-select-container'>
            <label htmlFor='exercise-select'>Ejercicio:</label>
            <select
              id='exercise-select'
              value={selectedExercise}
              onChange={handleExerciseChange}
              className='chart-select'
            >
              {uniqueExercises.map((exercise) => (
                <option key={exercise} value={exercise}>
                  {exercise}
                </option>
              ))}
            </select>
          </div>

          <div className='chart-type-selector'>
            <button
              className={`chart-type-btn ${
                chartType === 'line' ? 'active' : ''
              }`}
              onClick={() => handleChartTypeChange('line')}
            >
              Línea
            </button>
            <button
              className={`chart-type-btn ${
                chartType === 'bar' ? 'active' : ''
              }`}
              onClick={() => handleChartTypeChange('bar')}
            >
              Barras
            </button>
          </div>
        </div>
      </div>

      <div className='chart-content'>
        {isLoading ? (
          <div className='chart-loading'>Cargando datos...</div>
        ) : error ? (
          <div className='chart-error'>Error: {error}</div>
        ) : chartData.length === 0 ? (
          <div className='chart-empty'>
            No hay suficientes datos para este ejercicio.
          </div>
        ) : (
          <>
            <div className='chart-stats'>
              <div className='stat-card'>
                <div className='stat-label'>Promedio</div>
                <div className='stat-value'>{avgWeight} kg</div>
              </div>
              <div className='stat-card'>
                <div className='stat-label'>Máximo</div>
                <div className='stat-value'>
                  {Math.max(...chartData.map((item) => item.peso))} kg
                </div>
              </div>
              <div className='stat-card'>
                <div className='stat-label'>Progreso</div>
                <div className='stat-value'>
                  {chartData.length > 1
                    ? `${(
                        (chartData[chartData.length - 1].peso /
                          chartData[0].peso -
                          1) *
                        100
                      ).toFixed(1)}%`
                    : 'N/A'}
                </div>
              </div>
            </div>

            <ResponsiveContainer width='100%' height={400}>
              {chartType === 'line' ? (
                <LineChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60
                  }}
                >
                  <CartesianGrid
                    strokeDasharray='3 3'
                    stroke={chartColors.grid}
                  />
                  <XAxis
                    dataKey='fecha'
                    angle={-45}
                    textAnchor='end'
                    height={70}
                    tick={{ fill: chartColors.axis, fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis
                    yAxisId='left'
                    orientation='left'
                    stroke={chartColors.weight}
                    domain={[0, maxWeight]}
                    tickCount={6}
                    tick={{ fill: chartColors.axis }}
                  >
                    <Label
                      value='Peso (kg)'
                      angle={-90}
                      position='insideLeft'
                      style={{ textAnchor: 'middle', fill: chartColors.axis }}
                    />
                  </YAxis>
                  <YAxis
                    yAxisId='right'
                    orientation='right'
                    stroke={chartColors.reps}
                    domain={[0, maxReps]}
                    tickCount={5}
                    tick={{ fill: chartColors.axis }}
                  >
                    <Label
                      value='Repeticiones'
                      angle={90}
                      position='insideRight'
                      style={{ textAnchor: 'middle', fill: chartColors.axis }}
                    />
                  </YAxis>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign='top' height={36} />
                  <ReferenceLine
                    y={avgWeight}
                    yAxisId='left'
                    stroke={chartColors.avgLine}
                    strokeDasharray='3 3'
                    strokeWidth={2}
                  >
                    <Label
                      value={`Promedio: ${avgWeight} kg`}
                      position='insideBottomRight'
                      fill={chartColors.avgLine}
                    />
                  </ReferenceLine>
                  <Line
                    yAxisId='left'
                    type='monotone'
                    dataKey='peso'
                    name='Peso (kg)'
                    stroke={chartColors.weight}
                    activeDot={{ r: 8 }}
                    strokeWidth={3}
                    dot={{
                      stroke: chartColors.weight,
                      strokeWidth: 2,
                      r: 4,
                      fill: 'white'
                    }}
                  />
                  <Line
                    yAxisId='right'
                    type='monotone'
                    dataKey='repeticiones'
                    name='Repeticiones'
                    stroke={chartColors.reps}
                    strokeWidth={2}
                    dot={{
                      stroke: chartColors.reps,
                      strokeWidth: 2,
                      r: 4,
                      fill: 'white'
                    }}
                  />
                </LineChart>
              ) : (
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60
                  }}
                >
                  <CartesianGrid
                    strokeDasharray='3 3'
                    stroke={chartColors.grid}
                  />
                  <XAxis
                    dataKey='fecha'
                    angle={-45}
                    textAnchor='end'
                    height={70}
                    tick={{ fill: chartColors.axis, fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis
                    yAxisId='left'
                    orientation='left'
                    stroke={chartColors.weight}
                    domain={[0, maxWeight]}
                    tickCount={6}
                    tick={{ fill: chartColors.axis }}
                  >
                    <Label
                      value='Peso (kg)'
                      angle={-90}
                      position='insideLeft'
                      style={{ textAnchor: 'middle', fill: chartColors.axis }}
                    />
                  </YAxis>
                  <YAxis
                    yAxisId='right'
                    orientation='right'
                    stroke={chartColors.reps}
                    domain={[0, maxReps]}
                    tickCount={5}
                    tick={{ fill: chartColors.axis }}
                  >
                    <Label
                      value='Repeticiones'
                      angle={90}
                      position='insideRight'
                      style={{ textAnchor: 'middle', fill: chartColors.axis }}
                    />
                  </YAxis>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign='top' height={36} />
                  <ReferenceLine
                    y={avgWeight}
                    yAxisId='left'
                    stroke={chartColors.avgLine}
                    strokeDasharray='3 3'
                    strokeWidth={2}
                  >
                    <Label
                      value={`Promedio: ${avgWeight} kg`}
                      position='insideBottomRight'
                      fill={chartColors.avgLine}
                    />
                  </ReferenceLine>
                  <Bar
                    yAxisId='left'
                    dataKey='peso'
                    name='Peso (kg)'
                    fill={chartColors.weight}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    yAxisId='right'
                    dataKey='repeticiones'
                    name='Repeticiones'
                    fill={chartColors.reps}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </>
        )}
      </div>
    </div>
  )
}

PersonalRecordsChart.propTypes = {
  records: PropTypes.array.isRequired,
  uniqueExercises: PropTypes.array.isRequired
}

export default PersonalRecordsChart
