"use client";

import { FC, useEffect } from "react";
import Script from "next/script";
import styles from "./City.module.scss";
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
                  <h3 style="color: #0f0f0f; margin-bottom: 8px; font-weight: 500;">
                    ${city.name}
                  </h3>
                  <p style="color: #606060; font-size: 14px;">
                    ${city.subject || "Не указан"}
                  </p>
                </div>
              `,
              hintContent: city.name
            },
            {
              preset: "islands#circleDotIcon",
              iconColor: '#0f0f0f'
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
    <div className={styles.cityContainer}>
      <Script 
        src="https://api-maps.yandex.ru/2.1/?apikey=ВАШ_API_КЛЮЧ&lang=ru_RU"
        strategy="afterInteractive"
        onLoad={initMap}
      />
      
      <div className={styles.item}>
        <div className={styles.header}>
          <h2>{city.name}</h2>
          <div className={styles.population}>
            {formatPopulation(city.population)} жителей
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <div className={styles.label}>Район</div>
            <div className={styles.value}>{city.district || "Не указан"}</div>
          </div>
          
          <div className={styles.detailItem}>
            <div className={styles.label}>Субъект</div>
            <div className={styles.value}>{city.subject || "Не указан"}</div>
          </div>
          
          <div className={styles.detailItem}>
            <div className={styles.label}>Координаты</div>
            <div className={styles.value}>
              {city.latitude || "?"}, {city.longitude || "?"}
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button className="primary">
              Подробнее
            </button>
            <button className="secondary">
              Поделиться
            </button>
          </div>
        </div>

        <div id="map" className={styles.mapContainer} />
      </div>
    </div>
  );
};

export default CityDetail;