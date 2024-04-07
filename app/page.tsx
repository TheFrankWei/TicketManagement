"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { ErrorMessage } from "@hookform/error-message";
import { AnimatePresence, motion } from "framer-motion";

interface FormInput {
  name: string;
  email: string;
  description: string;
}

export default function Home() {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(
      `email sent to ${data?.email}.\nSubject: Thank you for reporting your issue!\nBody:\nThank you for reporting your issue!\nIssue:\n${data?.description}`
    );
  };
  return (
    <main className="flex min-h-screen flex-col items-center">
      <AnimatePresence>
        <div className="py-6 text-bold">Report an Issue</div>
        {isSubmitSuccessful ? (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="py-6">Thanks for reporting your issue!</div>
            <button onClick={() => reset()} className="button">
              Report Another Issue
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Input
                  id="Name"
                  {...register("name", {
                    required: { value: true, message: "Name is required" },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => <p className="error">{message}</p>}
                />
              </div>
              <div>
                <Input
                  id="Email"
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => <p className="error">{message}</p>}
                />
              </div>
              <div>
                <TextArea
                  id="Description"
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
              <button type="submit" className="button">
                Submit
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
