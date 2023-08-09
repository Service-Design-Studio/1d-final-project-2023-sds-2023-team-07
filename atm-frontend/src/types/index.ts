import Transaction from "@/pages/status/Transaction.page";

export interface TransactionData {
  user_id?: number;
  atm_machine_id?: number; // Make this optional
  amount: number | null;
  transaction_type: string;
}

export interface UserData {
  id: number;
  name: string;
  identification_number: string;
  balance: number | string;
  pin: string;
  face_image_url: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}
