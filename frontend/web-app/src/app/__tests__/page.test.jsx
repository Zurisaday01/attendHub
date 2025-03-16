import { describe, it, expect } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { signIn } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn()
}));
import WelcomePage from '../(auth)/(signin)/page';

describe('Page', () => {
  it('renders the heading and description', async () => {
    // ARRANGE
    render(await WelcomePage());

    // ACT
    const heading = screen.getByRole('heading', { level: 1 });

    waitFor(() =>
      expect(screen.findByTestId('homepage-description')).toBeInTheDocument()
    ); //dont work

    // ASSERT
    expect(heading).toBeInTheDocument();
  });

  it('renders the button and calls signIn when clicked', async () => {
    // ARRANGE
    render(await WelcomePage());

    const button = screen.getByRole('button', { name: /log in/i });

    // ACT
    button.click();

    // ASSERT
    expect(signIn).toHaveBeenCalledWith(
      'id-server',
      { callbackUrl: '/dashboard' },
      { prompt: 'login' }
    );
  });
});
