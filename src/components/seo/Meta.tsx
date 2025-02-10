import { FC, PropsWithChildren } from "react";
import { IMeta } from "@/types/seo/meta.interface";

const getTitle = (title: string) => `Manicure | ${title}`;

const Meta: FC<PropsWithChildren<IMeta>> = ({ title, description, children }) => {
  return (
    <>
      {description ? (
        <>
          <title>{getTitle(title)}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={getTitle(title)} />
          <meta property="og:description" content={description} />
        </>
      ) : (
        <meta name="robots" content="noindex, nofollow" />
      )}
      {children}
    </>
  );
};

export default Meta;