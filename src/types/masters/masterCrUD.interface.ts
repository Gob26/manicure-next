// types/masters/masterCrUD.interface.ts
export interface IMasterProfileRequest {
  title: string;
  description?: string;
  experience_years: number;
  specialty: string;
  slug?: string;
  name: string;
  address?: string;
  phone?: string;
  telegram?: string;
  whatsapp?: string;
  website?: string;
  vk?: string;
  instagram?: string;
  accepts_at_home: boolean;
  accepts_in_salon: boolean;
  accepts_offsite: boolean;
  image: File | FileList;
}

export interface ICreateMasterProfileResponse {
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

export class MasterProfileError extends Error {
  constructor(
    message: string,
    public readonly validationErrors?: IValidationErrorResponse
  ) {
    super(message);
    this.name = 'MasterProfileError';
  }
}