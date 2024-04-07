export default function TextArea({
    id,
    label = id,
  }: {
    id: string;
    label?: string;
  }) {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id}>{label}</label>
        <textarea id={id} className="min-h-6" />
      </div>
    );
  }
  