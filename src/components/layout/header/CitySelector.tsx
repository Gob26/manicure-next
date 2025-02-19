'use client'; // <---- ОБЯЗАТЕЛЬНО: Указываем, что это Client Component

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCitiesList } from '@/services/cities/cities_list/CitiesListService';
import { ICity } from '@/types/cities/City.interface';

const CitySelector: FC = () => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [selectedCitySlug, setSelectedCitySlug] = useState<string | null>(null); // Начальное значение null
  const [selectedCityName, setSelectedCityName] = useState<string | null>('Определение города...');
  const [isLoadingCity, setIsLoadingCity] = useState<boolean>(true);
  const router = useRouter();

  // ... detectCityByIP, setDefaultCity - функции остаются без изменений ...

  useEffect(() => {
    const fetchInitialData = async () => {
      console.log('CitySelector - fetchInitialData: starting...');
      try {
        const citiesData = await getCitiesList();
        console.log('CitySelector - fetchInitialData: citiesData received from getCitiesList:', citiesData);
        setCities(citiesData);

        await detectCityByIP();
      } catch (error) {
        console.error('CitySelector - fetchInitialData: Error during getCitiesList:', error);
        setDefaultCity();
        setIsLoadingCity(false);
      } finally {
        console.log('CitySelector - fetchInitialData: finished.');
      }
    };

    fetchInitialData();

    // Инициализация selectedCitySlug и selectedCityName из localStorage *ТОЛЬКО НА КЛИЕНТЕ*
    const storedCitySlug = localStorage.getItem('selectedCitySlug');
    const storedCityName = localStorage.getItem('selectedCityName');
    if (storedCitySlug && storedCityName) {
      setSelectedCitySlug(storedCitySlug);
      setSelectedCityName(storedCityName);
      console.log('CitySelector - useEffect (initial localStorage): City loaded from localStorage:', { cityName: storedCityName, citySlug: storedCitySlug });
    } else {
      console.log('CitySelector - useEffect (initial localStorage): No city found in localStorage.');
    }

  }, []); // Зависимость - пустой массив (useEffect выполняется только при монтировании на клиенте)


  useEffect(() => {
    if (selectedCitySlug && selectedCityName) {
      localStorage.setItem('selectedCitySlug', selectedCitySlug);
      localStorage.setItem('selectedCityName', selectedCityName);
      console.log('CitySelector - useEffect [selectedCitySlug, selectedCityName]: Saving to localStorage:', { selectedCityName, selectedCitySlug });
    }
  }, [selectedCitySlug, selectedCityName]);

  const handleCityChange = (city: ICity) => {
    setSelectedCitySlug(city.slug);
    setSelectedCityName(city.name);
    router.push(`/cities/${city.slug}`);
    console.log('CitySelector - handleCityChange: City changed to:', { cityName: city.name, citySlug: city.slug });
  };

  return (
    <div className="relative">
      {/* Кнопка с выбранным городом */}
      <button
        className="flex items-center text-white py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700"
        disabled={isLoadingCity}
      >
        <span>{isLoadingCity ? 'Определение города...' : selectedCityName}</span>
      </button>

      {/* Выпадающий список с городами */}
      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
        <ul>
          {cities.length > 0 ? (
            cities.map((city) => (
              <li key={city.id}>
                <button
                  onClick={() => handleCityChange(city)}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  {city.name}
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

function detectCityByIP() {
  throw new Error('Function not implemented.');
}
function setDefaultCity() {
  throw new Error('Function not implemented.');
}

