import http from "k6/http";
import { sleep, check, fail } from "k6";
import { Trend, Rate } from "k6/metrics";

export let SignupDuration = new Trend("signup_duration");
export let SignupFailRate = new Rate("signup_fail_rate");
export let SignupSuccessRate = new Rate("signup_success_rate");
export let SignupReqs = new Rate("signup_reqs");

export default function () {
  const url = "http://127.0.0.1/api/v1/user/";
 
  const res = http.get(url);

  SignupDuration.add(res.timings.duration);
  SignupFailRate.add(res.status == 0 || res.status >= 399);
  SignupSuccessRate.add(res.status < 399);
  SignupReqs.add(1);

  let durationMsg = "Max duration ${1000/1000}s";

  if (
    !check(res, {
      "status is 200": (r) => r.timings.duration < 1000,
    })
  ) {
    fail(durationMsg);
  }

  sleep(1);
}
