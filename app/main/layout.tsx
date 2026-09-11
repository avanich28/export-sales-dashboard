import Header from "@/app/_components/Header";
import Sidebar from "@/app/_components/Sidebar";

function Layout({ children }) {
  return (
    <div className="sm:h-full sm:grid grid-cols-[auto_minmax(0,_1fr)] grid-rows-[auto_minmax(0,_1fr)]">
      <div className="hidden sm:contents">
        <Sidebar />
      </div>
      <div className="min-w-0 h-screen">
        <div className="min-w-full h-full sm:overflow-auto">
          <div className="min-w-max h-full flex flex-col">
            <Header />
            <main className="h-full min-h-max pt-6 sm:pt-8 lg:pt-10 pb-4 px-4">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;

// [&>main]:p-6 sm:[&>main]:p-8 lg:[&>main]:p-10
