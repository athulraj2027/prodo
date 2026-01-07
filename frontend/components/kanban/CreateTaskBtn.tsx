"use client";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import CreateTaskForm from "../forms/CreateTaskForm";

const CreateTaskBtn = () => {
  const [createTask, setCreateTask] = useState(false);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCreateTask(true)}
          className="rounded-full size-7 p-1 shadow-2xl dark:bg-gray-900 
             hover:scale-110 hover:rotate-12 hover:shadow-3xl
             active:scale-95
             transition-all duration-300 ease-out
             animate-pulse-subtle
             hover:animate-none"
        >
          <PlusIcon />
          <span className="sr-only">Add new task</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="px-2 py-1 text-xs">
        Add new task
      </TooltipContent>
      {createTask && <CreateTaskForm setCreateTask={setCreateTask} />}
    </Tooltip>
  );
};

export default CreateTaskBtn;
