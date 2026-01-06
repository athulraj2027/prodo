import TaskKanbanBoard from "@/components/shadcnmod/kanbanExample";

export default function UserDashboard() {
  return (
    <div className=" w-full  px-4">
      <div className="flex h-full gap-4">
        {/* Kanban – unchanged */}
        <div className="flex-3 overflow-hidden rounded-xl border">
          <TaskKanbanBoard />
        </div>

        {/* Utilities – 3/5 of previous width */}
        <div className="flex-[0.6] rounded-xl border p-4">
          {/* Utilities content goes here */}
        </div>
      </div>
    </div>
  );
}
