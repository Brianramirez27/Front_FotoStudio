
import React, { useEffect, useContext } from "react";

import Styles from "./containerInventory.module.css";




import { AuthenticationContext } from "../../context/AuthenticationContext";
import CreateSaleForm from "../forms/CreateSaleForm";
import UpdateSaleForm from "../forms/updateSaleForm";
import SelectedSale from "../views/selectSale";


const ContainerVentas = () => {

    const {
        activeButtomInventory,
        setActiveButtomInventory,
        sales,
        setSales,
        newSale,
        deleteSale,
        updateSale,
        setSelectedSale,
    } = useContext(AuthenticationContext);


    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("Token not found");
                    return;
                }

                const result = await fetch("https://backfotostudio-development.up.railway.app/sales/6c739143-1aa5-4fc4-946f-99fb35814c0f/sales", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await result.json();

                if (data.success) {
                    setSales(data.sales);
                } else {
                    console.error("Error fetching categories:", data.message);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategory();
    }, [newSale, deleteSale, updateSale]);


    const handleSelectSale = (sale) => {
        setSelectedSale(sale);

    }
    return (
        <section className={Styles.containerVentas}>
            <div className={Styles.containSidebar}>
                <div className={Styles.Tools}>
                    {activeButtomInventory === "Venta" ? (
                        <CreateSaleForm/>


                    ) : activeButtomInventory === "Update Sale" ? (
                        <UpdateSaleForm/>

                    ) : (
                        <div className={Styles.containHome}>
                            <h1 className={Styles.inventoryTitle}>
                                Ventas
                            </h1>
                            <button
                                className={`${Styles.ButtonSidebar} ${Styles.ButtonUpdate}`}
                                onClick={() => {
                                    setActiveButtomInventory("Venta");
                                }}
                            >
                                Generar venta
                            </button>
                            <hr className={Styles.hr} />
                            <SelectedSale />

                        </div>
                    )}
                </div>
            </div>
            <div className={Styles.containTable}>
                <table className={Styles.table}>
                    <tr className={Styles.tableRow}>
                        <th className={Styles.th} colSpan={"2"}>Venta ID</th>
                        <th className={Styles.th}>Precio total</th>
                        <th className={Styles.th}>Nombre vendedor</th>
                        <th className={Styles.th} colSpan={"2"}>Fecha de la venta</th>
                    </tr>

                    {sales.length > 0 ? (
                        sales.map((sale) => (
                            <tr
                                key={sale.sale_id}
                                className={Styles.tableRow}
                                onClick={() => {
                                    
                                      handleSelectSale(sale);
                                }}
                            >
                                <td className={Styles.td} colSpan={"2"}>{sale.sale_id}</td>
                                <td className={Styles.td}>{sale.sale_total_price}</td>
                                <td className={Styles.td}>{sale.sales_name_seller}</td>
                                <td className={Styles.td} colSpan={"2"}>{sale.created_at} </td>
                            </tr>
                        ))
                    ) : (
                        <tr className={Styles.tableRow}>
                            <td colSpan="6" className={Styles.noProducts}>
                                No se han realizado ventas
                            </td>
                        </tr>
                    )}

                    <tr className={Styles.tableRow}>
                        <td colSpan="6">Total Ventas: {sales.length}</td>
                    </tr>
                </table>

                
            </div>
        </section>
    )
}

export default ContainerVentas;