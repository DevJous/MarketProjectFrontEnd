import Sidebar from "./sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Sidebar />
            <main>
                {children}
            </main>
        </>
    );
};

export default Layout;