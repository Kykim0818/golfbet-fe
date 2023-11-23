import { actinoLoading } from "../store/loading/loadingSlice";
import { useAppDispatch } from "./redux";

export const useLoading = () => {
  const dispatch = useAppDispatch();
  function onLoading(loadingSecond: number) {
    dispatch(actinoLoading.setLoadingStatus(true));
    setTimeout(() => {
      dispatch(actinoLoading.setLoadingStatus(false));
    }, loadingSecond * 1000);
  }

  async function withLoading(asyncFunc: (args?: any) => Promise<unknown>) {
    dispatch(actinoLoading.setLoadingStatus(true));
    return asyncFunc()
      .then((result) => {
        dispatch(actinoLoading.setLoadingStatus(false));
        return result;
      })
      .catch((error) => {
        dispatch(actinoLoading.setLoadingStatus(false));
        throw error;
      });
  }

  return {
    onLoading,
    withLoading,
  };
};
