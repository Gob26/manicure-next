// src/components/Header/CitySelector.tsx

'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCitiesList } from '@/services/cities/cities_list/CitiesListService';

const CitySelector: FC = () => {
  const [cities, setCities] = useState<string[]>([]); // Массив для хранения городов
  const [selectedCity, setSelectedCity] = useState<string | null>(localStorage.getItem('selectedCity') || 'Москва');
  const router = useRouter();

  // Загружаем города с помощью API
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await getCitiesList();
        setCities(citiesData.map(city => city.name)); // Заполняем список городов
      } catch (error) {
        console.error('Ошибка при получении списка городов:', error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      localStorage.setItem('selectedCity', selectedCity);  // Сохраняем выбранный город в localStorage
    }
  }, [selectedCity]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);  // Обновляем состояние выбранного города

    // Изменяем URL с добавлением города в путь
    router.push(`/${city.toLowerCase()}`);  // Перенаправляем на URL города, например, /stavropol
  };

  return (
    <div className="relative">
      {/* Иконка с выбранным городом */}
      <button className="flex items-center text-white py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700">
        <span>{selectedCity}</span>
      </button>

      {/* Выпадающий список с городами */}
      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
        <ul>
          {cities.length > 0 ? (
            cities.map((city) => (
              <li key={city}>
                <button
                  onClick={() => handleCityChange(city)}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  {city}
                </button>
              </li>
            ))
          ) : (
            <li>Загружаются города...</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CitySelector;
