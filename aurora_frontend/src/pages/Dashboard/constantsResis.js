import { loadStripe } from "@stripe/stripe-js";
import config from "../../config.json";

const stripePromise = loadStripe(
    `${config.STRIPE_PUBLIC_TEST}`
  );

const gb_proxy = [
    " 1 GB / $18 ",
    " 2 GB / $36 ",
    " 3 GB / $54 ",
    " 4 GB / $72 ",
    " 5 GB / $96 ",
    " 6 GB / $108 ",
    " 7 GB / $126 ",
    " 8 GB / $144 ",
    " 9 GB / $162 ",
    " 10 GB / $180 ",
    " 20 GB / $360 ",
    " 30 GB / $540 ",
    " 40 GB / $720 ",
    " 50 GB / $900 ",
    ];

const DISCORD_SESSION_ENDPOINT =
config.BACKEND_DOMAIN + config.ROUTES.discord_session;

const DASHBOARD_USER_ENDPOINT =
  config.BACKEND_DOMAIN + config.ROUTES.dashboard_user;

const amounts_proxy = 
[
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  20,
  30,
  40,
  50
]

const prices_proxy = [
18,
36,
54,
72,
96,
108,
126,
144,
162,
180,
360,
540,
720,
900,
];

const options_proxy_plan = ["Borealis", "Coming Soon"];

const options_proxy_type = ["Static", "Rotating"];

const options_countries = [
    "Random",
    "USA",
    "Canada",
    "Great Britain",
    "Italy",
    "Germany",
    "France",
    "Spain",
    "Saudi Arabia",
    "Sweden",
    "Greece",
    "Portugal",
    "Netherlands",
    "Belgium",
    "Russia",
    "Ukraine",
    "Poland",
    "Israel",
    "Turkey",
    "Austrailia",
    "Malaysia",
    "Thailand",
    "South Korea",
    "Japan",
    "Philippines",
    "Singapore",
    "China",
    "Hong Kong",
    "Taiwan",
    "India",
    "Pakistan",
    "Iran",
    "Indonesia",
    "Azerbaijan",
    "Kazakhstan",
    "UAE",
    "Mexico",
    "Brazil",
    "Argentina",
    "Chile",
    "Peru",
    "Ecuador",
    "Colombia",
    "South Africa",
    "Denmark",
    "Egypt",
  ];


 export default {stripePromise, gb_proxy, DISCORD_SESSION_ENDPOINT, DASHBOARD_USER_ENDPOINT, prices_proxy, options_proxy_plan, options_proxy_type, options_countries, amounts_proxy}