import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 2000,
  duration: '180s',
};
export default function () {
  http.get('http://localhost:3000/api/v1/user');
  sleep(1);
}