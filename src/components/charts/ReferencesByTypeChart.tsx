import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
    name: string;
    value: number;
}

interface ReferencesByTypeChartProps {
    data: ChartData[];
}

const ReferencesByTypeChart: React.FC<ReferencesByTypeChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" name="Number of References" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ReferencesByTypeChart;
