"use client";

import { FC, useEffect } from "react";
import Script from "next/script";
import { ICityResponse } from "@/types/cities/City.interface";

declare global {
  interface Window {
    ymaps: any;
  }
}

const CityDetail: FC<ICityResponse> = ({ city }) => {
  const initMap = () => {
    if (typeof window !== "undefined" && window.ymaps) {
      window.ymaps.ready(() => {
        try {
          const mapContainer = document.getElementById("map");
          if (!mapContainer) {
            console.error("Контейнер карты не найден");
            return;
          }

          const map = new window.ymaps.Map("map", {
            center: [city.latitude || 55.7558, city.longitude || 37.6173],
            zoom: 13,
            controls: ["zoomControl", "fullscreenControl"]
          });

          const placemark = new window.ymaps.Placemark(
            [city.latitude || 55.7558, city.longitude || 37.6173],
            {
              balloonContent: `
                <div style="padding: 12px; text-align: left;">
                  <h3 style="color: var(--text-color); margin-bottom: 8px; font-weight: 500;">
                    ${city.name}
                  </h3>
                  <p style="color: var(--text-color); font-size: 14px;">
                    ${city.subject || "Не указан"}
                  </p>
                </div>
              `,
              hintContent: city.name
            },
            {
              preset: "islands#circleDotIcon",
              iconColor: 'var(--text-color)',
            }
          );

          map.geoObjects.add(placemark);
          map.setCenter([city.latitude || 55.7558, city.longitude || 37.6173]);
        } catch (error) {
          console.error("Ошибка при инициализации карты:", error);
        }
      });
    }
  };

  useEffect(() => {
    initMap();
  }, [city]);

  const formatPopulation = (population?: number) => {
    if (!population) return "Не указано";
    return new Intl.NumberFormat('ru-RU').format(population);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-[var(--background-color)] transition-colors duration-300">
      <Script
        src="https://api-maps.yandex.ru/2.1/?apikey=ВАШ_API_КЛЮЧ&lang=ru_RU"
        strategy="afterInteractive"
        onLoad={initMap}
      />

      <div className="bg-[var(--light-background-color)] rounded-lg overflow-hidden transition-colors duration-300 dark:bg-gray-800">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-medium text-[var(--text-color)] flex items-center gap-2 transition-colors duration-300">
            <span className="text-base">📍</span>{city.name}
          </h2>
          <div className="text-sm text-[var(--text-color)] mt-1 transition-colors duration-300">
            {formatPopulation(city.population)} жителей
          </div>
        </div>

        <div className="p-4 grid gap-3">
          <div className="flex items-center py-2 px-3 rounded hover:bg-[var(--hover-color)] dark:hover:bg-gray-700 transition-colors duration-300">
            <div className="text-[var(--text-color)] text-sm w-32 transition-colors duration-300">Район</div>
            <div className="text-[var(--text-color)] font-medium transition-colors duration-300">{city.district || "Не указан"}</div>
          </div>

          <div className="flex items-center py-2 px-3 rounded hover:bg-[var(--hover-color)] dark:hover:bg-gray-700 transition-colors duration-300">
            <div className="text-[var(--text-color)] text-sm w-32 transition-colors duration-300">Субъект</div>
            <div className="text-[var(--text-color)] font-medium transition-colors duration-300">{city.subject || "Не указан"}</div>
          </div>

          <div className="flex items-center py-2 px-3 rounded hover:bg-[var(--hover-color)] dark:hover:bg-gray-700 transition-colors duration-300">
            <div className="text-[var(--text-color)] text-sm w-32 transition-colors duration-300">Координаты</div>
            <div className="text-[var(--text-color)] font-medium transition-colors duration-300">
              {city.latitude || "?"}, {city.longitude || "?"}
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <button className="flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium bg-[var(--primary-color)] text-[var(--light-background-color)] hover:bg-[var(--hover-color)] dark:bg-[var(--dark-primary-color)] dark:text-gray-800 dark:hover:bg-gray-300 transition-colors duration-300">
              Подробнее
            </button>
            <button className="flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-[var(--text-color)] hover:bg-[var(--hover-color)] dark:hover:bg-gray-600 transition-colors duration-300">
              Поделиться
            </button>
          </div>
        </div>

        <div id="map" className="mt-2 h-[450px]" />
      </div>
    </div>
  );
};

export default CityDetail;
