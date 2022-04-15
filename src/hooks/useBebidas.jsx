import { useContext } from 'react';

import BebidasContext from '../components/BebidasProvider';

const useBebidas = () => {
	return useContext(BebidasContext);
};

export default useBebidas;
