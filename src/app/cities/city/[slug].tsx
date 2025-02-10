import { NextPage } from "next";
import { useRouter } from "next/router";

const CityPage: NextPage = () => {
  const { asPath, pathname } = useRouter();
  
  return <div>[City page]</div>;
};

export default CityPage;