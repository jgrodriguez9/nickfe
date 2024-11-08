import BodyDialog from "./BodyDialog";
import FooterDialog from "./FooterDialog";
import HeaderDialog from "./HeaderDialog";

type DialogProps = {
  title?: string;
  open: boolean;
  children: React.ReactNode;
  closeModal: () => void;
  onHandleClick?: () => void;
  maxWidth?: number;
  isDisabledButtons?: boolean;
  isLoadingButtons?: boolean;
  hideAcceptButton?: boolean;
  hideCancelButton?: boolean;
};

const dialogMaxWidth: Record<number, string> = {
  1: "max-w-xl",
  2: "max-w-2xl",
  3: "max-w-3xl",
  4: "max-w-4xl",
  5: "max-w-5xl",
  6: "max-w-6xl",
  7: "max-w-7xl",
};

const Dialog = ({
  title = "",
  open,
  children,
  closeModal,
  onHandleClick = () => {},
  maxWidth = 1,
  isDisabledButtons = false,
  isLoadingButtons = false,
  hideAcceptButton = false,
  hideCancelButton = false,
}: DialogProps) => {
  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className={`
          ${open ? "" : "hidden"}
          fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full justify-center items-center flex bg-black/50`}
    >
      <div
        className={`relative p-4 w-full ${dialogMaxWidth[maxWidth]} max-h-full`}
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <HeaderDialog title={title} onClose={closeModal} />
          <BodyDialog>{children}</BodyDialog>
          {!hideAcceptButton && !hideCancelButton && (
            <FooterDialog
              onCloseModal={closeModal}
              onHandleClick={onHandleClick}
              isDisabledButtons={isDisabledButtons}
              isLoadingButtons={isLoadingButtons}
              hideAcceptButton={hideAcceptButton}
              hideCancelButton={hideCancelButton}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
