import { useContext, useState } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import Styles from "./selectProduct.module.css";

const SelectedSale = () => {

    const { selectedSale, setSelectedSale, setActiveButtomInventory, setDeleteSale } = useContext(
        AuthenticationContext
    );

    const handleDeselectSale = () => {
        setSelectedSale(null);
    };

    const handleUpdateSale = () => {
        setActiveButtomInventory("Update Sale");
    }

    const handleDeleteSale = async () => {
        const token = localStorage.getItem("token");

        try {
            const url = `http://localhost:3000/sales/${selectedSale.sale_id}`;
            console.log(url)
            const result = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` // Enviar el token en el header
                }
            })
            const data = await result.json();
            if (result.ok) {
                alert("Producto eliminado exitosamente");
                handleDeselectSale();
                setDeleteSale(data);
            }
        } catch (error) {
            alert(`Error al eliminar producto: ${error.message}`);
            throw new Error(error)
        }
    }
    return (
        <section className={Styles.sectionSeletedProduct}>
            {selectedSale ? (
                <div className={Styles.containSelectedProduct}>
                    <h1 className={Styles.h1} >Venta selecionada</h1>
                    <p className={Styles.p}>{selectedSale.sale_id}</p>
                    <p className={Styles.p}>PRECIO:   ${selectedSale.sale_total_price}</p>
                    <p className={Styles.p}>VENDEDOR:   {selectedSale.sales_name_seller}</p>
                    <p className={Styles.p}>FECHA:   {selectedSale.created_at}</p>

                    <button className={Styles.buttonDeselectProduct}
                        onClick={() => {
                            handleDeselectSale();
                        }}
                    >
                        x
                    </button>

                    <table className={Styles.table}>
                        <thead>
                            <tr className={Styles.tableRow}>
                                <th className={Styles.th} colSpan={"2"}>Producto</th>
                                <th className={Styles.th}>Cantidad</th>
                                <th className={Styles.th}>Unidad</th>
                                <th className={Styles.th}>Precio</th>
                            </tr>
                        </thead>
                        <tbody>

                            {(selectedSale.details).map((product) => {
                                return (
                                    <tr className={Styles.tableRow} key={product.id}>
                                        <td className=""><img src={product.category_produc_Url_Img} style={{ borderRadius: "50%", height: "0px" }} /></td>
                                        <td className="">{product.category_product_name}</td>
                                        <td className="">{product.sales_details_amount}</td>
                                        <td className="">${product.pructo_price}</td>
                                        <td className="">${product.pructo_price * product.sales_details_amount}</td>
                                    </tr>
                                )
                            })}



                            {

                            }
                        </tbody>
                    </table>
                    <button className={Styles.buttonDeleteProduct} onClick={() => { handleDeleteSale() }}>Cancelar venta</button>

                    <button className={Styles.buttonUpdateProduct} onClick={() => { handleUpdateSale() }} >Modificar venta</button>
                </div>
            ) : (
                <div>
                    <h1 className={Styles.h1noProduct}>
                        No hay producto selecionado por favor seleciona uno
                    </h1>
                </div>
            )}
        </section>
    );
}

export default SelectedSale;