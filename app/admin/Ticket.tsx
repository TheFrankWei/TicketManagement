"use client";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { ErrorMessage } from "@hookform/error-message";
import { AnimatePresence, motion } from "framer-motion";
import { Status } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const STATUS_OPTIONS = [
  { label: "New", value: Status.NEW },
  { label: "In Progress", value: Status.INPROGRESS },
  { label: "Resolved", value: Status.RESOLVED },
];

interface TicketProps {
  id: string;
  name: string;
  email: string;
  status: Status;
  description: any;
  createdAt: Date;
}

export interface AdminTicketFormInput {
  ticketId: string;
  email: string;
  status: Status;
  description?: string;
}

export default function Ticket(Props: TicketProps) {
  const { name, status, email, description, createdAt, id } = Props;
  const createdDate = new Date(createdAt);
  const queryClient = useQueryClient();

  //status from enum
  const STATUS = STATUS_OPTIONS.filter((option) => status === option.value);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<AdminTicketFormInput>({
    defaultValues: { ticketId: id, email, status: STATUS[0]?.value },
  });

  const [open, setOpen] = useState<boolean>(false);

  const createTicketPost = async (data: AdminTicketFormInput) => {
    const { ticketId, email, description, status } = data;
    await fetch("/api/admin/ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketId,
        email,
        status,
        description,
      }),
    });
  };

  const ticketPostMutation = useMutation({
    mutationFn: createTicketPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      reset();
    },
  });

  const onSubmit: SubmitHandler<AdminTicketFormInput> = async (data) => {
    ticketPostMutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-1 w-full border-b-2 border-solid border-zealthyNeutralSecondary">
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
            <div>{createdDate.toString()}</div>
            <div className="bg-zealthySecondary rounded-full px-4 py-2 text-white">
              {STATUS[0]?.label}
            </div>
            <div className="group-hover:text-zealthySecondary">
              {open ? (
                <CaretDown size={24} alt="latest" />
              ) : (
                <CaretUp size={24} alt="earliest" />
              )}
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
              <div className="bg-zealthyNeutralSecondary p-2 rounded-full w-fit">
                {description[0]?.description}
              </div>
              <div>Previous Responses:</div>
              <div className="flex flex-col gap-1">
                {description.slice(1).map(
                  (item: any, index: number) =>
                    item?.description && (
                      <div
                        key={index}
                        className="bg-zealthyNeutralSecondary p-2 rounded-full w-fit"
                      >
                        {item?.description}
                      </div>
                    )
                )}
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
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
                error={errors}
              />

              <TextArea
                id="description"
                label="Response:"
                {...register("description", {})}
                error={errors}
              />

              <div className="text-center md:text-start pt-2">
                <button
                  type="submit"
                  className="button"
                  disabled={ticketPostMutation.status === "pending"}
                >
                  {ticketPostMutation.status === "pending"
                    ? "Submitting..."
                    : "Submit"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
