import { FC } from 'react';

import { CustomModal } from '@/components';
import { RegistrationForm } from '@/components/forms';
import { IModal } from '@/types';

export const RegistrationModal: FC<Omit<IModal, 'title'>> = ({ isOpen, onClose }) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Создать аккаунт">
            <RegistrationForm onClose={onClose} />
        </CustomModal>
    );
};
