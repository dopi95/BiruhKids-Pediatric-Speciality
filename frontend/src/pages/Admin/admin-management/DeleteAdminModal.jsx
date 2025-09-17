import React, { useState } from "react";
import ConfirmationModal from "../../../components/ConfirmationModal";

export default function DeleteAdminModal({ admin, onClose, onConfirm }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = async () => {
        setIsDeleting(true);
        await onConfirm(admin._id);
        setIsDeleting(false);
    };

    return (
        <ConfirmationModal
            isOpen={true}
            onClose={onClose}
            onConfirm={handleConfirm}
            title="Delete Admin"
            message={`Are you sure you want to delete the admin:`}
            confirmText="Delete Admin"
            requireTextConfirmation={true}
            confirmationText={admin.name}
            isLoading={isDeleting}
        />
    );
}