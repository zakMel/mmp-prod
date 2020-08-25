import {Pie} from 'react-chartjs-2'
import React from 'react';

export default function PieChart (props) {


    return (
        <div className="pieChart col-md-6">
            <Pie
                data={{
                    labels: ['protein', 'carbs', 'fats'],
                    datasets: [{
                        data: [60, 20, 20],
                        backgroundColor: ['brown', 'red', 'tan']
                    }]
                }}
                height={100}

            />

        </div>
       
    )

}


