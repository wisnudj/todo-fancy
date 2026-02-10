import { ApiError } from "./error"

export interface AuthResp {
  token: string;
  expiresIn: string;
}


export async function register(email: string, password: string, confirmPassword: string): Promise<AuthResp> {
  const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password,
      confirmPassword
    })
  })

  if(!resp.ok) {
    const message = await extractMessageFromResponse(resp)
    throw new ApiError({ message: message, status: resp.status, url: `${import.meta.env.VITE_API_BASE_URL}/auth/register` })
  }

  const json = await resp.json()

  return {
    token: json.token,
    expiresIn: json.expiresIn
  }
}

export async function login(email: string, password: string): Promise<AuthResp> {
  const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  if(!resp.ok) {
    const message = await extractMessageFromResponse(resp)
    throw new ApiError({ message: message, status: resp.status, url: `${import.meta.env.VITE_API_BASE_URL}/auth/login` })
  }

  const json = await resp.json()

  return {
    token: json.token,
    expiresIn: json.expiresIn
  }
}

async function extractMessageFromResponse(resp: Response): Promise<string> {
  const text = await resp.text()
  let message = text
  try {
    const json = JSON.parse(text)
    if (json.message) message = json.message
  } catch {
  }
  return message
}
