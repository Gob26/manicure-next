import { getCitiesList, getCityDetails } from '@/services/cities/cities_list/CitiesListService';
import { ICity } from '@/types/cities/City.interface';


export async function generateStaticParams() {
  const cities = await getCitiesList();
  return cities.map((city) => ({
    slug: city.slug,
  }));
}

export default async function CityPage({ params }: CityPageProps) {
  const city = await getCityDetails(params.slug);

  if (!city) {
    // Обработка случая, когда город не найден
    return <div>Город не найден</div>;
  }

  return (
    <div>
      <h1>{city.name}</h1>
    </div>
  );
}
