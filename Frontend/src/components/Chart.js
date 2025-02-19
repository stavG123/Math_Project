import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ["Monday", "Tuesday", "Wednesday"],
  datasets: [
    {
      label: "Predicted Distance",
      data: [6000, 7000, 8000],
      borderColor: "blue",
      borderWidth: 2,
      fill: false,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};

function Chart() {
  return <Line data={data} options={options} />;
}

export default Chart;
