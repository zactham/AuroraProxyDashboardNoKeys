import { loadStripe } from "@stripe/stripe-js";
import config from "../../config.json";

const stripePromise = loadStripe(
    `${config.STRIPE_PUBLIC_TEST}`
  );

//Weekly 7 Days, Daily 24 Hours
const price_time_frame = "Monthly 30 Days";

const isp_proxy_daily = [
  "25 / $18",
  "50 / $35",
  "100 / $70",
]

const isp_proxy_weekly = [
  "25 / $35",
  "50 / $70",
  "100 / $140",

]

const isp_proxy_monthly = [
  "50 / $118",
  "100 / $135",
]

const subnet_isps = "250 / $550"

const isp_prices = [18, 35, 70];
const isp_amounts = [25, 50, 100];

const gb_proxy = [
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

const prices_proxy = [
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


 export default {stripePromise, gb_proxy, DISCORD_SESSION_ENDPOINT, DASHBOARD_USER_ENDPOINT, 
  prices_proxy, options_proxy_plan, options_proxy_type, options_countries, price_time_frame, isp_proxy_daily, isp_proxy_monthly, isp_proxy_weekly, subnet_isps, isp_prices, isp_amounts}