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
                height={200}
            />

        </div>
       
    )

}


