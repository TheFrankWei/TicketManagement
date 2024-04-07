export default function Select({
  id,
  label = id,
  options,
}: {
  id: string;
  label?: string;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <select id={id}>
        {options.map((option) => (
          <option className="text-black" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
