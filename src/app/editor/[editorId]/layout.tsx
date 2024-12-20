import { ReactNode } from "react"

interface LayoutProps {
    children: ReactNode 
}

const Layout = ({children}: LayoutProps) => {
    return <div>
        <div>

        </div>
        <aside>
            {children}
        </aside>
    </div>
}