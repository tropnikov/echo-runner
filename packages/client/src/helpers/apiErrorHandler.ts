export async function handleResponse<T>(response: Response, error: string): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || error || 'Request failed');
  }
  return response.json();
}
