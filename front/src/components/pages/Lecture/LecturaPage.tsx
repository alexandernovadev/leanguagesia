import {
  ChevronLeft,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Dessert,
  Theater,
} from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const markdownText = `# The best practice with zustand and more

When working with Zustand, a lightweight state management library for React, it's crucial to 
follow best practices to ensure efficient and maintainable code. 

## Key Points

1. **Organize your stores modularly**, keeping your logic decoupled and reusable. 
2. Use middleware for tasks like logging or persistence.
3. Ensure that your stores are kept lean by only including necessary state. 

Zustand's flexible API allows for better performance when using shallow comparison
or selectors, which can optimize re-renders. Combined with React's features like 
suspense and concurrent rendering, Zustand can scale effectively in larger applications.
`;

export const LecturaPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-gradient-to-b px-4 pt-2 pb-4 from-black-800 via-customGreen-100 to-customBlack-100 text-black-200 min-h-screen flex flex-col">
      <div className="mb-2 flex justify-between">
        <section className="flex items-center justify-center gap-3">
          <Link to="/">
            <ChevronLeft className="w-10 h-10 text-green-800" />
          </Link>
          <span
            className="text-xs bg-customGreen-50 text-green-700 px-2 py-1 rounded-full flex items-center"
            aria-label={`Duration: 3 minutes`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            3 min
          </span>
          <span className="border py-1 rounded-xl px-2 text-sm cursor-pointer text-green-600" title="Level A1">Level: <strong>A1</strong></span>
        </section>
        <div className="flex items-center justify-center gap-3">
          <Dessert className="w-6 h-6 text-green-800" />
          <Theater className="w-6 h-6 text-green-800" />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto mb-4 px-3 rounded-lg border border-gray-700">
        <ReactMarkdown className="" children={markdownText} />
      </div>
      <div className="mb-4">
        <div className="h-1 w-full bg-gray-700 rounded-full">
          <div
            className="h-1 bg-green-800 rounded-full"
            // style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <button className={`p-2  opacity-50 cursor-not-allowed`}>
          <SkipBack className="w-6 h-6" />
        </button>
        <button className="p-2 bg-green-800 rounded-full">
          {isPlaying ? (
            <Pause className="w-6 h-6 text-black" />
          ) : (
            <Play className="w-6 h-6 text-black" />
          )}
        </button>
        <button className={`p-2 `}>
          <SkipForward className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
