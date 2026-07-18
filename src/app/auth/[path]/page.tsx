import {AuthView} from "@neondatabase/auth/react";

export const dynamicParams = false;

export default async function AuthPage({params}:{params:Promise<{path:string}>}){
    const {path} = await params
    return (
        <div
         className="flex flex-col
          items-center gap-4"
         >
       <AuthView path={path} />
        </div>
    )
}