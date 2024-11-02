import { useState, useEffect, useRef } from 'react';

const ChartEarningDay = () => {
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
        return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    });
    const chartContainerEarningsMonthRef = useRef();

    useEffect(() => {
        const getDaySales = async () => {
            if (!month) return;

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("Token not found");
                    return;
                }
    
                const result = await fetch(
                    `https://backfotostudio-development.up.railway.app/sales/6c739143-1aa5-4fc4-946f-99fb35814c0f/dash/earnings/day/${month}`,
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
                    const date = new Date(data.result.time + 'T00:00:00');
                    const formattedDate = date.toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
                    setMes(formattedDate);
                    setGanancias(formatCurrency(data.result.total_earnings));
                } else {
                    setMes(getCurrentDayFormatted());
                    setGanancias(null);
                }
            } catch (error) {
                console.error("Error fetching earnings:", error);
                setMes(getCurrentDayFormatted());
                setGanancias(null);
            }
        }
        getDaySales();
    }, [month]);

    const getCurrentDayFormatted = () => {
        const currentDate = new Date();
        return currentDate.toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <section ref={chartContainerEarningsMonthRef} style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center",padding:"1vh 0.5vw"}}>
            <input 
                type="date" 
                value={month} 
                onChange={(e) => setMonth(e.target.value)} 
                style={{width:"80%",color:"#004e7e"}}
            />
                          <hr></hr>
                <div style={{color:"#004e7e"}}>
                    <h4>Ganancias del día  {mes}</h4>
                    <p>${ganancias ? ganancias : 0}</p>
                </div>
          
            
        </section>
    );
}

export default ChartEarningDay;
