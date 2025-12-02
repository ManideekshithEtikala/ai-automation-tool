
import Authlayout from "@/features/auth/components/auth-layout";
const Layout =({children}:{children:React.ReactNode})=>{
    return (
        <Authlayout>
            {children}
        </Authlayout>
    )
}  
export default Layout;