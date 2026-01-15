type TagType = "DSA" | "Project" | "Learning" | "Side_project";

const TagBadge = ({ tag }: { tag: TagType }) => {
  const colors = {
    DSA: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Project: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Learning:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Side_project:
      "bg-orange-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  } as const;

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[tag]}`}
    >
      {tag}
    </span>
  );
};

export default TagBadge;
