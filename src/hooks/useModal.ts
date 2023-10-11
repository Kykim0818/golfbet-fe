import { useEffect, useState } from "react";
import { increaseBackToHomePageCount, usePageRoute } from "./usePageRoute";

export const useModal = () => {
  const [open, setOpen] = useState(false);
  const { moveBack } = usePageRoute();
  useEffect(() => {
    if (open) {
      increaseBackToHomePageCount();
      window.history.pushState(null, "", window.location.href);
      // window.addEventListener("popstate", preventGoBack);
    }
  }, [open]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    moveBack();
    setOpen(false);
  };

  const closeModalByUI = () => {
    setOpen(false);
  };

  return {
    open,
    openModal,
    closeModal,
    closeModalByUI,
  };
};
