import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VitalsChart = ({ vitals }) => {
  const chartData = vitals.map(v => ({
    date: new Date(v.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Weight: v.weight,
    BMI: v.bmi,
    'Heart Rate': v.heartRate
  })).reverse();

  return (
    <div className="vitals-chart">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Weight" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="BMI" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="Heart Rate" stroke="#ffc658" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VitalsChart;
