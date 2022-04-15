import { Container } from 'react-bootstrap';

import { CategoriasProvider } from './context/CategoriasProvider';
import { BebidasProvider } from './components/BebidasProvider';

import Formulario from './components/Formulario';
import ListadoBebidas from './components/ListadoBebidas';
import ModalBebida from './components/ModalBebida';

const App = () => {
	return (
		<>
			<CategoriasProvider>
				<BebidasProvider>
					<header className='py-5'>
						<h1>Buscador de Bebidas</h1>
					</header>

					<Container className='mt-5'>
						<Formulario />

						<ListadoBebidas />

						<ModalBebida />
					</Container>
				</BebidasProvider>
			</CategoriasProvider>
		</>
	);
};

export default App;
