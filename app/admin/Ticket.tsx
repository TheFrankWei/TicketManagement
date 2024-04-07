"use client";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { ErrorMessage } from "@hookform/error-message";
import { AnimatePresence, motion } from "framer-motion";

enum Status {
  new = "new",
  progress = "inProgress",
  resolved = "resolved",
}

export const STATUS_OPTIONS = [
  { label: "New", value: Status.new },
  { label: "In Progress", value: Status.progress },
  { label: "Resolved", value: Status.resolved },
];

interface TicketProps {}

interface FormInput {
  status: Status;
  description: string;
}

export default function Ticket(Props: TicketProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>();

  const [open, setOpen] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data, "email sent");
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <AnimatePresence>
        <div
          className="flex flex-row justify-between group hover:bg-zealthyNeutralSecondary py-6 px-4"
          onClick={() => setOpen(!open)}
        >
          <div>Ticket Name</div>
          <div className="group-hover:text-zealthySecondary">
            {open ? <CaretUp size={24} /> : <CaretDown size={24} />}
          </div>
        </div>

        {open && (
          <motion.div
            key="info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2 px-4 pt-2 pb-4"
          >
            <div>
              <div>Status</div>
              <div>Description</div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <div className="w-fit">
                <Select
                  id="status"
                  label="Update Status"
                  options={STATUS_OPTIONS}
                  {...register("status", { required: true })}
                />
                <ErrorMessage
                  errors={errors}
                  name="status"
                  render={({ message }) => <p className="error">{message}</p>}
                />
              </div>
              <div>
                <TextArea
                  id="description"
                  label="Update Description"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Description is required",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="description"
                  render={({ message }) => <p className="error">{message}</p>}
                />
              </div>
              <div className="text-end pt-2">
                <button type="submit" className="button">
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
