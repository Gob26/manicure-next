import { FC } from "react";
import styles from './Cities.module.scss';
import { ICityList } from "@/types/cities/City.interface";

const Cities: FC<ICityList> = ({cities}) => {
  return (
    <div className={styles.home}>
        <h1>Города в которых есть салоны</h1>
        <ul>
            {cities.length > 0 && cities.map((city) => (
                <li key={city.id}>
                    <a href={`/cities/${city.slug}`}>{city.name}</a>
                </li>
            ))}
        </ul>
        <div className={styles.content}>
            <h2>Тест городов
            <p>Some content</p></h2>
        </div>
    </div>
  );
};

export default Cities;