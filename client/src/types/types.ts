

 export interface ProcessProps{
    number:string,
    title:string;
    description:string;
    icon:any
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
