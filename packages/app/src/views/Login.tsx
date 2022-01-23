import { Button, Container, Form } from 'react-bootstrap';

export const Login = () => {
	return (
		<Container>
			<Form>
				<h1>Login</h1>
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" placeholder="Email address" />
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Button type={'submit'}>Login</Button>
			</Form>
		</Container>
	);
};
