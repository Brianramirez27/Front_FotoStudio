import { useState, useEffect, useRef } from 'react';

const ChartEarningMonth = () => {
    const formatMonthYear = (monthYear) => {
        const [year, month] = monthYear.split('-');
        const date = new Date(year, month - 1, 1);
        return date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('es-ES', { style: 'currency', currency: 'COP' });
    };

    const getCurrentMonthFormatted = () => {
        const currentDate = new Date();
        const monthYear = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
        return formatMonthYear(monthYear);
    };

    const [mes, setMes] = useState(getCurrentMonthFormatted());
    const [ganancias, setGanancias] = useState();
    const [month, setMonth] = useState(() => {
        const currentDate = new Date();
        return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    });
    const chartContainerEarningsMonthRef = useRef();

    useEffect(() => {
        const getMonthSales = async () => {
            if (!month) return;

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("Token not found");
                    return;
                }
    
                const result = await fetch(
                    `https://backfotostudio-development.up.railway.app/dash/earnings/month/${month}`,
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
                    setMes(formatMonthYear(data.result.time));
                    setGanancias(formatCurrency(data.result.total_earnings))
                } else {
                    setMes(formatMonthYear(month));
                    setGanancias(null)
                }
            } catch (error) {
                console.error("Error fetching earnings:", error);
                setMes(formatMonthYear(month));
                setGanancias(null)
            }
        }
        getMonthSales();
    }, [month]);

    return (
        <section ref={chartContainerEarningsMonthRef} style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center",padding:"0.7vh 0.5vw"}}>
            <input 
                type="month" 
                value={month} 
                onChange={(e) => {
                    setMonth(e.target.value);
                    setMes(formatMonthYear(e.target.value));
                }} 
                style={{width:"80%",color:"#004e7e"}}
            />
            <hr></hr>
            <div style={{color:"#004e7e"}}>
                <h4>Ganancias del mes de {mes}</h4>
                <p>${ganancias ? ganancias : 0}</p>
            </div>
        </section>
    );
}

export default ChartEarningMonth;
