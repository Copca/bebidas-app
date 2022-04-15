import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const BebidasContext = createContext();

const BebidasProvider = ({ children }) => {
	/**
	 * States
	 */
	const [bebidas, setBebidas] = useState([]);
	const [modal, setModal] = useState(false);
	const [bebidaId, setBebidaId] = useState(null);
	const [receta, setReceta] = useState({});
	const [cargando, setCargando] = useState(false);

	useEffect(() => {
		setCargando(true);

		const obtenerReceta = async () => {
			if (!bebidaId) return;

			try {
				const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;

				const { data } = await axios.get(url);

				setReceta(data.drinks[0]);
			} catch (error) {
				console.log(error);
			} finally {
				setCargando(false);
			}
		};

		obtenerReceta();
	}, [bebidaId]);

	/**
	 * Funciones
	 */
	const consultarBebida = async datos => {
		try {
			const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`;
			const { data } = await axios.get(url);

			setBebidas(data.drinks);
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalClick = () => {
		setModal(!modal);
	};

	const handleBebidaIdClick = id => {
		setBebidaId(id);
	};

	return (
		<BebidasContext.Provider
			value={{
				bebidas,
				consultarBebida,
				modal,
				handleModalClick,
				handleBebidaIdClick,
				receta,
				cargando
			}}
		>
			{children}
		</BebidasContext.Provider>
	);
};

export { BebidasProvider };
export default BebidasContext;
