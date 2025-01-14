import React from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
    const [mounted, setMounded] = React.useState(false);

    React.useEffect(() => {
        setMounded(true);
        return () => setMounded(false);
    }, []);

    if (!mounted) return null;

    return createPortal(
        children,
        document.getElementById("portal-root") as HTMLElement
    )
}

export default Portal;