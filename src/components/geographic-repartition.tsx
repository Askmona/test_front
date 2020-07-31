import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import { CountByLocation } from '../interfaces/count-in-location'
interface Props {
    eventCountByLocation: CountByLocation[]
    limit?: number
}

/**
 * Creates a chart and provides an array for additional values which could not be displayed in the chart
 * @param props 
 */
export const GeographicRepartition: React.FC<Props> = (props: Props) => {
    const canvasRef = useRef(null)

    // When limit is set, a button is presented to allow showing/hiding locations that could not be displayed on the chart
    const [showOtherLocations, setShowOtherLocations] = useState<boolean>(false)
    useEffect(() => initChart(
        canvasRef.current,
        props.eventCountByLocation.slice(0, props.limit ? props.limit : props.eventCountByLocation.length)
    ), [props.eventCountByLocation, props.limit])

    let undisplayedValues: CountByLocation[] = []

    if (props.limit && props.eventCountByLocation.length > props.limit) {
        undisplayedValues = props.eventCountByLocation.slice(props.limit);
    }

    return (
        <div>

            <canvas width="300" height="300" ref={canvasRef}></canvas>
            {
                !!undisplayedValues.length && (
                    <div>
                        <h2>Et ailleurs...</h2>
                        <button onClick={() => setShowOtherLocations(!showOtherLocations)}>
                            {showOtherLocations ? 'Masquer' : 'Afficher'}
                        </button>
                        {
                            showOtherLocations &&
                            <ul>
                                {undisplayedValues.map((e, i) => <li key={i}>{e.location} : {e.count}</li>)}
                            </ul>
                        }
                    </div>
                )
            }
        </div>
    )
}


function initChart(canvasElement: HTMLCanvasElement, eventCount: CountByLocation[]) {
    console.log('displaying', eventCount)
    new Chart(canvasElement.getContext('2d'), {
        type: 'bar',
        data: {
            labels: eventCount.map(e => e.location),
            datasets: [
                {
                    label: `Nombre d'événements`,
                    data: eventCount.map(e => e.count),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        }
    })

}