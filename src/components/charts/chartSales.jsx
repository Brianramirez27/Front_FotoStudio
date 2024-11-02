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

const ChartSales = () => {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(1);
    const chartContainerRef = useRef();

    useEffect(() => {
        getYearSales();
    }, []);

    const getDaySales = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token not found");
                return;
            }

            const result = await fetch(
                `https://backfotostudio-development.up.railway.app/sales/6c739143-1aa5-4fc4-946f-99fb35814c0f/dash/day`,
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
                const formattedData = data.sales.map(sale => ({
                    value: Number(sale.value),
                    time: `${sale.year}-${sale.month}-${sale.day}`
                }));
                setData(formattedData);
                setSelected(3);
            }
        } catch (error) {
            console.error("Error fetching sales:", error);
        }
    }

    const getMonthSales = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token not found");
                return;
            }

            const result = await fetch(
                `https://backfotostudio-development.up.railway.app/sales/6c739143-1aa5-4fc4-946f-99fb35814c0f/dash/month`,
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
                const formattedData = data.sales.map(sale => ({
                    value: Number(sale.value),
                    time: `${sale.year}-${sale.month}`
                }));
                setData(formattedData);
                setSelected(2);
            }
        } catch (error) {
            console.error("Error fetching sales:", error);
        }
    }

    const getYearSales = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token not found");
                return;
            }

            const result = await fetch(
                `https://backfotostudio-development.up.railway.app/sales/6c739143-1aa5-4fc4-946f-99fb35814c0f/dash/year`,
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
                setData(data.sales);
                setSelected(1);
            }
        } catch (error) {
            console.error("Error fetching sales:", error);
        }
    }

    const formatChartData = (data) => {
        return {
            labels: data.map(item => item.time),
            datasets: [
                {
                    label: 'Cantidad',
                    data: data.map(item => Number(item.value)),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    return (
        <section className="chart-sales" style={{padding:"5vh 2vw", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <header>
                <button onClick={() => getYearSales()} className={selected === 1 ?'selected' : 'noSelected'}>Ventas por año</button>
                <button onClick={() => getMonthSales()} className={selected === 2 ? 'selected' : 'noSelected'}> Ventas por mes</button>
                <button onClick={() => getDaySales()} className={ selected === 3 ? 'selected' : 'noSelected'}>Ventas por día</button>
            </header>
            <main ref={chartContainerRef} style={{height:"370px", width:"80vw", display:"flex", justifyContent:"center", alignItems:"center"}}>
                {data && data.length > 0 && <BarChart chartData={formatChartData(data)} />}
            </main>
        </section>
    );
}

export default ChartSales;

export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Cantidad de ventas',
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

export const BarChart = ({ chartData }) => {

    return <Bar options={options} data={chartData} />;
};
