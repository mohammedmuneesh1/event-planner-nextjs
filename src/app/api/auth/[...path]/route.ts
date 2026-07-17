import {auth} from "@/lib/auth/server";

//THIS BELOW CODE ALLOW SIGNUP KIND OF FEATURES 
export  const {GET, POST , PUT,PATCH, DELETE} = auth.handler();