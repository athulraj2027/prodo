const TagBadge = ({ tag }: { tag: string }) => {
  const colors = {
    DSA: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Project: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Learning:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
        colors[tag] || "bg-gray-100 text-gray-700"
      }`}
    >
      {tag}
    </span>
  );
};

export default TagBadge;
