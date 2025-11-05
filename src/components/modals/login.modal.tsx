import { FC } from 'react';

import { CustomModal } from '@/components';
import { LoginForm } from '@/components/forms';
import { IModal } from '@/types';

export const LoginModal: FC<Omit<IModal, 'title'>> = ({ isOpen, onClose }) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Авторизация">
            <LoginForm onClose={onClose} />
        </CustomModal>
    );
};
