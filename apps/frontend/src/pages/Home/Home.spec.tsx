import { render } from '@testing-library/react';

import Home from './Home';

describe('<Home />', () => {
  it('should render the Home page', () => {
    const { container } = render(<Home />);

    expect(container).toBeDefined();
  });
});
