'use server';

export async function federatedLogout() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'; // Ensure the full URL is used
    const response = await fetch(`${baseUrl}/api/auth/federated-logout`);

    const data = await response.json();
    if (response.ok) {
      if (typeof window !== 'undefined') {
        window.location.href = data.url; // Ensure this runs only on the client side
      }
      return;
    }
  } catch (error) {
    console.error('Logout error:', error);
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }
}
