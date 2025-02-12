"use client";

import { FC, useState, useEffect } from "react";
import styles from './Cities.module.scss';
import { ICityList } from "@/types/cities/City.interface";

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
    <div className={styles.home}>
      <div className={styles.header}>
        <h1>Города в которых есть салоны</h1>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Поиск городов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.citiesGrid}>
        {paginatedCities.length > 0 && paginatedCities.map((city) => (
          <div key={city.id} className={styles.cityCard}>
            <a href={`/cities/${city.slug}`}>
              <div className={styles.cardContent}>
                <div className={styles.cityIcon}>
                  {getCityInitial(city.name)}
                </div>
                <div className={styles.cityInfo}>
                  <div className={styles.cityName}>{city.name}</div>
                  <div className={styles.cityMeta}>
                    Перейти на карту
                  </div>
                </div>
                <div className={styles.arrow}>→</div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {filteredCities.length === 0 && (
        <p className={styles.noResults}>Нет городов для отображения.</p>
      )}

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
            className={styles.pageButton}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        <h2>Города РФ</h2>
      </div>
    </div>
  );
};

export default Cities;
