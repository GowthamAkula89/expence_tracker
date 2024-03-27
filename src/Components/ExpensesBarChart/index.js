import React from "react";
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import "./expensesBarChart.css";
const ExpensesBarChart = ({ categoriesData }) => {
    return (
        <div className="bar-chart">
            <BarChart width={600} height={200} data={categoriesData} layout="vertical">
                <XAxis type="number"/>
                <YAxis type="category" dataKey="name" tick={{ fill: 'black' }} width={150} height={45}/>
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </div>
    );
}

export default ExpensesBarChart;
