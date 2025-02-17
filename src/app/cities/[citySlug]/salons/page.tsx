import { Suspense } from "react";
import { getSalonsList } from "@/services/salons/SalonsListService";
import { ISalonsPageProps } from "@/types/salons/Salon.interface";
import SalonsList from "@/components/salons/salons/SalonsList";

export default async function SalonsPage({params}: ISalonsPageProps) {
  const citySlug = params.citySlug;
  console.log("--> SalonsPage started for citySlug:", citySlug);

  try {
    console.log("--> Запрос мастеров для города:", citySlug);
    const salons = await getSalonsList(citySlug)
    console.log("--> Получены данные о салоне:", salons)
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Мастера в городе {citySlug}</h1>
        <Suspense fallback={<div className="text-center">Загрузка...</div>}>
          <SalonsList salons={salons} citySlug={citySlug} />
        </Suspense>
      </div>
    );   
  } catch (error) {
    console.error("--> Ошибка при получени салона:", error);
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded">
          <h2 className="text-red-700 font-medium">Произошла ошибка при загрузке данных</h2>
          <p className="text-red-600 mt-1">Пожалуйста, попробуйте позже</p>
        </div>
      </div>
    );
  }
}