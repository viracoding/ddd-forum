import { Header } from './header.tsx';
import { Toaster } from "@/components/ui/toaster"

export const Content = ({ children }: any) => (
    <>
        {children}
    </>
)

export const Layout = ({ children }: any) => (
    <div className="min-h-screen m-4 p-4 bg-gray-100">
        <Header/>
        <Content>
            {children}
        </Content>
        <Toaster />
    </div>
)