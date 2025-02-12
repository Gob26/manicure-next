// src/app/cities/page.tsx

import { getCitiesList } from '@/api/cities/cities_list/citiesListApi';
import Cities from '@/components/screens/Сities/Cities';
import { ICity } from '@/types/cities/City.interface';

const CitiesPage = async () => {
  try {
    const cities: ICity[] = await getCitiesList();
    return <Cities cities={cities} />;
  } catch (error) {
    console.error('Ошибка при получении списка городов:', error);
    return <div>Не удалось загрузить список городов.</div>;
  }
};

export default CitiesPage;
