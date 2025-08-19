import type { RedirectResponse } from "./interface.ts";

export async function getRedirectData(): Promise<RedirectResponse> {
    const response = await fetch('/api/v1/Redirector/redirect', {
        method: 'GET',
        headers: {
            'x-api-key': 'X'
        }
    })

    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`)
    }

    return response.json()

}

export async function fetchWithAuth({
  redirectUrl,
  token,
}: RedirectResponse): Promise<any> {
  const response = await fetch(redirectUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Erro na chamada do endpoint: ${response.status}`);
  }

  return await response.json();
}