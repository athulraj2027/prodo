import TaskKanbanBoard from "@/components/shadcnmod/kanbanExample";
import UtilityBar from "@/components/user/UtilityBar";

export default function UserDashboard() {
  return (
    <div className=" w-full  px-4">
      <div className="flex h-full gap-4">
        <div className="flex-3 overflow-hidden rounded-xl border">
          <TaskKanbanBoard />
        </div>
        <UtilityBar />
      </div>
    </div>
  );
}
