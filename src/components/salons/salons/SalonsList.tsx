import Link from "next/link";
import { IProps } from "@/types/salons/Salon.interface";

export default function SalonsList({ salons, citySlug }: IProps) {
    console.log("SalonsList props:", { salons, citySlug });

    // Проверка, что salons - это массив
    if (!salons || !Array.isArray(salons)) {
        console.error("salons undefined или не является массивом в SalonsList:", salons);
        return <p>Ошибка загрузки данных о салонах.</p>;
    }

    if (salons.length === 0) {
        return <p>Салонов пока нет</p>;
    }

    return (
        <ul className="space-y-2">
          {salons.map((salons) => (
            <li key={salons.slug} className="p-2 border rounded hover:bg-gray-50">
              <Link href={`/cities/${citySlug}/salons/${salons.slug}`}>
                <div className="flex flex-col">
                  <span className="font-medium">{salons.name}</span>
                  <span className="text-sm text-gray-600">{salons.phone}</span>
                  {salons.address && <span className="text-sm text-gray-500">{salons.address}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
    );
}