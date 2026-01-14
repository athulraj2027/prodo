"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";
import Loading from "../Loading";

const DltTaskCard = ({
  setDltModal,
  onDelete,
  loading,
}: {
  setDltModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
  loading?: boolean;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm p-6 flex items-center justify-center z-50 animate-in fade-in duration-200">
      {loading && <Loading />}
      <Card className="w-full max-w-md dark:bg-gray-900 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 relative">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900">
            <AlertTriangle className="text-red-600 dark:text-red-400" />
          </div>

          <CardTitle>Delete Task</CardTitle>
          <CardDescription>This action cannot be undone</CardDescription>
        </CardHeader>

        <CardFooter className="flex gap-2">
          <Button
            variant="destructive"
            className="flex-1 gap-2"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>

          <Button
            variant="outline"
            className="flex-1 dark:bg-gray-900"
            onClick={() => setDltModal(false)}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DltTaskCard;
