import Input from "@/components/Input";
import TextArea from "@/components/TextArea";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="flex flex-col gap-4">
        <Input id="Name" />
        <Input id="Email" />
        <TextArea id="Description" />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
