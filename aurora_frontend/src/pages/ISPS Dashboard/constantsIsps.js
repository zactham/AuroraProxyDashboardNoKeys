import { loadStripe } from "@stripe/stripe-js";
import config from "../../config.json";

const stripePromise = loadStripe(
    config.STRIPE_PUBLIC_TEST
  );
const options_proxy_plan = ["Order 1", "Order 2"];

const amounts_proxy = [
    50, 100
];

const prices_proxy = [
    118, 235 
];

const gb_proxy = [
    `${amounts_proxy[0]} / $${prices_proxy[0]}`,`${amounts_proxy[1]} / $${prices_proxy[1]}`
];

const price_time_frame = "Monthly 30 Days"





export default {stripePromise, options_proxy_plan, gb_proxy, prices_proxy, amounts_proxy, price_time_frame}