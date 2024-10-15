import { MainLayout } from "../../shared/Layouts/MainLayout";
import "../../../styles/buttonanimatiocss.css";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

export const GeneratorPage = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <MainLayout>
      <button
      onClick={() => setIsLoaded(!isLoaded)}
      className={`${isLoaded ? "box" : "boxEmp"} m-4`}>
        <span>
          <SendHorizontal />
        </span>
      </button>
    </MainLayout>
  );
};
