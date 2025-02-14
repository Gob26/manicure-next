import Link from "next/link";
import { IProps } from "@/types/masters/Master.interface";


export default function MastersList({ masters, citySlug }: IProps) {
    if (masters.masters.length === 0) return <p>Мастеров пока нет</p>;
  
    return (
      <ul>
        {masters.masters.map((master) => (
          <li key={master.slug}>
            <Link href={`/cities/${citySlug}/masters/${master.slug}`}>
              {master.name} - {master.specialty}
            </Link>
          </li>
        ))}
      </ul>
    );
  }