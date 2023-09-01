import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQueryClient, useMutation } from "react-query";

const NewBlogSchema = Yup.object().shape({
  title: Yup.string().max(99).required("Title is required"),
  content: Yup.string().min(50).required("Content is required"),
});

const NewBlogPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const mutation = useMutation((data: { title: string; content: string }) =>
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        body: data.content,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json())
  );
  const queryClient = useQueryClient();
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: NewBlogSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);

      mutation.mutate(values, {
        onSuccess: () => {
          setIsSubmitting(false);
          queryClient.invalidateQueries("blogs");
          formik.resetForm();
          setMessage("Successfully created a new blog!");
        },
        onError: () => {
          setIsSubmitting(false);
          setMessage("Failed to create a new blog");
        },
      });
    },
  });
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 ml-4">Create New Blog</h1>
      <form className="px-4" onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className={`${
              formik.touched.title && formik.errors.title
                ? "border-red-500"
                : ""
            } appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="Enter title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <p className="text-red-500 text-xs italic">{formik.errors.title}</p>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 font-bold mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className={`${
              formik.touched.content && formik.errors.content
                ? "border-red-500"
                : ""
            } appearance-none border rounded w-full py-2 px-3 text-gray-700 h-40 resize-none leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="Enter content"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
          />
          {formik.touched.content && formik.errors.content ? (
            <p className="text-red-500 text-xs italic">
              {formik.errors.content}
            </p>
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`${
              isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-[#7F56D9] "
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          {message && (
            <div className="text-sm italic text-gray-600">{message}</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewBlogPage;
