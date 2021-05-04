interface FetchAPI {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: unknown;
}
