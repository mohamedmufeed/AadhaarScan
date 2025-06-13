export interface IOCRResult {
  success: boolean;
  message: string;
  data: {
   adharDetails:AadhaarDetails
    frontAadhaar: string | null;
    backAadhaar: string | null
  }
}


export interface AadhaarDetails {
  fullName: string | null;
  aadhaarNumber?: string | null;
  dob: string | null;
  gender: string | null;
  phoneNumber?: string | null;
  fatherName?: string | null;
  address: string | null;
  pinCode: string | null;
}
