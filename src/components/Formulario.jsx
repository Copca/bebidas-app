import { useState } from 'react';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';

import useCategorias from '../hooks/useCategorias';
import useBebidas from '../hooks/useBebidas';

const Formulario = () => {
	const { categorias } = useCategorias();
	const { consultarBebida } = useBebidas();

	const [busqueda, setBusqueda] = useState({
		nombre: '',
		categoria: ''
	});
	const [alerta, setAlerta] = useState('');

	const handleChangeInput = e => {
		setBusqueda({
			...busqueda,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (Object.values(busqueda).includes('')) {
			setAlerta('Ambos campos son obligatorios');
			return;
		}

		setAlerta('');
		consultarBebida(busqueda);
	};

	return (
		<Form onSubmit={handleSubmit}>
			{alerta && (
				<Alert variant='danger' className='text-center'>
					{alerta}
				</Alert>
			)}
			<Row>
				<Col md={6}>
					<Form.Group className='mb-3'>
						<Form.Label htmlFor='nombre'>Nombre Bebida</Form.Label>
						<Form.Control
							type='text'
							id='nombre'
							name='nombre'
							placeholder='Ej. Tequila, Vodka, etc'
							value={busqueda.nombre}
							onChange={handleChangeInput}
						/>
					</Form.Group>
				</Col>

				<Col md={6}>
					<Form.Group className='mb-3'>
						<Form.Label htmlFor='categoria'>Categoría Bebida</Form.Label>
						<Form.Select
							id='categoria'
							name='categoria'
							value={busqueda.categoria}
							onChange={handleChangeInput}
						>
							<option value=''>-- Selecciona Categoría --</option>
							{categorias.map(categoria => (
								<option
									key={categoria.strCategory}
									value={categoria.strCategory}
								>
									{categoria.strCategory}
								</option>
							))}
						</Form.Select>
					</Form.Group>
				</Col>
			</Row>

			<Row className='justify-content-end'>
				<Col md={3}>
					<Button
						type='submit'
						variant='danger'
						className='text-uppercase w-100'
					>
						Buscar Bebidas
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default Formulario;
