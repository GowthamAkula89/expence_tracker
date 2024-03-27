import React from "react";
import { PieChart, Pie, Cell} from 'recharts';
import "./expensesPieChart.css";
const ExpensesPieChart = ({ categoriesData }) => {
    return (
        <div className="pie-chart">
            <PieChart width={199} height={199}>
                <Pie data={categoriesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={99} fill="#8884d8">
                    {categoriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
            </PieChart>
            <div className="expense-identity">
                {categoriesData.map((entry, index) => (
                    <div key={index} className="color-align">
                        <div className="color-box" style={{ backgroundColor: entry.color }}></div>
                        <div className="text-color">{entry.name}</div>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default ExpensesPieChart;
