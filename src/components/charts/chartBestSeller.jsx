import React, { useState, useEffect } from 'react';

const ChartBestSeller = () => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [step, setStep] = useState(0);
    const [startDate, setStartDate] = useState(formatDate(sevenDaysAgo));
    const [endDate, setEndDate] = useState(formatDate(today));
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const handleFetchData = async () => {
        if (new Date(endDate) <= new Date(startDate)) {
            setError('La fecha de finalización debe ser posterior a la fecha de inicio');
            return;
        }
        setError('');
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token no encontrado");
                return;
            }
            const response = await fetch(`https://backfotostudio-development.up.railway.app/dash/item/${startDate}/${endDate}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue satisfactoria');
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    useEffect(() => {
        const handleFetchData = async () => {
            if (new Date(endDate) <= new Date(startDate)) {
                setError('La fecha de finalización debe ser posterior a la fecha de inicio');
                return;
            }
            setError('');
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("Token no encontrado");
                    return;
                }
                const response = await fetch(`https://backfotostudio-development.up.railway.app/dash/item/${startDate}/${endDate}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue satisfactoria');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        if (step === 0) {
            handleFetchData();
            setStep(step + 1);
        }
    }, []); // Ejecutar solo una vez al cargar el componente

    useEffect(() => {
        handleFetchData();
    }, [startDate, endDate]); // Ejecutar cada vez que startDate o endDate cambien

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h4 style={{color:"#004e7e"}}>Producto más vendido</h4>
            <div>
                <label style={{display:"block", color:"#004e7e"}}>

                    Fecha de Inicio:
                </label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{width:"300px" , color:"#004e7e"}}
                />

            </div>
            <br></br>
            <div>

                <label style={{display:"block",color:"#004e7e"}}>
                    Fecha de Finalización:
                </label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{width:"300px" , color:"#004e7e"}}
                />

            </div>
            <hr></hr>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && (
                <div>
                    {data && data.success && (
                        <div>
                            <img src={data.category_product_Url_Img} />
                            <pre style={{textWrap:"auto"}}>El producto más vendido entre la fecha {startDate} y la fecha {endDate} fue {data.bestSeller.category_product_name} vendiendo {data.bestSeller.total_units_sold} unidades.</pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChartBestSeller;
