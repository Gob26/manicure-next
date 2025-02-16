import { Suspense } from "react";
import { getMastersList } from "@/services/masters/MastersListService";
import { IMastersPageProps } from "@/types/masters/Master.interface";
import MastersList from "@/components/masters/masters/MastersList";

export default async function MastersPage({ params }: IMastersPageProps) {
  const citySlug = params.citySlug; // Убираем Promise.resolve
  console.log("--> MastersPage started for citySlug:", citySlug);

  try {
    console.log("--> Запрос мастеров для города:", citySlug);
    
    const masters = await getMastersList(citySlug);
    console.log("--> Получены данные о мастерах:", masters);

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Мастера в городе {citySlug}</h1>
        <Suspense fallback={<div className="text-center">Загрузка...</div>}>
          <MastersList masters={masters} citySlug={citySlug} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error(`--> Ошибка при получении мастеров:`, error);
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
