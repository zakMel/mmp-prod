import {Pie} from 'react-chartjs-2'
import React from 'react';

export default function PieChart (props) {


    return (
        <div className="pieChart">

            <Pie
                data={{
                    labels: ['protein', 'fat', 'carbs'],
                    datasets: [{
                        data: [props.macros.protein, props.macros.fat, props.macros.carbs],
                        backgroundColor: ['brown', 'red', 'tan'],
                    }]
                }}
                options={{
                    legend: {
                        display: true,
                        labels: {
                            fontSize: 10
                        }
                    }
                }}
                height={110}
            />

        </div>
       
    )

}


