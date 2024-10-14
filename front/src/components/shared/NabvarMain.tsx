import { BookOpen, Home, User, Zap } from "lucide-react";

export const NabvarMain = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around py-4 bg-customBlack-200">
      <button className="rounded-lg p-1">
        <Home className="text-green-700 w-6 h-6" />
      </button>
      <button className="rounded-lg p-1">
        <Zap className="w-6 h-6" />
      </button>
      <button className="rounded-lg p-1">
        <BookOpen className="w-6 h-6" />
      </button>

      <button className="rounded-lg p-1">
        <User className="w-6 h-6" />
      </button>
    </nav>
  );
};
