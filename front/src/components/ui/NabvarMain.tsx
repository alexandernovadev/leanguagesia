import { BookOpen, Home, User, Zap } from "lucide-react";

export const NabvarMain = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around py-4 bg-customBlack-200">
      <Home className="text-green-700 w-6 h-6" />
      <Zap className="w-6 h-6" />
      <BookOpen className="w-6 h-6" />
      <User className="w-6 h-6" />
    </nav>
  );
};
