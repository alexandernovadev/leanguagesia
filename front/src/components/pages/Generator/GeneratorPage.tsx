import { MainLayout } from "../../shared/Layouts/MainLayout";
import "../../../styles/buttonanimatiocss.css";
import { SendHorizontal } from "lucide-react";


export const GeneratorPage = () => {
  return (
    <MainLayout>
      <button className="box m-4">
        <span><SendHorizontal /></span>
      </button>
    </MainLayout>
  );
};


