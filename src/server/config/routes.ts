const BASE_URL = import.meta.env.VITE_API_URL || '';
const COMPANY_URL = BASE_URL + '/company';

type SlugType = number | string;

// Authentication & Authorization
export const LOGIN_URL = BASE_URL + '/auth/login';
export const AUTHENTICATION_URL = BASE_URL + '/auth/authentication';
export const LOGOUT_URL = BASE_URL + '/auth/logout';
export const FORGOT_PASSWORD_URL = BASE_URL + '/auth/forget-password';
export const VERIFY_PASSWORD_RESET_URL = BASE_URL + '/auth/verify-password-otp';
export const RESET_PASSWORD_URL = BASE_URL + '/auth/reset-password';
export const CHANGE_PASSWORD_URL = BASE_URL + '/auth/company/change-password';

// Dashboard
export const GET_DASHBOARD_CARDS_URL = COMPANY_URL + '/reports';

// Business
export const GET_BUSINESS_URL = COMPANY_URL + '/business';
export const GET_BUSINESS_DETAIL_URL = (id: SlugType) => GET_BUSINESS_URL + `/${id}`;
export const GET_BUSINESS_DASHBOARD_CARDS_URL = GET_BUSINESS_URL + '/reports';
export const GET_BUSINESS_DETAIL_DASHBOARD_CARDS_URL = (id: SlugType) => GET_BUSINESS_DETAIL_URL(id) + '/reports';
export const CREATE_BUSINESS_URL = COMPANY_URL + '/business';
export const UPDATE_BUSINESS_URL = (id: SlugType) => GET_BUSINESS_URL + `/${id}`;
export const GET_BUSINESS_TRANSACTIONS_URL = (id: SlugType) => GET_BUSINESS_DETAIL_URL(id) + '/transactions';
export const GET_BUSINESS_FLEETS_URL = (id: SlugType) => GET_BUSINESS_DETAIL_URL(id) + '/fleets';

// Card
export const GET_CARDS_URL = COMPANY_URL + '/nfcs';
export const GET_CARD_URL = (id: SlugType) => GET_CARDS_URL + `/${id}`;

// Card Request
export const GET_CARD_REQUESTS_URL = COMPANY_URL + '/nfcs/requests';
export const APPROVE_OR_DENY_CARD_REQUEST_URL = (id: SlugType) => COMPANY_URL + `/nfcs/requests/${id}/action`;

// File
export const FILE_UPLOAD_URL = BASE_URL + '/upload';

// Fund Request
export const GET_FUND_REQUESTS_URL = COMPANY_URL + '/transactions/funds/requests';
export const GET_FUND_REQUEST_URL = (id: SlugType) => GET_FUND_REQUESTS_URL + `/${id}`;
export const APPROVE_DENY_FUND_REQUEST_URL = (id: SlugType) => GET_FUND_REQUEST_URL(id) + `/action`;

// Holding Balance
export const GET_HOLDING_BALANCE_CARDS_URL = COMPANY_URL + '/transactions/reports';
export const SETTLE_HOLDING_BALANCE_URL = (stationId: SlugType) =>
  COMPANY_URL + `/stations/${stationId}/transactions/settlements`;

// Products
export const GET_PRODUCTS_URL = COMPANY_URL + '/products';

// Settlements
export const GET_SETTLEMENTS_URL = COMPANY_URL + '/transactions/settlements';

// Settings
export const GET_COMPANY_INFO_URL = COMPANY_URL;
export const UPDATE_COMPANY_INFO_URL = COMPANY_URL;

// Staff
export const GET_STAFF_URL = COMPANY_URL + '/staffs';
export const GET_STAFF_DETAIL_URL = (id: SlugType) => GET_STAFF_URL + `/${id}`;
export const GET_STAFF_CARDS_URL = GET_STAFF_URL + '/reports';
export const CREATE_STAFF_URL = COMPANY_URL + '/staffs';
export const UPDATE_STAFF_URL = (id: SlugType) => GET_STAFF_URL + `/${id}`;

// Substation
export const GET_SUBSTATIONS_URL = COMPANY_URL + '/stations';
export const GET_SUBSTATION_URL = (id: SlugType) => GET_SUBSTATIONS_URL + `/${id}`;
export const GET_SUBSTATION_DASHBOARD_CARDS_URL = GET_SUBSTATIONS_URL + '/reports';
export const GET_SUBSTATION_DETAIL_DASHBOARD_CARDS_URL = (id: SlugType) => GET_SUBSTATION_URL(id) + '/reports';
export const GET_TOP_SELLING_STATIONS_URL = COMPANY_URL + '/stations/top-selling';
export const CREATE_SUBSTATION_URL = COMPANY_URL + '/stations';
export const UPDATE_SUBSTATION_URL = (id: SlugType) => GET_SUBSTATIONS_URL + `/${id}`;
export const GET_SUBSTATION_TRANSACTIONS_URL = (id: SlugType) => GET_SUBSTATION_URL(id) + '/transactions';

// Transactions
export const GET_TRANSACTIONS_URL = COMPANY_URL + '/transactions';
export const GET_TRANSACTION_BY_REFERENCE_URL = (reference: SlugType) =>
  GET_TRANSACTIONS_URL + `/reference/${reference}`;
