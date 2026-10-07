const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DEFAULT_HEADERS = {
  Accept: "applicantion/json",
  ContentType: "applicantion/json",
};
const DEFAULT_POSTFIX = ".json?print=pretty";

const formatUrl = (url: string) => API_BASE_URL + url + DEFAULT_POSTFIX;

export const http = {
  get: <T>(url: string): Promise<T> =>
    fetch(formatUrl(url), { headers: DEFAULT_HEADERS }).then((r) => r.json()),
  post: <T>(url: string, body: unknown): Promise<T> =>
    fetch(formatUrl(url), {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(body),
    }).then((r) => r.json()),
  put: <T>(url: string, body: unknown): Promise<T> =>
    fetch(formatUrl(url), {
      method: "PUT",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(body),
    }).then((r) => r.json()),
  patch: <T>(url: string, body: unknown): Promise<T> =>
    fetch(formatUrl(url), {
      method: "PATCH",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(body),
    }).then((r) => r.json()),
  delete: <T>(url: string): Promise<T> =>
    fetch(formatUrl(url), {
      method: "DELETE",
      headers: DEFAULT_HEADERS,
    }).then((r) => r.json()),
};
