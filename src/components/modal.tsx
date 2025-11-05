import { FC, PropsWithChildren } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/modal';

import type { IModal } from '@/types';

export const CustomModal: FC<PropsWithChildren<IModal>> = ({ children, isOpen, title, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="border-b">
                    <h3 className="text-foreground text-xl font-semibold">{title}</h3>
                </ModalHeader>
                <ModalBody className="py-6">{children}</ModalBody>
            </ModalContent>
        </Modal>
    );
};
