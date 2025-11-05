export interface IModal {
    isOpen: boolean;
    title: string;
    onClose: () => void;
}
