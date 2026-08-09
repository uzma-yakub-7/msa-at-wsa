"use client";

export function DeleteButton({ label = "Delete" }: { label?: string }) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        if (!confirm("Delete this? This can't be undone.")) {
          event.preventDefault();
        }
      }}
      className="text-sm font-semibold text-maroon-600 transition-colors hover:text-maroon-800"
    >
      {label}
    </button>
  );
}
