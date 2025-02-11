// src/hooks/cities/cities_list/useCitiesData.ts

import { getCitiesList } from "@/api/cities/cities_list/citiesListApi";
import { ICity } from "@/types/cities/City.interface";
import { useQuery } from "@tanstack/react-query";



// Хук для получения данных с поддержкой начальных данных
export const useCitiesData = (initialData: ICity[] | undefined) => {
  return useQuery<ICity[], Error>({
    queryKey: ['cities'],
    queryFn: getCitiesList,
    initialData: initialData, // Используем переданные начальные данные
  });
};
