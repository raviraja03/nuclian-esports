// ModalManager.jsx
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../globalState/slices/modal";
import EditTeamModal from "../modals/EditTeamModal";

const ModalManager = () => {
  const { isOpen, modalType, modalProps } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  let ModalComponent = null;
  switch (modalType) {
    case "EDIT_TEAM":
      ModalComponent = EditTeamModal;
      break;

    default:
      return null;
  }

  return (
    <ModalComponent {...modalProps} onClose={() => dispatch(closeModal())} />
  );
};

export default ModalManager;
