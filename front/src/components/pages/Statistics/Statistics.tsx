import { MainLayout } from "../../shared/Layouts/MainLayout";
import { BarChart, BookOpen } from "lucide-react";

export const Statistics = () => {
  return (
    <MainLayout>
      <section className="flex flex-col w-full pb-4 gap-4">
        <h1 className="text-4xl font-extrabold mb-4 text-white-800 text-start mx-3">
          Statistics
        </h1>

        <div className="flex flex-row flex-wrap gap-3 md:justify-start md:items-start justify-center items-center">
       
          <div className="w-72 p-4 rounded-2xl border-4 border-green-400 shadow-xl flex flex-col items-start bg-transparent">
            <section className="flex items-center w-full gap-4 mb-2">
              <BarChart size={40} className="text-green-500" />
              <h2 className="text-3xl font-bold text-green-500">
                Words <span className="text-3xl">34</span>
              </h2>
            </section>
            <div className="grid grid-cols-2 w-full text-white-700 text-md gap-y-1">
              <span>🟢 Easy:</span>{" "}
              <span className="font-bold text-white-900">12</span>
              <span>🟡 Medium:</span>{" "}
              <span className="font-bold text-white-900">31</span>
              <span>🔴 Hard:</span>{" "}
              <span className="font-bold text-white-900">34</span>
            </div>
          </div>

          <div className="w-72 p-4 rounded-2xl border-4 border-yellow-400 shadow-xl flex flex-col items-start bg-transparent">
            <section className="flex items-center w-full gap-4 mb-2">
              <BookOpen size={40} className="text-yellow-500" />
              <h2 className="text-3xl font-bold text-yellow-500">
                Lectures <span className="text-3xl">34</span>
              </h2>
            </section>
            <div className="w-full text-white-700 text-md space-y-1">
              <div className="flex justify-start gap-4 w-full">
                <span>
                  A1: <span className="font-bold text-white-900">02</span>
                </span>
                <span>
                  A2: <span className="font-bold text-white-900">32</span>
                </span>
              </div>
              <div className="flex justify-start gap-4 w-full">
                <span>
                  B1: <span className="font-bold text-white-900">34</span>
                </span>
                <span>
                  B2: <span className="font-bold text-white-900">45</span>
                </span>
              </div>
              <div className="flex justify-start gap-4 w-full">
                <span>
                  C1: <span className="font-bold text-white-900">12</span>
                </span>
                <span>
                  C2: <span className="font-bold text-white-900">31</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
