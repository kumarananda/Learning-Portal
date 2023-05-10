/** @format */

export default function Error({ message }) {
  return (
    <div className="flex items-center">
      <div className="relative bg-red-200 max-w-xl px-4 py-2 text-red-800 rounded shadow w-full">
        <span className="block text-sm text-center">{message}</span>
      </div>
    </div>
  );
}
export function Info({ message }) {
  return (
    <div className="flex items-center">
      <div className="relative bg-yellow-200 max-w-xl px-4 py-2  text-yellow-800 rounded shadow w-full">
        <span className="block text-sm text-center">{message}</span>
      </div>
    </div>
  );
}
export function Loading({ message }) {
  return (
    <div className="flex items-center">
      <div className={`relative ${"bg-lime-200"} max-w-xl px-4 py-2   text-lime-800 rounded shadow w-full`}>
        <span className="block text-sm">{message}</span>
      </div>
    </div>
  );
}
