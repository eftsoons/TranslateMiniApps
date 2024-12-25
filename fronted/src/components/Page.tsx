import { useNavigate } from "react-router-dom";
import { backButton } from "@telegram-apps/sdk-react";
import { CSSProperties, PropsWithChildren, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";

export function Page({
  children,
  back,
  style,
  onClick,
}: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   */
  back?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
}>) {
  const navigate = useNavigate();

  useEffect(() => {
    if (back) {
      backButton.show();
      return backButton.onClick(() => {
        navigate(-1);
      });
    }
    backButton.hide();
  }, [back]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={style}
        onClick={onClick}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
