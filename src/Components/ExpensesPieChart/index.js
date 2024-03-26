import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell} from 'recharts';
import "./expensesPieChart.css";
const ExpensesPieChart = ({ expensesList }) => {
    const [categoriesData, setCategoriesData] = useState([]);
    const COLORS = ['#A000FF', '#FF9304', '#FDE006'];
    useEffect(() => {
        // Calculate total expenses for each category
        const totalExpenses = expensesList.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.price;
            return acc;
        }, {});

        // Convert total expenses into pie chart data format
        const pieChartData = Object.keys(totalExpenses).map((category, index) => ({
            name: category,
            value: totalExpenses[category],
            color: COLORS[index % COLORS.length] // Assign color from COLORS array based on index
        }));

        setCategoriesData(pieChartData);
    }, [expensesList]);
    console.log("categoriesData",categoriesData)
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
                <div className="color-align">
                    <div className="color-box travel-color"></div>
                    <div className="travel-text-color">Travel</div>
                </div>
                <div  className="color-align">
                    <div className="color-box entertainment-color"></div>
                    <div className="entertainment-text-color">Entertainment</div>
                </div>
                <div  className="color-align">
                    <div className="color-box food-color"></div>
                    <div className="food-text-color">Food</div>
                </div>
            </div>
        </div>

    );
}

export default ExpensesPieChart;
