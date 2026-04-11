"use client";

export default function RefreshButton() {
  return (
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="text-blue-600 hover:underline not-italic bg-transparent border-0 p-0 cursor-pointer"
    >
      [refresh]
    </button>
  );
}
