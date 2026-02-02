import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";
const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(task.title || "");
  const updateTask = async () => {
    try {
      setIsEdit(false);
      await api.put(`/tasks/${task._id}`, { title: updateTitle });
      toast.success(`Nhiệm vụ đã được cập nhật: ${updateTitle}`);
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi khi cập nhật nhiệm vụ:", error);
      toast.error("Lỗi khi cập nhật nhiệm vụ");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    }
  };
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Xóa task thành công");
      handleTaskChanged();
    } catch (error) {
      toast.error("Lỗi khi xóa task");
      console.error("Lỗi khi xóa task:", error);
    }
  };
  const toggleTaskCompleteButton = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completeAt: new Date().toISOString(),
        });
        toast.success(`${task.title} đã hoàn thành!`);
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completeAt: null,
        });
        toast.success(`${task.title} đã được đánh dấu là chưa hoàn thành!`);
      }
      handleTaskChanged();
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái nhiệm vụ");
      console.error("Lỗi khi cập nhật trạng thái nhiệm vụ:", error);
    }
  };
  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card shadow-custom-md border-0 hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-75",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* nút tròn */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "completed"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary",
          )}
          onClick={toggleTaskCompleteButton}
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>
        {/* Hiển thị hoặc chỉnh sửa tiêu đề task */}
        <div className="flex-1 min-w-0">
          {isEdit ? (
            <Input
              type="text"
              placeholder="Cần phải làm gì"
              className="flex-1 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEdit(false);
                setUpdateTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground",
              )}
            >
              {task.title}
            </p>
          )}
          {/* ngày tạo và ngày hoàn thành */}
          <div className="flex items-center mt-1 gap-2">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleDateString()}
              {task.completeAt && (
                <>
                  <span className=" text-xs text-muted-foreground">-</span>
                  <Calendar className="size-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {new Date(task.completedAt).toLocaleDateString()}
                  </span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* nút chỉnh và nút xóa */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* nút edit */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEdit(true);
              setUpdateTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>
          {/* nút delete */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default TaskCard;
