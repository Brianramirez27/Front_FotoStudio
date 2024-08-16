import { validateToken } from "../helpers/TokenHelpers";

const authenticateUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/authentication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // Si la respuesta no es exitosa, lanza un error con el texto de la respuesta
      const error = await response.json();
      console.log(error.error);
      throw new Error(error.error);
  }
    // Parsea la respuesta JSON
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};


export { authenticateUser };