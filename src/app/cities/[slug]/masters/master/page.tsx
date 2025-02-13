import React from 'react';
import './Master.module.scss';

const Master: React.FC = () => {
  return (
    <div className="masterContainer">
      <div className="header">
        <h1>Мастер маникюра: Иванова Ольга</h1>
        <p className="specialty">Специальность: Маникюр, педикюр, дизайн ногтей</p>
        <p className="rating">Рейтинг: ⭐⭐⭐⭐⭐</p>
      </div>
      <div className="bio">
        <h2>О мастере:</h2>
        <p>Ольга работает мастером маникюра уже более 5 лет, специализируется на создании уникальных дизайнов и уходе за ногтями.</p>
      </div>
      <div className="contact">
        <h2>Контакты:</h2>
        <p>Телефон: +7 900 123 45 67</p>
        <p>Email: olga.manicure@mail.com</p>
      </div>
      <div className="services">
        <h2>Услуги:</h2>
        <ul>
          <li>Маникюр - 1000 рублей</li>
          <li>Педикюр - 1200 рублей</li>
          <li>Дизайн ногтей - 500 рублей</li>
        </ul>
      </div>
      <button className="bookButton">Записаться на прием</button>
    </div>
  );
};

export default Master;
