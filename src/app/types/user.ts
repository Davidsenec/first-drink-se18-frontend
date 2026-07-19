export interface UserRegister {
  user_name: string;
  password: string;
  full_name: string;
  nick_name: string;
  contact_info: string;
  address: string;
}

export interface UserLogin {
  user_name: string;
  password: string;
}

export interface UserUpdate {
  full_name: string;
  nick_name: string;
  contact_info: string;
  address: string;
}

export interface UserResponse {
  id: number;
  user_name: string;
  full_name: string;
  nick_name: string;
  contact_info: string;
  address: string;
}

export interface AdminResponse extends UserResponse {
  status: UserStatus;
}

export type UserStatus = "not_arrived" | "present" | "departed";