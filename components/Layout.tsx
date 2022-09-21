import React, { ReactNode } from "react";
import BackgroundCard from "./BackgroundCard";
import Navbar from "./Navbar";

type Props = {
	children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <div className="dark--mode">
    <Navbar />
    <div className="layout" style={{height: "200vh"}}>{props.children}</div>
	<BackgroundCard>
				<h1>afsdfasdf</h1>
			</BackgroundCard>
  </div>
);

export default Layout;
