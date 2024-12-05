"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { fetchCandidateLevels, submitAssignment } from "../lib/api";
import { ApiError, FormData } from "../types/formTypes";
import clsx from "clsx";
import InputField from "./InputField";
import validationSchema from "validation/validationSchema";

export default function  AssignmentForm() {
  const router = useRouter();
  const [levels, setLevels] = useState<string[]>([]);
  const [apiError, setApiError] = useState<[] | null>(null);

  useEffect(() => {
    fetchCandidateLevels()
      .then(setLevels)
      .catch((error) => setApiError(error.message));
  }, []);

  const initialValues: FormData = {
    name: "",
    email: "",
    assignment_description: "",
    github_repo_url: "",
    candidate_level: "",
  };

  const handleSubmit = async (values: FormData, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
    setApiError(null);

    try {
      await submitAssignment(values);
      router.push("/thank-you");
    } catch (error) {
      const typedError = error as ApiError;
      if (typedError.errorData?.errors) setApiError(typedError.errorData.errors);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Submit Your Assignment
      </h1>
      {apiError && (
        <div
          className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-500 dark:border-red-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Danger</span>
          <div>
            <span className="font-medium">Validation failed:</span>
            <ul className="mt-1.5 list-disc list-inside">
              {Array.isArray(apiError) && apiError.map((er, index) => (
                <li key={index}>{er}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="space-y-6">
            <InputField label="Name" name="name" />
            <InputField label="Email" name="email" type="email" />
            <InputField label="Assignment Description" name="assignment_description" as="textarea" />
            <InputField label="GitHub Repository URL" name="github_repo_url" type="url" />
            <div>
              <label className="label-text" htmlFor="candidate_level">
                Candidate Level
              </label>
              <Field
                id="candidate_level"
                as="select"
                name="candidate_level"
                className="input-field"
              >
                <option value="">Select a level</option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="candidate_level"
                component="p"
                className="error-message"
              />
            </div>

            <button
              type="submit"
              disabled={!isValid || !dirty || isSubmitting}
              className={clsx(
                "button-submit",
                isSubmitting && "cursor-not-allowed opacity-50"
              )}
              >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};