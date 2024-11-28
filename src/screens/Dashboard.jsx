import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import DashboardCard from "../components/DashboardCard";
import { Col, Row } from "react-bootstrap";
import DashboardUser from "../components/DashboardUser";
import ArticleBox from "../components/ArticleBox";

function Dashboard() {
  return (
    <section className="h-screen ">
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Header />
          <div className="px-9">
            <div className="flex items-center justify-between pt-10 pb-3">
              <h3 className="mb-0 text-lg font-semibold">Dashboard</h3>
              <p className="mb-0 flex items-center gap-2 text-sm">
                Dashboard{" "}
                <Icon icon="stash:chevron-right-light" width="25" height="25" />{" "}
                <span className="font-light">Dashboard</span>
              </p>
            </div>
            <Row className="m-0 p-0 gap-3 pb-4">
              {[1, 2, 3, 4, 5].map(() => (
                <Col xl={2} className="p-0">
                  <DashboardCard />
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
