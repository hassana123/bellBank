export const APP_NAME = 'BellCollect Dashboard';

export const COMPANY_NAME = 'Bell Infrastructure Ltd';

export const DEFAULT_PAGINATION_SIZE = 100;

export const REFETCH_INTERVAL = 1000 * 60 * 1; // 1 minute

export const NODE_ENV = import.meta.env.NODE_ENV === 'development' ? 'development' : 'production';

export const TEST_MODE = import.meta.env.VITE_TEST_MODE
  ? !isNaN(+import.meta.env.VITE_TEST_MODE) && +import.meta.env.VITE_TEST_MODE === 1
  : false;

// Keys
export const CSRF_TOKEN = import.meta.env.VITE_CSRF_TOKEN || 'X-Csrf-Token';
export const USER_DATA_KEY = 'user_data';

// API Base
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://dev.bellcollect.ng/app/v1/';
