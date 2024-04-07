"use client";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import { useState } from "react";

interface TicketProps {}

export const STATUS_OPTIONS = [
  { label: "New", value: "new" },
  { label: "In Progress", value: "inProgress" },
  { label: "Resolved", value: "resolved" },
];

export default function Ticket(Props: TicketProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-1">
      <div onClick={() => setOpen(!open)}>Ticket Name</div>
      {open && (
        <div className="flex flex-col gap-2">
          <div>
            <div>Status</div>
            <div>Description</div>
          </div>
          <form>
            <Select
              id="status"
              label="Update Status"
              options={STATUS_OPTIONS}
            />
            <TextArea id="description" label="Update Description" />
          </form>
        </div>
      )}
    </div>
  );
}
