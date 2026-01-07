import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";
import { TASK_PRIORITIES } from "@/lib/constants/task_priority";
import { TASK_TAG_LIST, TaskTag } from "@/lib/constants/task_tag";

export default function CreateTaskForm({
  setCreateTask,
}: {
  setCreateTask: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selectedPriority, setSelectedPriority] = useState("MEDIUM");
  const [checkpoints, setCheckpoints] = useState([""]);
  const [selectedTag, setSelectedTag] = useState<TaskTag | null>(null);

  const handlePriorityClick = (value: string) => {
    setSelectedPriority(selectedPriority === value ? "" : value);
  };

  const handleTagClick = (tag: TaskTag) => {
    setSelectedTag(tag);
  };

  const addCheckpoint = () => {
    setCheckpoints([...checkpoints, ""]);
  };

  const removeCheckpoint = (index: number) => {
    setCheckpoints(checkpoints.filter((_, i) => i !== index));
  };

  const updateCheckpoint = (index: number, value: string) => {
    const newCheckpoints = [...checkpoints];
    newCheckpoints[index] = value;
    setCheckpoints(newCheckpoints);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm p-6 flex items-center justify-center z-50">
      <Card className="w-full max-w-3xl text-sm dark:bg-gray-900">
        <CardHeader>
          <CardTitle>Create a new task</CardTitle>
          <CardDescription>
            Enter your task details and start working on it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Complete frontend features"
                  className="text-xs"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add some details for the task"
                  className="text-xs resize-none"
                  rows={4}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Priority</Label>
                <div className="flex flex-wrap gap-2">
                  {TASK_PRIORITIES.map((priority) => (
                    <button
                      key={priority.value}
                      type="button"
                      onClick={() => handlePriorityClick(priority.value)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border-2 transition-all duration-200 ${
                        selectedPriority === priority.value
                          ? priority.color +
                            " ring-2 ring-offset-2 ring-blue-500 scale-105"
                          : priority.color + " opacity-60"
                      }`}
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Tag</Label>
                <div className="flex flex-wrap gap-2">
                  {TASK_TAG_LIST.map((tag) => (
                    <button
                      key={tag.value}
                      type="button"
                      onClick={() => handleTagClick(tag.value)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border-2 transition-all duration-200
          ${
            selectedTag === tag.value
              ? `${tag.color} ring-2 ring-offset-2 ring-blue-500 scale-105`
              : `${tag.color} opacity-60`
          }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Checkpoints */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label>Checkpoints</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={addCheckpoint}
                  className="h-7 text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto max-h-70 space-y-2 pr-1">
                {checkpoints.map((checkpoint, index) => (
                  <div key={index} className="flex gap-2 items-center group">
                    <Input
                      type="text"
                      placeholder={`Checkpoint ${index + 1}`}
                      value={checkpoint}
                      onChange={(e) => updateCheckpoint(index, e.target.value)}
                      className="text-xs flex-1"
                    />
                    {checkpoints.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCheckpoint(index)}
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button type="button" className="flex-1">
            Create
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1 dark:bg-gray-900"
            onClick={() => setCreateTask(false)}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
