import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import DashboardCard from "../components/DashboardCard";
import { Col, Row } from "react-bootstrap";
import DashboardUser from "../components/DashboardUser";
import ArticleBox from "../components/ArticleBox";
import { DashboardStatic } from "../utils/StaticsData";

function Dashboard() {
  return (
    <section className="h-screen ">
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-10 pb-3 flex-wrap gap-x-3 gap-y-1">
              <h3 className="mb-0 text-lg font-semibold">Dashboard</h3>
              <p className="mb-0 flex items-center gap-2 text-sm">
                Dashboard{" "}
                <Icon icon="stash:chevron-right-light" width="25" height="25" />{" "}
                <span className="font-light">Dashboard</span>
              </p>
            </div>
            <Row className="m-0 p-0 gap-3 pb-4">
              {DashboardStatic.map((item, index) => (
                <Col xl={2} className="p-0" key={index}>
                  <DashboardCard item={item} />
                </Col>
              ))}
            </Row>
            <Row className="m-0 p-0 gap-3">
              <Col xl={3} className="p-0">
                <DashboardUser />
              </Col>
              <Col xl={3} className="p-0">
                <ArticleBox />
              </Col>
              <Col xl={3} className="p-0">
                <ArticleBox />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
