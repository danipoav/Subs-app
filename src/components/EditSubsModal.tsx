import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { Plan } from '../features/plans/planSlice';

interface EditSubscriptionModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (newPlanId: number) => void;
    currentPlanName: string;
    plans: Plan[];
    selectedPlanId: number;
    setSelectedPlanId: (id: number) => void;
}

export default function EditSubsModal({
    open,
    onClose,
    onConfirm,
    currentPlanName,
    plans,
    selectedPlanId,
    setSelectedPlanId,
}: EditSubscriptionModalProps) {
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
                                className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black p-6 rounded-xl shadow-xl w-full max-w-sm"
                            >
                                <Dialog.Title className="text-xl font-bold mb-4 text-center">Edit Subscription</Dialog.Title>
                                <Dialog.Description className="text-sm text-center mb-6">
                                    Current Plan: <strong>{currentPlanName}</strong>
                                </Dialog.Description>

                                <select
                                    className="w-full p-2 rounded-lg border border-gray-300 mb-6"
                                    value={selectedPlanId}
                                    onChange={(e) => setSelectedPlanId(Number(e.target.value))}
                                >
                                    {plans.map((plan) => (
                                        <option key={plan.id} value={plan.id}>
                                            {plan.name} - {plan.period === '1 año' ? '1 Year' : '1 Month'}
                                        </option>
                                    ))}
                                </select>

                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => onConfirm(selectedPlanId)}
                                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
                                    >
                                        Save Changes
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
