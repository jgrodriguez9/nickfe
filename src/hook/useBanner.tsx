import { useCallback, useMemo } from "react";
import { useAppDispatch } from "./useRedux";
import { addMessage, clearMessage } from "../redux/messageSlice";
import { ERROR_SERVER } from "../constant/messages";
import extractMeaningfulMessage from "../utils/extractMeaningfulMessage";

const useBanner = () => {
  const dispatch = useAppDispatch();

  const showMessage = useCallback(
    (type: string, message: string) => {
      dispatch(
        addMessage({
          type,
          message,
        })
      );
    },
    [dispatch]
  );

  const simpleError = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (message: any) => {
      const mess = extractMeaningfulMessage(message, ERROR_SERVER);
      dispatch(
        addMessage({
          type: "error",
          message: mess,
        })
      );
    },
    [dispatch]
  );

  const simpleSuccess = useCallback(
    (message: string) => {
      dispatch(
        addMessage({
          type: "success",
          message,
        })
      );
    },
    [dispatch]
  );

  const simpleWarning = useCallback(
    (message: string) => {
      dispatch(
        addMessage({
          type: "warning",
          message,
        })
      );
    },
    [dispatch]
  );

  const simpleInfo = useCallback(
    (message: string) => {
      dispatch(
        addMessage({
          type: "info",
          message,
        })
      );
    },
    [dispatch]
  );

  const clear = useCallback(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return useMemo(
    () => ({
      showMessage,
      clear,
      simpleError,
      simpleSuccess,
      simpleWarning,
      simpleInfo,
    }),
    [showMessage, clear, simpleError, simpleInfo, simpleSuccess, simpleWarning]
  );
};

export default useBanner;
