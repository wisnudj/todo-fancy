import { ApiError, extractMessageFromResponse } from "./error"

export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  updatedAt: Date;
}

export interface TaskPagination {
  limit: number;
  total: number;
  page: number;
  totalPages: number;
  items: TaskItem[]
}

export async function getTasks(token: string, title: string, completed?: boolean, page?: number, limit?: number): Promise<TaskPagination> {
  const getTaskUrl = new URL(`${import.meta.env.VITE_API_BASE_URL}/task`)

  if(title) getTaskUrl.searchParams.set("title", title)
  if(completed) getTaskUrl.searchParams.set("completed", completed.toString())
  if(page) getTaskUrl.searchParams.set("page", page.toString())
  if(limit) getTaskUrl.searchParams.set("limit", limit.toString())

  const resp = await fetch(getTaskUrl, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  if(!resp.ok) {
    const message = await extractMessageFromResponse(resp)
    throw new ApiError({ message: message, status: resp.status, url: getTaskUrl.toString() })
  }

  const json = await resp.json()

  return {
    limit: json.limit,
    total: json.total,
    page: json.page,
    totalPages: json.totalPages,
    items: json.taskItems
  }
}

export async function addTask(token: string, title: string): Promise<TaskItem> {
  const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
        title
    })
  })

  if(!resp.ok) {
    const message = await extractMessageFromResponse(resp)
    throw new ApiError({ message: message, status: resp.status, url: `${import.meta.env.VITE_API_BASE_URL}/task` })
  }

  const json = await resp.json()
  
  return {
    id: json.id,
    title: json.title,
    completed: json.completed,
    updatedAt: json.updatedAt
  }
}