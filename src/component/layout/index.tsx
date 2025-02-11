import Header from "../header/index";
import { Outlet } from "react-router-dom";
import { SolanaContextProvider } from '../sol/SolanaContextProvider';
import { WaterMark } from "antd-mobile";
import "./index.css";

function Layout() {
  return (
    <div className="layout_wrapper">
      <SolanaContextProvider>
        <Header />
        <div className="content_wrapper">
          <Outlet />
        </div>
      </SolanaContextProvider>
      <WaterMark content={"newbie.tools"} fontColor="rgba(0, 0, 0, .08)" />
    </div>
  );
}

export default Layout;
