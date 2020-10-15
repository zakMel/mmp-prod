import {Pie} from 'react-chartjs-2'
import React from 'react';

export default function PieChart (props) {


    return (
        <div className="pieChart">

            <Pie
                data={{
                    labels: props.labels ? props.labels : "",
                    datasets: [{
                        data: props.macros ? [props.macros.protein, props.macros.fat, props.macros.carbs] : "",
                        backgroundColor: ['red', '#ffa07a', '#228b22'],
                    }],
                }}
                options={{
                    legend: {
                        // position: "bottom",
                        display: true,
                        labels: {
                            fontSize: 10
                        }
                    },
                    layout: props.layout,
                    maintainAspectRatio: false
                }}
                height={props.height}
                width={props.width}
                // style={props.style}

            />

        </div>
       
    )

}


