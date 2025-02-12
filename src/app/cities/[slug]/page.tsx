import React, { FC } from 'react';
import { getCityDetails } from '@/services/cities/cities_list/CitiesListService';
import { ICityPageProps, ICity } from '@/types/cities/City.interface';
import CityDetail from '@/components/UI/City/City';

export default async function CityPage({ params }: ICityPageProps) {
  const {slug } = await params;  // Доступ к параметрам (slug)

  // Получаем данные города
  const cityData = await getCityDetails(slug);
  
  // Проверка на наличие данных о городе
  if (!cityData || !cityData.city) {
    return <div className="p-4">Город не найден</div>;
  }

  // Дескриптор города
  const { city } = cityData;

  // Передаем данные в компонент CityDetail
  return <CityDetail city={city} />;
}
