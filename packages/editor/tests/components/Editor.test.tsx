import { Editor } from '../../src';
import { render } from '@testing-library/react';

describe('Editor', () => {
	it('renders', () => {
		const component = render(<Editor components={[]} />);

		expect(component).toBe(true);
	});
});
