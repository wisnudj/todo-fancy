export class ApiError extends Error {
  status: number;
  url: string;

  constructor(args: { message: string; status: number; url: string }) {
    super(args.message)
    this.status = args.status
    this.url = args.url
  }
}
