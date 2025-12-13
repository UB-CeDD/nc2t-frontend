import React from 'react';
import Modal from './Modal';
import { useTranslation } from 'react-i18next';

interface DeleteConfirmationModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
    moduleName: string;
    isLoading?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    show,
    onClose,
    onConfirm,
    itemName,
    moduleName,
    isLoading = false,
}) => {
    const { t } = useTranslation();

    return (
        <Modal show={show} onClose={onClose}>
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                    <svg
                        className="w-6 h-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4v2m0 4v2M6.343 3.665c.886-.2 1.782-.308 2.686-.308.917 0 1.823.108 2.718.31.905.204 1.786.576 2.625 1.1.847.54 1.65 1.247 2.39 2.106.747.878 1.4 1.927 1.94 3.112.556 1.225.933 2.587 1.116 4.033.184 1.48.113 3.013-.216 4.55-.328 1.533-.997 2.993-1.88 4.224-.865 1.205-2.012 2.195-3.373 2.897-1.368.712-2.95 1.14-4.596 1.275-1.62.132-3.305-.039-4.907-.495-1.588-.451-3.038-1.258-4.261-2.346-1.214-1.076-2.164-2.438-2.806-3.997-.64-1.553-.947-3.295-.916-5.077.03-1.793.34-3.528.923-5.124.59-1.635 1.446-3.121 2.531-4.386 1.086-1.269 2.384-2.325 3.829-3.104 1.45-.784 3.025-1.275 4.646-1.452zm.001 2.047c-.845.19-1.66.55-2.418 1.065-.758.515-1.429 1.19-1.98 2.005-.554.828-.98 1.794-1.263 2.855-.283 1.063-.414 2.222-.386 3.415.027 1.18.187 2.313.472 3.342.286 1.028.714 1.954 1.265 2.75.56.811 1.242 1.502 2.015 2.044.78.548 1.655.953 2.593 1.195.951.248 1.976.335 3.037.255 1.052-.078 2.03-.356 2.89-.814.868-.465 1.615-1.11 2.21-1.895.597-.79.989-1.7 1.157-2.677.169-.98.113-2.06-.16-3.196-.274-1.137-.751-2.22-1.408-3.2-.667-1 -1.507-1.876-2.48-2.597-.968-.715-2.064-1.272-3.215-1.644z"
                        />
                    </svg>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    {t('delete.confirm_title')}
                </h3>

                <div className="mb-6 text-center">
                    <p className="text-gray-600 mb-3">
                        {t('delete.confirm_message')}
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg mb-3">
                        <p className="text-sm text-gray-700 mb-2">
                            <span className="font-semibold">{t('delete.item')}:</span> <span className="text-gray-900 font-medium">{itemName}</span>
                        </p>
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">{t('delete.module')}:</span> <span className="text-gray-900 font-medium">{moduleName}</span>
                        </p>
                    </div>
                    <p className="text-sm text-red-600 font-medium">
                        {t('delete.warning')}
                    </p>
                </div>

                <div className="flex gap-3 justify-center">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t('delete.cancel')}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? t('delete.deleting') : t('delete.confirm')}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteConfirmationModal;
