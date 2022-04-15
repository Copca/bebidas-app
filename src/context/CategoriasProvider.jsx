import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const CategoriasContext = createContext();

const CategoriasProvider = ({ children }) => {
	/**
	 * States
	 */
	const [categorias, setCategorias] = useState([]);

	useEffect(() => {
		const obtenerCategirias = async () => {
			try {
				const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
				const { data } = await axios.get(url);

				setCategorias(data.drinks);
			} catch (error) {
				console.log(error);
			}
		};

		obtenerCategirias();
	}, []);

	/**
	 * Funciones
	 */
	return (
		<CategoriasContext.Provider value={{ categorias }}>
			{children}
		</CategoriasContext.Provider>
	);
};

export { CategoriasProvider };
export default CategoriasContext;
