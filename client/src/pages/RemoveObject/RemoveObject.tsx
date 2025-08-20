import { Scissors, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRemoveImageObject } from "../../hooks/image";
import toast from "react-hot-toast";

const RemoveObject = () => {
  const {
    mutate: handleRemoveObject,
    data,
    isPending,
  } = useRemoveImageObject();
  const [input, setInput] = useState<File | null>(null);
  const [object, setObject] = useState("");
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input) {
      if (object.split(" ").length > 1) {
        return toast.error("Please enter only one object name");
      } else {
        const formData = new FormData();
        formData.append("image", input);
        formData.append("object", object);
        handleRemoveObject(formData);
      }
    }
  };
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload image</p>
        <input
          onChange={(e) => setInput(e.target.files![0])}
          type="file"
          accept="image/*"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
          // value={input}
        />

        <p className="mt-6 text-sm font-medium">
          Describe object name to remove
        </p>
        <textarea
          onChange={(e) => setObject(e.target.value)}
          value={object}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="e.g., watch or spoon, only single object name"
          required
        />
        <button
          disabled={isPending}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {isPending ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin" />
          ) : (
            <Scissors className="w-5" />
          )}
          Remove object
        </button>
      </form>
      {/* Right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>
        {!data ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Scissors className="w-9 h-9" />
              <p>Upload an image and click “Remove Object to get started</p>
            </div>
          </div>
        ) : (
          <img src={data?.data} alt="image" className="mt-3 w-full h-full" />
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
