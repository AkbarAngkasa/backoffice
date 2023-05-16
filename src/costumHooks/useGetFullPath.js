import { useLocation } from "react-router-dom";

export default function useGetFullPath() {
    const currentPath = useLocation().pathname;
    return currentPath
}
