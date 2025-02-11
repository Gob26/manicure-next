import { ICityDetails } from "@/types/cities/City.interface";
import { FC } from "react"; 
import styles from ".City.module.scss"

const CityItem: FC<ICityDetails> = ({ city }) => {
  return (
    <div className={styles.item}>
      <h2>{city.name}</h2>
      <p>{city.district}</p>
    </div>
  );
};