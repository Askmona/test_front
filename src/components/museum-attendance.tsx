import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import { MuseumAPI } from '../api/museum-api';
import { MuseumAttendanceRecord } from '../interfaces/museum-attendance-record';
interface Props {
    museumReference: string;
}
export const MuseumAttendance: React.FC<Props> = (props: Props) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const subscription = MuseumAPI.getMuseumAttendance(props.museumReference).subscribe(res => drawChart(canvasRef.current, res))
        return () => {
            subscription.unsubscribe()
        }
    }, [props.museumReference])

    return (
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}

const drawChart = (canvasElement: HTMLCanvasElement, attendance: MuseumAttendanceRecord[]) => {
    new Chart(canvasElement.getContext('2d'), {
        type: 'bar',
        data: {
            labels: attendance.map(e => e.annee),
            datasets: [
                {
                    label: `Entrées gratuites`,
                    data: attendance.map(e => e.gratuit),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 0.8)',
                    borderWidth: 2
                },
                {
                    label: `Entrées payantes`,
                    data: attendance.map(e => e.payant),
                    backgroundColor: 'rgba(99, 99, 255, 0.2)',
                    borderColor: 'rgba(99, 99, 255, 0.8)',
                    borderWidth: 2
                }

            ]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    gridLines: {
                        lineWidth: 0
                    },
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }],
                xAxes: [{
                    gridLines: {
                        lineWidth: 0
                    },
                    stacked: true
                }]

            },
        }
    })

}