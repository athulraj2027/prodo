import TaskKanbanBoard from "@/components/shadcnmod/kanbanExample";
import UtilityBar from "@/components/user/UtilityBar";
import { Task } from "@/types/task";

export default function UserDashboard() {

  // api call the tasks for today
  const initialTasks: Task[] = [
    {
      id: "1",
      name: "Implement Binary Search Tree",
      description:
        "Create a balanced BST with insert, delete, and search operations",
      status: "IN_PROGRESS",
      checkpoints: [
        { id: "c1", text: "Create Node class", completed: true },
        { id: "c2", text: "Implement insert method", completed: true },
        { id: "c3", text: "Implement search method", completed: false },
        { id: "c4", text: "Write unit tests", completed: false },
      ],
      timeSpent: 3600,
      priority: "HIGH",
      tag: "DSA",
    },
    {
      id: "2",
      name: "Build User Authentication",
      description: "Implement JWT-based authentication with refresh tokens",
      status: "TODO",
      checkpoints: [
        { id: "c5", text: "Set up JWT library", completed: false },
        { id: "c6", text: "Create login endpoint", completed: false },
        { id: "c7", text: "Add refresh token logic", completed: false },
      ],
      timeSpent: 0,
      priority: "HIGH",
      tag: "Project",
    },
    {
      id: "3",
      name: "Learn React Server Components",
      description: "Study and practice RSC patterns in Next.js 14",
      status: "BACKLOG",
      checkpoints: [
        { id: "c8", text: "Read official docs", completed: false },
        { id: "c9", text: "Build demo app", completed: false },
      ],
      timeSpent: 1200,
      priority: "MEDIUM",
      tag: "Learning",
    },
    {
      id: "4",
      name: "Optimize Database Queries",
      description: "Add indexes and optimize slow queries",
      status: "COMPLETED",
      checkpoints: [
        { id: "c10", text: "Identify slow queries", completed: true },
        { id: "c11", text: "Add indexes", completed: true },
        { id: "c12", text: "Test performance", completed: true },
      ],
      timeSpent: 7200,
      priority: "HIGH",
      tag: "Project",
    },
    {
      id: "5",
      name: "Practice Dynamic Programming",
      description: "Solve 10 DP problems on LeetCode",
      status: "TODO",
      checkpoints: [
        { id: "c13", text: "Solve Fibonacci variations", completed: false },
        { id: "c14", text: "Solve knapsack problem", completed: false },
      ],
      timeSpent: 2400,
      priority: "MEDIUM",
      tag: "DSA",
    },
  ];
  return (
    <div className=" w-full  px-4">
      <div className="flex h-full gap-4">
        <div className="flex-3 overflow-hidden rounded-xl border">
          <TaskKanbanBoard initialTasks={initialTasks} />
        </div>

        <UtilityBar />
      </div>
    </div>
  );
}
