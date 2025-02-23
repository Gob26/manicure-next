// types/salons/salonCrUD.interface.ts
export interface ISalonProfileRequest {
    title: string;
    description?: string;
    specialty: string;
    slug?: string;
    name: string;
    address: string;
    phone: string;
    telegram?: string;
    whatsapp?: string;
    website?: string;
    vk?: string;
    instagram?: string;
    image?: File | FileList;
  }
  
  export interface ICreateSalonProfileResponse {
    message: string;
    data: {
      id: string;
      title: string;
      name: string;
      [key: string]: unknown;
    };
  }
  
  export interface IValidationErrorResponse {
    detail: {
      loc: string[];
      msg: string;
      type: string;
    }[];
  }
  
  export class SalonProfileError extends Error {
    constructor(
      message: string,
      public readonly validationErrors?: IValidationErrorResponse
    ) {
      super(message);
      this.name = 'SalonProfileError';
    }
  }