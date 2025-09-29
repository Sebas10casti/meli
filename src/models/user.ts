interface UserIdentification {
  type: string;
  number: string;
}

interface UserAddress {
  state: string;
  city: string;
  address: string;
  zip_code: string;
}

interface UserPhone {
  area_code: string;
  number: string;
  extension: string;
  verified: boolean;
}

export interface UserData {
  id: number;
  nickname: string;
  registration_date: string;
  first_name: string;
  last_name: string;
  country_id: string;
  email: string;
  identification: UserIdentification;
  address: UserAddress;
  phone: UserPhone;
  alternative_phone: UserPhone;
  user_type: string;
  tags: string[];
  logo: string | null;
  points: number;
  site_id: string;
  permalink: string;
  shipping_modes: string[];
  seller_experience: string;
  seller_reputation: any;
  buyer_reputation: any;
  status: any;
  credit: any;
}
