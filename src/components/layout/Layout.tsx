import { FC, PropsWithChildren } from "react";
import Header from "./header/Header";
import { IMeta } from "@/types/seo/meta.interface";
import Meta from "../seo/Meta";
import Footer from "./footer/Footer";

type LayoutProps = PropsWithChildren<IMeta>;

const Layout: FC<LayoutProps> = ({ children, title, description }) => (
  <Meta title={title} description={description}>
    <Header />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </Meta>
);

export default Layout;
