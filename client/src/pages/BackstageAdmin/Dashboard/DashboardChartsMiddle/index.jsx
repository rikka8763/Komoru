import React, { useState } from "react";
import DemoColumnOccupancyRate from "./DemoColumnOccupancyRate";
import DemoLineRoomTurnover from "./DemoLineRoomTurnover";
import DemoPieParticipate from "./DemoPieParticipate";
import DemoPieExam from "./DemoPieExam";
import DemoPieActivityType from "./DemoPieActivityType";
import DemoLiquidCoupon from "./DemoLiquidCoupon";
import DemoLiquidFeedback from "./DemoLiquidFeedback";
import { useEffect } from "react";
import BackstageLoding from "../../../../components/BackstageLoading";
function DashboardChartsMiddle({ dateData, setTitleArea }) {
  /*20220707 YN
中區報表資料初始化*/
  const [middleData, setMiddleData] = useState();

  /*20220707 YN
  報表資料載入過程初始化*/
  const [loading, setLoading] = useState(false);

  /*20220709 YN
   區域標題狀態設定*/
  useEffect(() => {
    setTitleArea("中部");
  }, []);

  /*20220707 YN
  取後端中區報表資料*/
  useEffect(() => {
    const newContacts = {
      cityId: "2",
      dateRange: `${dateData.dateRange}`,
    };
    setLoading(false);
    fetch("http://localhost:5000/dashboard/getDashboardDataListByCondition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newContacts),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.dataList.IsOrderAfterExamItem);
        setMiddleData(data.dataList);
        setLoading(true);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [dateData]);
  return (
    <>
      <div className="mx-5 me-5">
        <div className="row ms-5 me-5">
          {loading ? (
            <>
              <div
                className="p-5 "
                style={{
                  backgroundColor: "white",
                  boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                }}
              >
                <div className="pb-3">
                  <p className="km-modal-report-title">入住率</p>
                </div>
                {middleData && (
                  <DemoColumnOccupancyRate middleData={middleData} />
                )}
              </div>

              <div
                className="mt-5 p-5"
                style={{
                  backgroundColor: "white",
                  boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                }}
              >
                <div className="pb-3">
                  <p className="km-modal-report-title">房型營業額</p>
                </div>
                {middleData && <DemoLineRoomTurnover middleData={middleData} />}
              </div>

              <div className="row mb-5 mt-2 g-0">
                <div
                  className="col-4"
                  style={{
                    padding: "20px 20px 0 0",
                  }}
                >
                  <div
                    className="mt-3"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                    }}
                  >
                    <div className="pt-3 ps-3">
                      <p className="km-modal-report-title">參與活動率</p>
                    </div>

                    {middleData && (
                      <DemoPieParticipate middleData={middleData} />
                    )}
                  </div>
                </div>
                <div
                  className="col-4"
                  style={{
                    padding: "20px 0 0 0",
                  }}
                >

                  <div
                    className="mt-3"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                    }}
                  >
                    <div className="pt-3 ps-3">
                      <p className="km-modal-report-title">測驗後下訂率</p>
                    </div>
                    {middleData && <DemoPieExam middleData={middleData} />}
                  </div>
                </div>

                <div
                  className="col-4"
                  style={{
                    padding: "20px 0 0 20px",
                  }}
                >

                  <div
                    className="mt-3"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                    }}
                  >
                    <div className="pt-3 ps-3">
                      <p className="km-modal-report-title">活動類型</p>
                    </div>
                    {middleData && (
                      <DemoPieActivityType middleData={middleData} />
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-5 g-0">
                <div
                  className="col-6"
                  style={{
                    padding: "0 20px 0 0",
                  }}
                >
                  <div
                    className="pb-5"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                    }}
                  >
                    <div className="pt-3 ps-4">
                      <p className="km-modal-report-title">優惠卷使用率</p>
                    </div>
                    {middleData && <DemoLiquidCoupon middleData={middleData} />}
                  </div>
                </div>
                <div
                  className="col-6"
                  style={{
                    padding: "0 0 0 20px",
                  }}
                >
                  <div
                    className="pb-5 "
                    style={{
                      backgroundColor: "white",
                      boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                    }}
                  >
                    <div className="pt-3 ps-4">
                      <p className="km-modal-report-title">回饋率</p>
                    </div>
                    {middleData && (
                      <DemoLiquidFeedback middleData={middleData} />
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center">
              <BackstageLoding />
            </div>
          )}
        </div>
      </div>



    </>
  );
}

export default DashboardChartsMiddle;
