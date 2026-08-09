export function EmptyState({ message }: { message: string }) {
  return (
    <div className="mt-10 rounded-2xl border border-dashed border-maroon-200 bg-white/60 p-10 text-center text-sm text-maroon-900/60">
      {message}
    </div>
  );
}
