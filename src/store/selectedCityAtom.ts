import { atom } from 'jotai';

const getInitialCity = () => {
  // Получаем slug из localStorage или задаем значение по умолчанию
  if (typeof window !== 'undefined') {
    return localStorage.getItem('selectedCitySlug') || 'stavropol'; // Используем 'stavropol' как дефолт
  }
  return 'stavropol'; // Возвращаем дефолтное значение на сервере
};

export const selectedCityAtom = atom<string>(getInitialCity());
