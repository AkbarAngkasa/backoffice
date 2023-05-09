import { useLocation } from "react-router-dom";

export default function useGetLastPath() {
    const currentPath = useLocation().pathname;
    let parts = currentPath.split('/');
    let lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash
    return lastSegment.replaceAll('-', ' ');
}
