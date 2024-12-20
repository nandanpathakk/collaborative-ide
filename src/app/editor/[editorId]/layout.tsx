import { ReactNode, useState } from "react"
import ConnectedUser from "@/components/ConnectedUser"
import Button from "@/components/ui/Button"

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {


    return <main className="flex min-h-[100dvh] overflow-hidden">
        <section className="w-full max-w-64 bg-gray-900 text-white overflow-hidden flex flex-col">
            <div className="flex gap-5 border-b px-3 py-8 justify-between border-gray-700">
                <div>Image</div>
                <div>Logo</div>
            </div>
            <div className="py-3 px-3 flex flex-col grow">
                <h4 className="font-bold">Connected</h4>
                <div className="flex flex-col flex-grow justify-between">
                    <div className="mt-5">
                        <ConnectedUser />
                    </div>
                    <div className="flex flex-col space-y-3 justify-around">
                        <Button varient="secondary">Copy Code</Button>
                        <Button varient="primary">Leave</Button>
                    </div>
                </div>
            </div>
        </section>

        <aside className="w-full overflow-hidden">
            {children}
        </aside>
    </main>
}
export default Layout;