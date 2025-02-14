import MastersList from "@/components/masters/masters/MastersList";
import { getMastersList } from "@/services/masters/MastersListService";
import { IMastersPageProps } from "@/types/masters/Master.interface";
export default async function MastersPage({ params }: IMastersPageProps) {
  const masters = await getMastersList(params.slug);

  return (
    <div>
      <h1>Мастера в городе {params.slug}</h1>
      <MastersList masters={masters} citySlug={params.slug} />
    </div>
  );
}
