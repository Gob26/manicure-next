'use client'; // Указываем, что компонент клиентский

import { useQuery } from '@tanstack/react-query';
import { ICity } from '@/types/cities/City.interface';
import { getCitiesList } from '@/services/cities/cities_list/CitiesListService';

type CitiesListProps = {
  initialData: ICity[];
};

const CitiesList = ({ initialData }: CitiesListProps) => {
  // Используем React Query для обновления данных
  const { data: cities, isLoading, isError } = useQuery<ICity[], Error>({
    queryKey: ['cities'],
    queryFn: getCitiesList,
    initialData, // Используем начальные данные из ISR
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки данных</p>;

  return (
    <ul>
      {cities?.map((city) => (
        <li key={city.slug}>{city.name}</li>
      ))}
    </ul>
  );
};

export default CitiesList;
