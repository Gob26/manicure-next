import React from 'react';
import './Salon.module.scss';

const Salon: React.FC = () => {
  return (
    <div className="salonContainer">
      <div className="header">
        <h1>Салон красоты "Красота и Уход"</h1>
        <p className="location">Адрес: Москва, ул. Примерная, д. 15</p>
      </div>
      <div className="about">
        <h2>О салоне:</h2>
        <p>Наш салон предоставляет широкий спектр услуг по уходу за ногтями, а также предлагает разнообразные процедуры для ухода за руками и ногами.</p>
      </div>
      <div className="contact">
        <h2>Контакты:</h2>
        <p>Телефон: +7 495 123 45 67</p>
        <p>Email: beautycare@mail.com</p>
      </div>
      <div className="services">
        <h2>Услуги:</h2>
        <ul>
          <li>Маникюр - 1500 рублей</li>
          <li>Педикюр - 1800 рублей</li>
          <li>Уход за руками - 1200 рублей</li>
        </ul>
      </div>
      <button className="bookButton">Записаться на прием</button>
    </div>
  );
};

export default Salon;
