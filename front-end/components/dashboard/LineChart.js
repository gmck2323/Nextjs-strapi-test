import React from "react";
import { Row, Col } from "reactstrap";
import { Line, Doughnut } from "react-chartjs-2";

const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales",
      data: [500, 230, 0, 1535, 2200, 1450],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    }
  ]
};

const lineOptions = {
    scales: {
        y: {
            ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, values) {
                    return '$' + value;
                }
            }
        }
    }
}

const pieData = {
    labels: ['Modern', 'Street', 'Landscape', 'Portrait'],
    datasets: [
      {
        label: 'Category of Paintings Sold',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

const LineChart =() => {
  return (
    <Row>
        <Col sm={{ size: 6, offset:1}}>
            <Line data={lineData} options={lineOptions}/>
        </Col>
        <Col sm={{ size: 3 }}>
            <Doughnut data={pieData} />
        </Col>
    </Row>
    
  );
}

export default LineChart