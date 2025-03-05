import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Modal } from "../../shared/Modal";
import { Edit2 } from "lucide-react";
import Input from "../../ui/Input";
import { TextAreaCustom } from "../../ui/TextArea";
import { BACKURL } from "../../../api/backConf";
import { Card as CardType } from "./types/types";

interface FormLectureProps {
  lecture: CardType;
  onUpdate: (updatedLecture: CardType) => void;
}

export const FormLecture: React.FC<FormLectureProps> = ({
  lecture,
  onUpdate,
}) => {
  const { control, handleSubmit, setValue } = useForm<CardType>({
    defaultValues: lecture,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CardType> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKURL}/api/lectures/${lecture._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update lecture");
      }

      const updatedLecture = await response.json();
      onUpdate(updatedLecture);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating lecture:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-labelledby="edit-lecture"
      className="bg-customBlack-200 p-6 md:p-8 rounded-lg w-full max-w-3xl mx-auto"
    >
      <h2
        id="edit-lecture"
        className="text-sm md:text-2xl font-bold text-white mb-6 text-center"
      >
        Edit | {lecture._id}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Time & Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="time" className="text-white block mb-1">
              Duration (minutes)
            </label>
            <Input
              name="time"
              control={control}
              placeholder="Time (min)"
              type="number"
              disabled
            />
          </div>

          <div>
            <label htmlFor="level" className="text-white block mb-1">
              Difficulty Level
            </label>
            <Input
              name="level"
              control={control}
              placeholder="Level"
              disabled
            />
          </div>
        </div>

        {/* Language */}
        <div>
          <label htmlFor="language" className="text-white block mb-1">
            Language
          </label>
          <Input
            name="language"
            control={control}
            placeholder="Language"
            disabled
          />
        </div>

        {/* Image */}
        <div>
          <label htmlFor="img" className="text-white block mb-1">
            Image (https://res.cloudinary.com/dv8wurqdp/image/upload/)
          </label>
          <Input name="img" control={control} placeholder="Image URL" />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="text-white block mb-1">
            Lecture Content
          </label>
          <TextAreaCustom
            name="content"
            control={control}
            placeholder="Lecture Content"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-600 transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};
