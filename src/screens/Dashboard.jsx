import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import { Col, Row } from "react-bootstrap";
import DashboardUser from "../components/DashboardUser";
import ArticleBox from "../components/ArticleBox";
import { DashboardStatic } from "../utils/StaticsData";
import { useEffect, useState } from "react";
import SublyApi from "../HelperApis";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import RecentTransaction from "../components/RecentTransaction";
import { Loader } from "../utils/Loader";

function Dashboard() {
  const { token } = useSelector((state) => state.user.userdetail);
  const [userActivity, setUserActivity] = useState("");
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState("");

  useEffect(() => {
    recentActivityHandle();
    dashboardHandle();
  }, []);

  async function recentActivityHandle() {
    setLoading(true);
    await SublyApi.fetchRecentActivity(token)
      .then((response) => {
        setLoading(false);
        if (response.status == "success") {
          setUserActivity(response.data);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function dashboardHandle() {
    setLoading(true);
    await SublyApi.dashboardStatics(token)
      .then((response) => {
        console.log("setDashboardData", response);

        setLoading(false);
        if (response.status == "success") {
          setDashboardData(response);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className="h-screen ">
      {loading ? <Loader /> : ""}
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Header />
          <div className="px-9 max-xl:px-2">
            <div className="flex items-center justify-between pt-4 pb-3 flex-wrap gap-x-3 gap-y-1">
              <h3 className="mb-0 text-lg font-semibold">Dashboard</h3>
              <p className="mb-0 flex items-center gap-2 text-sm">
                Dashboard{" "}
                <Icon icon="stash:chevron-right-light" width="25" height="25" />{" "}
                <span className="font-light">Dashboard</span>
              </p>
            </div>
            <Row className="m-0 p-0 gap-3 pb-4">
              <Col xl={2} className="p-0">
                <DashboardCard
                  dashboardData={dashboardData?.totalSubscribedUsers}
                  heading={"Total Subscribers"}
                />
              </Col>
              <Col xl={2} className="p-0">
                <DashboardCard
                  dashboardData={dashboardData?.totalRevenue}
                  heading={"Total Revenue"}
                />
              </Col>
              <Col xl={2} className="p-0">
                <DashboardCard
                  dashboardData={dashboardData?.totalPostViews}
                  heading={"Total Post Views"}
                />
              </Col>
              <Col xl={2} className="p-0">
                <DashboardCard
                  dashboardData={dashboardData?.totalUsers}
                  heading={"Total Users"}
                />
              </Col>
            </Row>
            <Row className="m-0 p-0 gap-y-3 gap-x-8">
              <Col xl={3} className="p-0">
                <DashboardUser recentUsers={userActivity?.recentUsers} />
              </Col>
              <Col xl={3} className="p-0">
                <ArticleBox recentArticle={userActivity?.recentPosts} />
              </Col>
              <Col xl={3} className="p-0">
                <RecentTransaction
                  transaction={userActivity?.recentTransactions}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
