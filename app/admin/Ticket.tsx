"use client";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { ErrorMessage } from "@hookform/error-message";
import { AnimatePresence, motion } from "framer-motion";

export enum Status {
  new = "new",
  progress = "inProgress",
  resolved = "resolved",
}

export const STATUS_OPTIONS = [
  { label: "New", value: Status.new },
  { label: "In Progress", value: Status.progress },
  { label: "Resolved", value: Status.resolved },
];

interface TicketProps {
  id: string;
  name: string;
  email: string;
  status: Status;
  description: string;
}

export interface AdminTicketFormInput {
  id: string;
  email: string;
  status: Status;
  description: string;
}

export default function Ticket(Props: TicketProps) {
  const { name, status, email, description, id } = Props;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AdminTicketFormInput>({ defaultValues: { id, email } });

  const [open, setOpen] = useState<boolean>(false);

  const onSubmit: SubmitHandler<AdminTicketFormInput> = async (data) => {
    const { id, email, description, status } = data;
    const res = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        email,
        status,
        description,
      }),
    });
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <AnimatePresence>
        <button
          className="flex flex-row justify-between group hover:bg-zealthyNeutralSecondary py-6 px-4 cursor-pointer transition-colors"
          onClick={() => setOpen(!open)}
        >
          <div className="my-auto col-gap-2 text-start">
            <div>{name}</div>
            <div>{email}</div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="bg-zealthySecondary rounded-full px-4 py-2 text-white">
              {status}
            </div>
            <div className="group-hover:text-zealthySecondary">
              {open ? <CaretUp size={24} /> : <CaretDown size={24} />}
            </div>
          </div>
        </button>

        {open && (
          <motion.div
            key="info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2 px-4 pt-2 pb-4"
          >
            <div className="flex flex-col">
              <div>Request:</div>
              <div>{description}</div>
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
                  {...register("status", {
                    required: {
                      value: true,
                      message: "Status is required",
                    },
                  })}
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
                  label="Response:"
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
              <div className="text-center md:text-end pt-2">
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
