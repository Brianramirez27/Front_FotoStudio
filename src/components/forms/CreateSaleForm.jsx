import { useState, useEffect, useContext } from "react";
import Styles from "./CreateSaleForm.module.css";
import BackSidebarInventory from "../Buttons/BackSidebarInventory";
import { AuthenticationContext } from "../../context/AuthenticationContext";
const CreateSaleForm = () => {


    const {setActiveButtomInventory,  setNewSale } = useContext(AuthenticationContext);

    const [id, setId] = useState(0);
    const [idProduct, setIdProduct] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [product4Sale, setProduct4Sale] = useState([]);
    const [aval, setAval] = useState(0);
    const [productCategory, setProductCategory] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        console.log(user)




        const sale = {
            sale_user_id: JSON.parse(user).user_id,
            sale_total_price: product4Sale?.reduce((acc, product) => {
                return acc + product.value;
            }, 0),
            sales_name_seller: JSON.parse(user).user_name,
            details: product4Sale
        };

        console.log(sale)


        try {
            if (product4Sale.length > 0) {
                const result = await fetch("https://backfotostudio-development.up.railway.app/sales/6c739143-1aa5-4fc4-946f-99fb35814c0f/sales", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Enviar el token en el header
                    },
                    body: JSON.stringify(sale) // Convertir el objeto a JSON
                });


                const data = await result.json();
                // Parsear la respuesta como JSON
                if (result.ok) {
                    alert("Venta exitosamente");
                      setActiveButtomInventory(null);
                      setNewSale(sale);

                    // Opcional: Redirigir o realizar otras acciones aquí
                } else {
                    alert(`Error al crear venta: ${data.message}`);
                }
            } else {
                alert("Agregue productos a la venta")
            }

        } catch (error) {
            alert(`Error en la solicitud: ${error.message}`);
        }
    };

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("Token not found");
                    return;
                }

                const result = await fetch("https://backfotostudio-development.up.railway.app/sales/6c739143-1aa5-4fc4-946f-99fb35814c0f/sales/products", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await result.json();

                if (data.success) {
                    setProductCategory(data.products)
                    console.log(data.products)
                } else {
                    console.error("Error fetching categories:", data.message);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        fetchCategory();
    }, [])

    const handleAddProduct = () => {
        if(amount <= aval){
        setId(id + 1);
        setProduct4Sale([...product4Sale, {
            id: id,
            idProduct: idProduct,
            name: name,
            amountFixed:aval,
            amount: amount,
            price: price,
            value: Number(price) * Number(amount)
        }])
        setName("Seleccione un producto")
        setAmount(0);
        setIdProduct("");
        setPrice(0);
        setAval(0);
    }else{
        alert("Cantidad no disponible")
    }
    };

    const handleDeleteProduct = (id) => {
        const newProduct4Sale = product4Sale.filter((product) => product.id !== id);
        setProduct4Sale(newProduct4Sale);
    }

    const handlePlusProduct = (id) => {
        const newProduct4Sale = product4Sale.map((product) => {
            if (product.id === id && Number(product.amount) < Number(product.amountFixed)) {
                product.amount = Number(product.amount) + 1;
                product.value = product.amount * product.price;
            }else if(Number(product.amount) === Number(product.amountFixed)){
              alert("No hay más unidades disponibles")

            }
            return product;
        })
        setProduct4Sale(newProduct4Sale);
    }

    const handleMinusProduct = (id) => {
        const newProduct4Sale = product4Sale.map((product) => {
            if (product.id === id && Number(product.amount) > 1) {
                product.amount = Number(product.amount) - 1;
                product.value = product.amount * product.price;
            }else if(Number(product.amount) === 1){
              alert("Debe tener minimo una unidad")
            }
            return product;

        })

        setProduct4Sale(newProduct4Sale);
    }

    return (
        <div className={Styles.containerCreateInventoryForm}>
            <BackSidebarInventory />
            <h2 className={Styles.h2}>Generar venta</h2>
            <form
                onSubmit={handleSubmit}
                className={Styles.form}>

                <label className={Styles.label}>Seleccione el producto</label>
                <select className={Styles.select}
                    value={name}
                    onChange={(e) => {
                        const selectedOption = e.target.children[e.target.selectedIndex];
                        setName(e.target.value);
                        setIdProduct(selectedOption.getAttribute('data-key'));
                        setPrice(selectedOption.getAttribute('data-price'));
                        setAval(selectedOption.getAttribute('data-aval'));
                    }}
                >
                    <option value="Seleccione un producto">Seleccione un producto</option>
                    {productCategory?.map((category) => (
                        <option
                            key={category.category_product_id}
                            value={category.category_product_name}
                            data-key={category.product_id}
                            data-price={category.pructo_price}
                            data-aval={category.product_amount}
                        >
                            {category.category_product_name}
                        </option>
                    ))}
                </select>


                {name !== "Seleccione un producto"  && <label className={aval > 0 ? Styles.labelG : Styles.labelR}>{aval > 0 ? aval + " unidades disponibles" : "No disponible"}</label>
                }
                <br />
                <br />
                <label className={Styles.label}>Cantidad</label>
                <input
                    className={Styles.input}
                    type="number" step="1"
                    placeholder="Cantidad del producto"
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={aval == 0 || name == "Seleccione un producto"}
                    value={amount}
                />
                <button className={Styles.addProduct} type="button" onClick={handleAddProduct}>Añadir</button>


                <div>
                    <table className={Styles.table}>
                        <thead>
                            <tr className={Styles.tableRow}>
                                <th className={Styles.th}>Producto</th>
                                <th className={Styles.th}>Cantidad</th>
                                <th className={Styles.th}>Unidad</th>
                                <th className={Styles.th}>Valor Total</th>
                                <th className={Styles.th} colSpan={"3"}>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product4Sale.map((product) => {
                                return (
                                    <tr className={Styles.tableRow} key={product.id}>
                                        <td className="">{product.name}</td>
                                        <td className="">{product.amount}</td>
                                        <td className="">${product.price}</td>
                                        <td className="">${product.value}</td>
                                        <td className={Styles.td} onClick={() => handlePlusProduct(product.id)}>+</td>
                           <td className={Styles.td} onClick={() => handleMinusProduct(product.id)}>-</td>      
                                        <td className={Styles.td} onClick={() => handleDeleteProduct(product.id)}>X</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <footer className={Styles.footerTable}>
                        <div>
                            <i>
                                {product4Sale.length + " Productos agregados"}
                            </i>

                            <h2>Total : ${product4Sale?.reduce((acc, product) => {
                                return acc + product.value;
                            }, 0)}</h2>
                        </div>
                        <div className="footerTableButton">
                            <button className={Styles.buttonSubmit} type="submit">Generar venta</button>
                        </div>

                    </footer>

                </div>


            </form>
        </div>
    )
}

export default CreateSaleForm;