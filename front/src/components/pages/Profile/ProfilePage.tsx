import { MainLayout } from "../../shared/Layouts/MainLayout";

export const ProfilePage = () => {
  return (
    <MainLayout>
      <section className="px-12 py-8rounded-lg shadow-md max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <img
            src="https://api.multiavatar.com/xs.png"
            alt="Profile avatar"
            className="w-24 h-24 rounded-full border-4 border-green-600 mr-6"
          />
          <h1 className="text-2xl font-bold text-green-800">Alexander Nova</h1>
        </div>

        <hr className="border-t-2 border-gray-300 mb-6" />

        <h3 className="text-lg font-semibold text-green-700 mb-4">Settings</h3>
        <ul className="text-gray-700 space-y-2">
          <li className="hover:text-green-600 cursor-pointer">Setting one</li>
          <li className="hover:text-green-600 cursor-pointer">Setting two</li>
          <li className="hover:text-green-600 cursor-pointer">Setting three</li>
        </ul>

        <h3 className="text-lg font-semibold text-green-700 mt-8 mb-2">Version</h3>
        <p className="text-lg text-gray-200">V. Saturday 2 November 1:28 PM</p>
      </section>
    </MainLayout>
  );
};
