"use client";

import { FC, useState, useEffect } from "react";
import { ICityList } from "@/types/cities/City.interface";
import Link from "next/link";

const Cities: FC<ICityList> = ({ cities }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Функция для получения первую букву города для иконки
  const getCityInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // Фильтрация городов по поисковому запросу
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Пагинация: отображаем 10 городов на страницу
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCities = filteredCities.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-[var(--background-color)] p-6 sm:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-2xl md:text-3xl font-medium text-[var(--text-color)] mb-4 transition-colors duration-300 after:content-[''] after:block after:w-16 after:h-1 after:bg-primary after:mt-2">
          Города в которых есть салоны
        </h1>
      </div>

      <div className="max-w-4xl mx-auto mb-4">
        <input
          type="text"
          placeholder="Поиск городов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-md text-[var(--text-color)] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {paginatedCities.length > 0 && paginatedCities.map((city) => (
          <div key={city.id} className="bg-[var(--light-background-color)] rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:shadow-none animate-fade-in">
            <Link 
            href={`/cities/${city.slug}`} className="block p-4 text-[var(--text-color)] no-underline transition-colors duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-lg text-[var(--text-color)] transition-colors duration-300">
                  {getCityInitial(city.name)}
                </div>
                <div className="flex-1">
                  <div className="text-lg font-medium mb-1 text-[var(--text-color)] transition-colors duration-300">{city.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    Перейти на карту
                  </div>
                </div>
                <div className="arrow text-gray-400 transform transition-transform duration-300 hover:translate-x-1 hover:text-primary">→</div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {filteredCities.length === 0 && (
        <p className="text-center text-red-600 dark:text-red-500 mt-4 transition-colors duration-300">Нет городов для отображения.</p>
      )}

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
            className="px-4 py-2 mx-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:dark:bg-gray-500 disabled:text-gray-500 disabled:dark:text-gray-400"
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-12 bg-[var(--light-background-color)] dark:bg-gray-800 rounded-xl p-6 shadow-sm transition-colors duration-300">
        <h2 className="text-xl font-medium text-[var(--text-color)] mb-4 transition-colors duration-300">Города РФ</h2>
      </div>
    </div>
  );
};

export default Cities;
