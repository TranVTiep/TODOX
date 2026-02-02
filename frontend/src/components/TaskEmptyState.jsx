import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";
const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="size-12 mx-auto text-muted-foreground"></Circle>
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "Không có nhiệm vụ đang làm."
              : filter === "completed"
                ? "Không có nhiệm vụ đã hoàn thành."
                : "Không có nhiệm vụ nào."}
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter === "all"
              ? "Thêm nhiệm vụ mới của bạn."
              : `Thay đổi bộ lọc để xem các nhiệm vụ khác${filter === "active" ? " đã hoàn thành" : " đang làm"}`}
          </p>
        </div>
      </div>
    </Card>
  );
};
export default TaskEmptyState;
