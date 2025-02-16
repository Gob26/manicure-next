export interface IMaster {
  slug: string;
  name: string;
  address: string;
  phone: string;
  specialty: string;
  experience_years: number;
  accepts_at_home: boolean;
  accepts_in_salon: boolean;
  accepts_offsite: boolean;
}

export interface IMastersListResponse {
  masters: IMaster[];
}

export interface IMastersPageProps {
  params: { citySlug: string };
}

export interface IProps {
  masters: IMastersListResponse;
  citySlug: string;
}