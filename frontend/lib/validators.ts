import { toast } from "sonner";

export interface FormDataProps {
  name: string;
  description: string;
  selectedPriority: string;
  selectedTag: string;
  date: Date | undefined;
  checkpoints: string[];
}

export const validateCreateTaskForm = (formData: FormDataProps): boolean => {
  const {
    name,
    description,
    selectedPriority,
    selectedTag,
    date,
    checkpoints,
  } = formData;

  // ---------- BASIC REQUIRED CHECKS ----------
  if (!name || name.trim().length === 0) {
    toast.error("Task name is required");
    return false;
  }

  if (!selectedPriority) {
    toast.error("Please select a priority");
    return false;
  }

  if (!selectedTag) {
    toast.error("Please select a tag");
    return false;
  }

  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    toast.error("Please select a valid due date");
    return false;
  }

  // ---------- LENGTH VALIDATIONS ----------
  if (name.trim().length < 5 || name.trim().length > 20) {
    toast.error(
      "Task name must be at least 5 characters and maximum 20 characters",
    );
    return false;
  }

  // ---------- CHECKPOINTS VALIDATION ----------
  if (!Array.isArray(checkpoints)) {
    toast.error("Invalid checkpoints data");
    return false;
  }

  if (checkpoints.length === 0) {
    toast.error("Please add at least one checkpoint");
    return false;
  }

  const invalidCheckpoint = checkpoints.some(
    (cp) => !cp || cp.trim().length < 3,
  );

  if (invalidCheckpoint) {
    toast.error("Each checkpoint must be at least 3 characters");
    return false;
  }

  // ---------- DATE VALIDATION (OPTIONAL RULE) ----------
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (date < today) {
    toast.error("Due date cannot be in the past");
    return false;
  }

  // ---------- ALL GOOD ----------
  return true;
};
