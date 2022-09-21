import React, { ReactNode } from "react";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="dark--mode">
    <Navbar />
    <div className="layout" style={{height: "200vh"}}>{props.children}</div>
   
  </div>
);

export default Layout;
