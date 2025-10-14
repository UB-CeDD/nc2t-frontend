interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center backdrop-filter backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative top-10 mx-auto p-5 w-[50%] rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mt-3 text-center">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
