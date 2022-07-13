import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 1000 },
    { duration: '1m30s', target: 5000 },
    { duration: '20s', target: 3000 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  }
};

export default function () {
  const res = http.get('https://dashboard.s.plurall.net/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

  //http.get('https://dashboard.s.plurall.net/');
