import { create } from 'zustand';
import * as type from './interfaces';

export const messageModalStore = create<type.ModalProps>((set) => ({
  isOpen: false,
  setIsOpen: (value: boolean) => set(() => ({ isOpen: value })),
}));

export const discoverModalStore = create<type.ModalProps>((set) => ({
  isOpen: false,
  setIsOpen: (value: boolean) => set(() => ({ isOpen: value })),
}));

export const filesModalStore = create<type.ModalProps>((set) => ({
  isOpen: false,
  setIsOpen: (value: boolean) => set(() => ({ isOpen: value })),
}));

export const settingsModalStore = create<type.ModalProps>((set) => ({
  isOpen: false,
  setIsOpen: (value: boolean) => set(() => ({ isOpen: value })),
}));
