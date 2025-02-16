import Link from "next/link";
import { IProps } from "@/types/masters/Master.interface";

export default function MastersList({ masters, citySlug }: IProps) {
  console.log("MastersList props:", { masters, citySlug });

  // Проверка, что masters - это массив
  if (!masters || !Array.isArray(masters)) {
    console.error("masters undefined или не является массивом в MastersList:", masters);
    return <p>Ошибка загрузки данных о мастерах.</p>;
  }

  if (masters.length === 0) {
    return <p>Мастеров пока нет</p>;
  }

  return (
    <ul className="space-y-2">
      {masters.map((master) => (
        <li key={master.slug} className="p-2 border rounded hover:bg-gray-50">
          <Link href={`/cities/${citySlug}/masters/${master.slug}`}>
            <div className="flex flex-col">
              <span className="font-medium">{master.name}</span>
              <span className="text-sm text-gray-600">{master.specialty}</span>
              {master.address && <span className="text-sm text-gray-500">{master.address}</span>}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
