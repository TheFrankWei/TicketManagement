export default function Input({
  id,
  label = id,
}: {
  id: string;
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </div>
  );
}
