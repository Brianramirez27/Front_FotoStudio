import React, { useState, useEffect, useContext } from "react";

import { AuthenticationContext } from "../../context/AuthenticationContext";
import BackSidebarInventory from "../Buttons/BackSidebarInventory";

import Styles from "./updateProductInventoryForm.module.css";
const UpdateSaleForm = () => {


    const { selectedSale, setSelectedSale, setActiveButtomInventory, setUpdateSale, updateSale } = useContext(
        AuthenticationContext
    );

    let { sale_id, details } = selectedSale;





    // setdetailsUpdate(details);

    const [detailsUpdate, setdetailsUpdate] = useState(0);
    const [productMinus, setProductMinus] = useState([]);






    const handleDeleteProduct = (id) => {


        if (detailsUpdate == 0) {
            const deleted = details.filter((sale) => sale.product_id == id);
            const update  = details.filter((sale) => sale.product_id != id);

            console.log(deleted)
            setdetailsUpdate(update);
            setProductMinus(...productMinus, deleted);
        } else if (detailsUpdate != 0 && detailsUpdate.length > 1) {
            const deleted = details.filter((sale) => sale.product_id == id);
            const update  = details.filter((sale) => sale.product_id != id);

            console.log(deleted)
            setdetailsUpdate(update);
            setProductMinus(...productMinus, deleted);
        } else {
            alert("Mínimo tienes que tener un producto en una compra")
        }

    }

    const handlePlusProduct = (id) => {

        if (detailsUpdate) {
            const update = detailsUpdate.map((product) => {
                if (product.product_id === id) {
                    product.sales_details_amount = product.sales_details_amount + 1;
                    product.value = product.sales_details_amount * product.price;
                }
                return product;
            })
            setdetailsUpdate(update);

        } else {
            const update = details.map((product) => {
                if (product.product_id === id) {
                    product.sales_details_amount = product.sales_details_amount + 1;
                    product.value = product.sales_details_amount * product.price;
                }
                return product;
            })
            setdetailsUpdate(update);
        }

    }

    const handleMinusProduct = (id) => {
        if (detailsUpdate) {
            const update = detailsUpdate.map((product) => {
                if (product.product_id === id && product.sales_details_amount > 1) {
                    product.sales_details_amount = product.sales_details_amount - 1;
                    product.value = product.sales_details_amount * product.price;
                }
                return product;
            })

            setdetailsUpdate(update);

        } else {
            const update = details.map((product) => {
                if (product.product_id === id && product.sales_details_amount > 1) {
                    product.sales_details_amount = product.sales_details_amount - 1;
                    product.value = product.sales_details_amount * product.price;
                }
                return product;
            })
            setdetailsUpdate(update);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        // Obtén el contenido del elemento
        let totalText = document.getElementById("totalUpdate").textContent;

        // Quita el símbolo de dólar y convierte el texto a número
        let totalNumber = Number(totalText.replace('Total : $', '').replace(',', '').trim())




        const data = {
            sale_total_price: totalNumber,
            details: detailsUpdate,
            deleted: productMinus
        }



        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token not found");
                return;
            }
            const result = await fetch(
                `https://backfotostudio-development.up.railway.app/sales/${sale_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                }
            );

            if (result.ok) {
                alert("Producto actualizado exitosamente", result.productUpdate);
                setUpdateSale(!updateSale);
                setActiveButtomInventory(null)
                setSelectedSale(null);

            } else {
                alert(`Error al actualizar producto: ${data.message}`);
            }
        } catch (error) {
            alert(`Error en la solicitud: ${error.message}`);
        }
    }

    return (
        <div className={Styles.containerUpdateProduct}>
            <BackSidebarInventory />
            <h2 className={Styles.h2}>Modificar venta</h2>
            <span className={Styles.span}>{selectedSale.sale_id}</span>
            <span className={Styles.span}>Vendedor: {selectedSale.sales_name_seller}</span>
            <span className={Styles.span}>Fecha: {selectedSale.created_at}</span>
            <span className={Styles.span}>Total: ${selectedSale.sale_total_price}</span>

            <table className={Styles.table}>
                <thead>
                    <tr className={Styles.tableRow}>
                        <th className={Styles.th} colSpan={"1"}>Producto</th>
                        <th className={Styles.th}>Cantidad</th>
                        <th className={Styles.th}>Unidad</th>
                        <th className={Styles.th}>Precio</th>
                        <th className={Styles.th} colSpan={"3"}>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {detailsUpdate === 0 &&
                        details.map((sale) => {
                            return (
                                <tr className={Styles.tableRow} key={sale.product_id}>
                                    <td className="">{sale.category_product_name}</td>
                                    <td className="">{sale.sales_details_amount}</td>
                                    <td className="">${sale.pructo_price}</td>
                                    <td className="">${sale.pructo_price * sale.sales_details_amount}</td>
                                    <td className={Styles.td} onClick={() => handlePlusProduct(sale.product_id)}>+</td>
                                    <td className={Styles.td} onClick={() => handleMinusProduct(sale.product_id)}>-</td>
                                    <td className={Styles.td} onClick={() => handleDeleteProduct(sale.product_id)}>X</td>
                                </tr>
                            )
                        })
                    }

                    {detailsUpdate.length > 0 && detailsUpdate.map((sale) => {
                        return (
                            <tr className={Styles.tableRow} key={sale.product_id}>
                                <td className="">{sale.category_product_name}</td>
                                <td className="">{sale.sales_details_amount}</td>
                                <td className="">${sale.pructo_price}</td>
                                <td className="">${sale.pructo_price * sale.sales_details_amount}</td>
                                <td className={Styles.td} onClick={() => handlePlusProduct(sale.product_id)}>+</td>
                                <td className={Styles.td} onClick={() => handleMinusProduct(sale.product_id)}>-</td>
                                <td className={Styles.td} onClick={() => handleDeleteProduct(sale.product_id)}>X</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            <footer className={Styles.footerTable}>
                <div>
                    <i>
                        {detailsUpdate === 0 && details.length + " Productos agregados"}
                        {detailsUpdate.length > 0 && detailsUpdate.length + " Productos agregados"}
                    </i>

                    <h2 id="totalUpdate">Total : ${detailsUpdate === 0 && details?.reduce((acc, product) => {
                        return acc + (product.sales_details_amount * product.pructo_price);
                    }, 0)}
                        {detailsUpdate.length > 0 && detailsUpdate?.reduce((acc, product) => {
                            const salesDetailsAmount = Number(product.sales_details_amount) || 0;
                            const productPrice = Number(product.pructo_price) || 0;
                            return acc + (salesDetailsAmount * productPrice);
                        }, 0)}
                    </h2>
                </div>
                <div className="footerTableButton">
                    <button className={Styles.buttonSubmit} type="submit" onClick={(e) => handleSubmit(e)}>Modificar venta</button>
                </div>
            </footer>
        </div>
    )
}

export default UpdateSaleForm;