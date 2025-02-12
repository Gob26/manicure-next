"use client"; // Указываем, что компонент клиентский

import { FC, useEffect } from "react";
import styles from "./City.module.scss";
import { ICityResponse } from "@/types/cities/City.interface";

declare global {
  interface Window {
    ymaps: any;
  }
}

const CityDetail: FC<ICityResponse> = ({ city }) => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.ymaps) {
      window.ymaps.ready(() => {
        console.log("Яндекс.Карты загружены!");
        const map = new window.ymaps.Map("map", {
          center: [city.latitude || 55.7558, city.longitude || 37.6173],
          zoom: 10,
        });
        const placemark = new window.ymaps.Placemark([city.latitude || 55.7558, city.longitude || 37.6173], {
          balloonContent: city.name,
        });
        map.geoObjects.add(placemark);
      });
    }
  }, [city]);

  return (
    <div className={styles.item}>
      <h2 className="text-2xl font-semibold text-gray-800">{city.name}</h2>
      <div className="space-y-2">
        <p><strong>Район:</strong> {city.district || "Не указан"}</p>
        <p><strong>Субъект:</strong> {city.subject || "Не указан"}</p>
        <p><strong>Население:</strong> {city.population ? city.population.toLocaleString() : "Не указано"}</p>
        <p><strong>Широта:</strong> {city.latitude || "Не указана"}</p>
        <p><strong>Долгота:</strong> {city.longitude || "Не указана"}</p>
      </div>
      <div id="map" className="mt-4" style={{ width: "100%", height: "400px" }}></div> {/* Здесь будет карта */}
    </div>
  );
};

export default CityDetail;
