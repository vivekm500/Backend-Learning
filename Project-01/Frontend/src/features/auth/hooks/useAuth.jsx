// hooks layer
// it will be our custom hook

import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";

export function useAuth(){
    const context = useContext(AuthContext)

    return context
}