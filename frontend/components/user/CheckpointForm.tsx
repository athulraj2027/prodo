"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

const CheckpointForm = ({
  setCheckpointForm,
  loading,
  onSubmit,
}: {
  setCheckpointForm: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  onSubmit: (value: string) => Promise<void>;
}) => {
  const [checkpoint, setCheckpoint] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!checkpoint.trim()) return;
    await onSubmit(checkpoint);
    setCheckpoint("");
    setCheckpointForm(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <Card className="w-full max-w-md text-sm dark:bg-gray-900 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg text-white">
            <span className="loading loading-infinity loading-lg"></span>
            <p className="mt-2 text-sm">Please wait</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Add Checkpoint</CardTitle>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setCheckpointForm(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent>
            <div className="grid gap-2">
              <Label>Checkpoint</Label>
              <Input
                placeholder="Ex: Finish API integration"
                className="text-xs"
                value={checkpoint}
                onChange={(e) => setCheckpoint(e.target.value)}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex gap-2">
            <Button type="submit" className="flex-1">
              Add
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 dark:bg-gray-900"
              onClick={() => setCheckpointForm(false)}
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CheckpointForm;
