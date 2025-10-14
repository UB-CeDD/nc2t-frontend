import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
    name: string;
    value: number;
}

interface SpeciesByKingdomChartProps {
    data: ChartData[];
}

const SpeciesByKingdomChart: React.FC<SpeciesByKingdomChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Number of Species" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SpeciesByKingdomChart;
