import Button from "../../Control/Button";

type Props = {
  onHandleClick: () => void;
  onCloseModal: () => void;
  isDisabledButtons?: boolean;
  isLoadingButtons?: boolean;
  hideCancelButton?: boolean;
  hideAcceptButton?: boolean;
};

const FooterDialog = ({
  onHandleClick,
  onCloseModal,
  isDisabledButtons = false,
  isLoadingButtons = false,
  hideCancelButton = false,
  hideAcceptButton = false,
}: Props) => {
  return (
    <div className="flex gap-2 items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
      {!hideAcceptButton && (
        <Button
          label="Aceptar"
          importantClass="!w-auto px-3 py-[8px]"
          variant="primary"
          onClick={onHandleClick}
          loading={isLoadingButtons}
          disabled={isDisabledButtons}
        />
      )}
      {!hideCancelButton && (
        <Button
          label="Cancelar"
          importantClass="!w-auto px-3 py-[8px]"
          variant="danger"
          onClick={onCloseModal}
          disabled={isDisabledButtons}
        />
      )}
    </div>
  );
};

export default FooterDialog;
