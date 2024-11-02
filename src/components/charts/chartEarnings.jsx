import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect, useRef } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ChartEarningYear = () => {
    const [data, setData] = useState([]);
    const chartContainerEarningsRef = useRef();

    useEffect(() => {
        const getYearSales = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("Token not found");
                    return;
                }
    
                const result = await fetch(
                    `https://backfotostudio-development.up.railway.app/sales/6c739143-1aa5-4fc4-946f-99fb35814c0f/dash/earnings/year`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
    
                const data = await result.json();
    
                if (data.success) {
                    setData(data.total_earnings_by_year);
                }
            } catch (error) {
                console.error("Error fetching sales:", error);
            }
        }
        getYearSales();
    }, []);



    

    const formatChartData = (data) => {
        return {
            labels: data.map(item => item.year),
            datasets: [
                {
                    label: 'Ganancias',
                    data: data.map(item => Number(item.total_earnings)),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    return (
            <section ref={chartContainerEarningsRef} style={{display:"flex", justifyContent:"center", alignItems:"center",padding:"1vh 0.5vw"}}>
                {data && data.length > 0 && <BarChartEarning chartData={formatChartData(data)} />}
            </section>
    );
}




export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Ganancias por año',
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        
        },
        y: {
            stacked: true,
        },
    },
};

export const BarChartEarning = ({ chartData }) => {

    return <Bar options={options} data={chartData} />;
};





export default ChartEarningYear;
