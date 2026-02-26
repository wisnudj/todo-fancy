export class ApiError extends Error {
  status: number;
  url: string;

  constructor(args: { message: string; status: number; url: string }) {
    super(args.message)
    this.status = args.status
    this.url = args.url
  }
}

export async function extractMessageFromResponse(resp: Response): Promise<string> {
  const text = await resp.text()
  let message = text
  try {
    const json = JSON.parse(text)
    if (json.message) message = json.message
  } catch {
  }
  return message
}