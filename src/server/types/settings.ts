export type ApiCompanyInfoType = {
  id: number;
  name: string;
  state: string | null;
  lga: string | null;
  address: string | null;
  logo: string | null;
  banner: string | null;
  description: string | null;
  email: string;
  phone: string;
  type: string;
  status: string;
  createdAt: number;
  updatedAt: number;
  staffs: {
    id: number;
    role: string;
    status: string;
    createdAt: number;
    updatedAt: number;
    userId: number | null;
    companyId: number | null;
    stationId: number | null;
    businessId: number | null;
  }[];
  wallet: null;
};

export type ApiCompanyInfoUpdateType = {
  name: string;
  email?: string;
  phone?: string;
  state: string;
  lga: string;
  address: string;
  logo?: string;
};
