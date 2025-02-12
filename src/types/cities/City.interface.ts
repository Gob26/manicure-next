export interface ICityResponse {
  city: ICity;
  description?: ICityDescription;
}

// Остальные интерфейсы остаются без изменений
export interface ICity {
  id: number;
  name: string;
  district: string;
  subject: string;
  population: number;
  latitude: number;
  longitude: number;
  slug: string;
}

export interface ICityDescription {
  id: number;
  city_id: number;
  title: string | null;
  description: string | null;
  text: string | null;
}
  
  // Интерфейс для списка городов
  export interface ICityList {
    cities: ICity[];
  }

  // Интерфейс для деталей города
  export interface ICityDetails {
    city: ICity;
  }

  export interface ICityPageProps {
    params: { slug: string };
  }