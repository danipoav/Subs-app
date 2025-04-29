import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';

export default function UnsubscribeModal({ open, onClose, onConfirm, serviceName }: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    serviceName: string;
}) {
    return (
        <Dialog.Root open={open} onOpenChange={onClose} modal={true}>
            <AnimatePresence>
                {open && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                className="fixed inset-0 bg-black bg-opacity-60 z-40 pointer-events-auto"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />
                        </Dialog.Overlay>

                        <Dialog.Content asChild onPointerDownOutside={(e) => e.preventDefault()}
                            onEscapeKeyDown={(e) => e.preventDefault()}>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed z-50 top-[40%] left-[10%] md:left-[40%] bg-white text-black m-auto px-0 p-6 rounded-xl shadow-xl w-[80%] max-w-sm"
                            >
                                <Dialog.Title className="text-xl font-bold mb-2 text-center">Unsubscribe</Dialog.Title>
                                <Dialog.Description className="text-sm text-center mb-4 px-5">
                                    Are you sure you want to unsubscribe from <strong>{serviceName}</strong>?
                                </Dialog.Description>

                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={onConfirm}
                                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                                    >
                                        Yes, Unsubscribe
                                    </button>
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
}
