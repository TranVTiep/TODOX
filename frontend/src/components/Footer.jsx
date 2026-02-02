import React from "react";
const Footer = ({ completedTaskCount, activeTaskCount }) => {
  return (
    <>
      {completedTaskCount + activeTaskCount > 0 && (
        <div className="text-center ">
          <p className="text:sm text-muted-foreground">
            {completedTaskCount > 0 && (
              <>
                Chúc mừng bạn đã hoàn thành {completedTaskCount} nhiệm vụ!
                {activeTaskCount > 0 &&
                  ` Bạn còn ${activeTaskCount}  nữa thôi Cố lên!!.`}
              </>
            )}
            {completedTaskCount === 0 && activeTaskCount > 0 && (
              <>Hãy bắt đầu làm {activeTaskCount} nhiệm vụ ngay thôi!</>
            )}
          </p>
        </div>
      )}
    </>
  );
};
export default Footer;
