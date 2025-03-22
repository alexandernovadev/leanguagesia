import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../ui/Input";
import { TextAreaCustom } from "../../ui/TextArea";
import { Card as CardType } from "./types/types";
import { useLectureStore } from "../../../store/useLectureStore";
import { Loader2 } from "lucide-react";

interface FormLectureProps {
  lecture: CardType;
  onClose: () => void;
}

export const FormLecture: React.FC<FormLectureProps> = ({
  lecture,
  onClose,
}) => {
  const { control, handleSubmit } = useForm<CardType>({
    defaultValues: lecture,
  });
  const { putLecture, actionLoading } = useLectureStore();

  const onSubmit: SubmitHandler<CardType> = async (data) => {
    await putLecture(lecture._id! as string, data);

    onClose();
  };

  return (
    <div
      aria-labelledby="edit-lecture"
      className="bg-customBlack-200 p-4 md:p-8 rounded-lg  max-w-[720px] min-w-[520px] overflow-y-auto max-h-[90vh]"
    >
      <h2
        id="edit-lecture"
        className="text-sm md:text-2xl font-bold text-white mb-4 md:mb-6 text-center"
      >
        Edit | {lecture._id}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-5"
      >
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
            Image 
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
          className="w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-600 transition flex justify-center items-center"
          disabled={actionLoading.put}
        >
          {actionLoading.put ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
};
