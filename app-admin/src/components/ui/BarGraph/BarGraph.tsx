import React from "react";
import styles from "./BarGraph.module.scss";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BarGraph = ({ data, options, title }: any) => {
  return (
    <div className={styles.barGraph}>
      <h1>{title}</h1>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarGraph;
