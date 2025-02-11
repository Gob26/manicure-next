// Интерфейс для города
export interface ICity {
    id: number;             // Уникальный идентификатор
    name: string;           // Название города
    district: string;       // Район
    subject: string;        // Субъект (регион)
    population: number;     // Население
    latitude: number;       // Широта
    longitude: number;      // Долгота
    slug: string;           // Слаг для города (используется в URL)
    
    description: ICityDescription; // Описание города (связанное описание)
  }
  
  // Интерфейс для описания города
  export interface ICityDescription {
    id: number;             // Уникальный идентификатор описания
    city_id: number;        // ID города
    title: string | null;    // Заголовок описания
    description: string | null; // Описание города
    text: string | null;     // Дополнительный текст
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