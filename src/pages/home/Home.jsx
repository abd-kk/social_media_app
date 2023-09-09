import { NavBar } from "../../components/Nav bar/NavBar";
import { SideBar } from "../../components/Side Bar/SideBar";
import { Feeds } from "../../components/feeds/Feeds";
import { RightSideBar } from "../../components/right side bar/RightSideBar";
import "./home.css";

export const Home = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="homepage-container">
        <SideBar />
        <Feeds />
        <RightSideBar />
      </div>
    </div>
  );
};
