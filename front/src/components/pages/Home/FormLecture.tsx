import { useForm, SubmitHandler } from "react-hook-form";
import { Loader2, RotateCcw, Sparkles } from "lucide-react";

import Input from "../../ui/Input";
import { TextAreaCustom } from "../../ui/TextArea";
import { Card as CardType } from "./types/types";
import { useLectureStore } from "../../../store/useLectureStore";

interface FormLectureProps {
  lecture: CardType;
  onClose: () => void;
}

export const FormLecture: React.FC<FormLectureProps> = ({
  lecture,
  onClose,
}) => {
  const { control, handleSubmit, getValues } = useForm<CardType>({
    defaultValues: lecture,
  });

  const { actionLoading, putLectureImage, putLecture } = useLectureStore();

  const onSubmit: SubmitHandler<CardType> = async (data) => {
    await putLecture(lecture._id! as string, data);
    onClose();
  };

  // 🚀 Generate Image Handler
  const handleGenerateImage = async () => {
    const { content, img } = getValues(); // Get lecture content and existing image

    if (!content) {
      alert("Lecture content is required to generate an image.");
      return;
    }

    await putLectureImage(lecture._id! as string, content, img || "");
  };

  // Disable all fields when loading
  const isDisabled = actionLoading.putImage;

  return (
    <div
      aria-labelledby="edit-lecture"
      className="bg-customBlack-200 p-4 md:p-8 rounded-lg max-w-[720px] min-w-[520px] overflow-y-auto max-h-[90vh]"
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

        {/* Image with Generate Button */}
        <div>
          <label
            htmlFor="img"
            className="text-white mb-1 flex justify-between items-center"
          >
            Image
            <button
              type="button"
              onClick={handleGenerateImage}
              className=" text-white p-1 m-1 rounded-full border border-white  transition flex items-center gap-2"
              disabled={isDisabled}
            >
              {isDisabled ? (
                <Sparkles className="animate-pulse" />
              ) : (
                <Sparkles />
              )}
            </button>
          </label>
          <Input
            name="img"
            control={control}
            placeholder="Image URL"
            disabled={isDisabled}
          />
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
            disabled={isDisabled}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-600 transition flex justify-center items-center"
          disabled={actionLoading.put || isDisabled}
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
