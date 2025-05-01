"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function AreaChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Generate random data for the past 30 days
    const labels = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - 29 + i)
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    })

    const data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 20)

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Donations",
            data,
            fill: true,
            backgroundColor: "rgba(220, 38, 38, 0.1)",
            borderColor: "rgba(220, 38, 38, 0.8)",
            tension: 0.4,
            pointBackgroundColor: "rgba(220, 38, 38, 1)",
            pointBorderColor: "#fff",
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              borderDash: [2],
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} />
}

export function BarChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const labels = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"]
    const maleData = [15, 25, 20, 18, 12, 10]
    const femaleData = [18, 28, 22, 16, 10, 6]

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Male",
            data: maleData,
            backgroundColor: "rgba(59, 130, 246, 0.7)",
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 1,
          },
          {
            label: "Female",
            data: femaleData,
            backgroundColor: "rgba(220, 38, 38, 0.7)",
            borderColor: "rgba(220, 38, 38, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              borderDash: [2],
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} />
}

export function PieChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const labels = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    const data = [35, 6, 17, 4, 7, 1, 25, 5]
    const backgroundColors = [
      "rgba(220, 38, 38, 0.8)",
      "rgba(220, 38, 38, 0.6)",
      "rgba(59, 130, 246, 0.8)",
      "rgba(59, 130, 246, 0.6)",
      "rgba(139, 92, 246, 0.8)",
      "rgba(139, 92, 246, 0.6)",
      "rgba(234, 88, 12, 0.8)",
      "rgba(234, 88, 12, 0.6)",
    ]

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: backgroundColors,
            borderColor: "#ffffff",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw as number
                const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0)
                const percentage = Math.round((value / total) * 100)
                return `${label}: ${percentage}% (${value} units)`
              },
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} />
}

export function LineChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Generate random data for the past 12 months
    const labels = Array.from({ length: 12 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - 11 + i)
      return date.toLocaleDateString("en-US", { month: "short" })
    })

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "A+",
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 30) + 60),
            borderColor: "rgba(220, 38, 38, 0.8)",
            tension: 0.4,
            pointBackgroundColor: "rgba(220, 38, 38, 1)",
            pointBorderColor: "#fff",
            pointRadius: 3,
          },
          {
            label: "O+",
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 30) + 40),
            borderColor: "rgba(234, 88, 12, 0.8)",
            tension: 0.4,
            pointBackgroundColor: "rgba(234, 88, 12, 1)",
            pointBorderColor: "#fff",
            pointRadius: 3,
          },
          {
            label: "B+",
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 20) + 50),
            borderColor: "rgba(59, 130, 246, 0.8)",
            tension: 0.4,
            pointBackgroundColor: "rgba(59, 130, 246, 1)",
            pointBorderColor: "#fff",
            pointRadius: 3,
          },
          {
            label: "O-",
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 15) + 15),
            borderColor: "rgba(234, 88, 12, 0.6)",
            tension: 0.4,
            pointBackgroundColor: "rgba(234, 88, 12, 0.7)",
            pointBorderColor: "#fff",
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              borderDash: [2],
              color: "rgba(0, 0, 0, 0.1)",
            },
            title: {
              display: true,
              text: "Units",
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} />
}
