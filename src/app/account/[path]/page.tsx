import { AccountView, accountViewPaths } from "@neondatabase/auth/react"


export default async function AccountPage({params}:{params:Promise<{path:string}>}){
    const {path} = await params
    return (
        <div
         className="flex flex-col
          items-center gap-4"
         >
       <h1>Account Page</h1>
       <AccountView path={path} />
        </div>
    )
}