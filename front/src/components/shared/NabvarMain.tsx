import { BookOpen, Home, User, Zap, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const NabvarMain = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around py-4 bg-customBlack-200">
      <Link to="/" className="rounded-lg p-1">
        <Home className="text-green-700 w-6 h-6" />
      </Link>
      <Link to="/generator" className="rounded-lg p-1">
        <Zap className="w-6 h-6" />
      </Link>
      <Link to="/words" className="rounded-lg p-1">
        <BookOpen className="w-6 h-6" />
      </Link>

      <Link to="/settings" className="rounded-lg p-1">
        <Settings className="w-6 h-6" />
      </Link>
      <Link to="/profile" className="rounded-lg p-1">
        <User className="w-6 h-6" />
      </Link>
    </nav>
  );
};
