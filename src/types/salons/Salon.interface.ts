export interface ISalons {
    slug: string;
    name: string;
    address: string;
    phone: string;
}

export interface ISalonsListResponse {
    salons: ISalons[];
}
// объект с параметрами запроса
export interface ISalonsPageProps {
    params: { citySlug: string };
}

export interface IProps {
    salons: ISalonsListResponse;
    citySlug: string;
}