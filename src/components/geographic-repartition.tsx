import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import { CountByLocation } from '../interfaces/count-by-location'
import { StyledButton } from './styled-button'
import styled from 'styled-components';
import { StyledOl } from './styled-ol';
import { StyledLi } from './styled-li';
interface Props {
    eventCountByLocation: CountByLocation[]
    limit?: number
}
const CenterDiv = styled.div`
    display: flex;
    justify-content: center;
`
const StretchedDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

/**
 * Creates a chart and provides an array for additional values which could not be displayed in the chart
 * @param props 
 */
export const GeographicRepartition: React.FC<Props> = (props: Props) => {
    // Chart logic
    const canvasRef = useRef(null)
    useEffect(() => initChart(
        canvasRef.current,
        props.eventCountByLocation.slice(0, props.limit ? props.limit : props.eventCountByLocation.length)
    ), [props.eventCountByLocation, props.limit])

    // When limit is set, a button is presented to allow showing/hiding locations that could not be displayed on the chart
    const [showOtherLocations, setShowOtherLocations] = useState<boolean>(false)
    let undisplayedValues: CountByLocation[] = []
    // If some values cannot be displayed in the chart
    if (props.limit && props.eventCountByLocation.length > props.limit) {
        undisplayedValues = props.eventCountByLocation.slice(props.limit);
    }

    return (
        <div>

            <canvas width="600" height="300" ref={canvasRef}></canvas>
            {
                !!undisplayedValues.length && (
                    <div>
                        {
                            showOtherLocations &&
                            <StyledOl>
                                {undisplayedValues.map((e, i) =>
                                    <StyledLi key={i}>
                                        <StretchedDiv>
                                            <h4>{e.location}</h4>
                                            <p>{e.count}</p>
                                        </StretchedDiv>
                                    </StyledLi>
                                )}
                            </StyledOl>
                        }
                        <CenterDiv>
                            <StyledButton onClick={() => setShowOtherLocations(!showOtherLocations)}>
                                {showOtherLocations ? 'Masquer' : `Afficher ${undisplayedValues.length} autres lieux`}
                            </StyledButton>
                        </CenterDiv>
                    </div>
                )
            }
        </div>
    )
}


function initChart(canvasElement: HTMLCanvasElement, eventCount: CountByLocation[]) {
    new Chart(canvasElement.getContext('2d'), {
        type: 'bar',
        data: {
            labels: eventCount.map(e => e.location),
            datasets: [
                {
                    label: `Nombre d'événements`,
                    data: eventCount.map(e => e.count),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 0.8)',
                    borderWidth: 2
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