const PROTOCOL = 'http';
const SERVER_URL = 'localhost:4321';
const API_PREFIX = '/api/v1';

const API_URL = `${PROTOCOL}://${SERVER_URL}${API_PREFIX}`;

const baseGet = (endpoint: string) =>
  fetch(`${API_URL}${endpoint}`).then(response => response.json());

const basePost = <DT>(endpoint: string, data: DT) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'content-type': 'application/json',
    },
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  }).then(response => response.json());

export const ping = () => baseGet('/ping');

type UploadData = {
  payload: string;
};
export const upload = (data: UploadData) => basePost('/upload', data);
