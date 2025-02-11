import React from 'react';
import { getCityDetails } from '@/services/cities/cities_list/CitiesListService';
import { ICity, ICityPageProps } from '@/types/cities/City.interface';

export default async function CityPage({ params }: ICityPageProps) {
  // Исправляем получение slug, так как params нужно await
  const { slug } = await params;
  
  const cityData: any = await getCityDetails(slug);
  
  if (!cityData || !cityData.city) {
    return <div className="p-4">Город не найден</div>;
  }

  // Теперь берём данные из вложенного объекта city
  const { city } = cityData;
  
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">
        {city.name}
      </h1>
      
      <div className="space-y-2">
        <p>
          <strong>Район:</strong> {city.district || "Не указан"}
        </p>
        <p>
          <strong>Субъект:</strong> {city.subject || "Не указан"}
        </p>
        <p>
          <strong>Население:</strong> {' '}
          {city.population ? city.population.toLocaleString() : "Не указано"}
        </p>
        <p>
          <strong>Широта:</strong> {city.latitude || "Не указана"}
        </p>
        <p>
          <strong>Долгота:</strong> {city.longitude || "Не указана"}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Описание города:</h3>
        <p>{cityData.description?.text || "Описание города отсутствует."}</p>
      </div>
    </div>
  );
}