import TaskKanbanBoard from "@/components/shadcnmod/kanbanExample";
import UtilityBar from "@/components/user/UtilityBar";

export default function UserDashboard() {
  return (
    <div className="w-full px-4">
      <div className="flex flex-col md:flex-row h-full gap-4">
        {/* Kanban */}
        <div className="w-full md:flex-3 overflow-hidden rounded-xl border">
          <TaskKanbanBoard />
        </div>

        {/* Utility */}
        <div className="w-full md:w-87.5">
          <UtilityBar />
        </div>
      </div>
    </div>
  );
}
