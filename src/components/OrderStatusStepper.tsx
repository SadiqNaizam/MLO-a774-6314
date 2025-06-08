import React from 'react';
import { CheckCircle, Package, Truck, Home, XCircle } from 'lucide-react'; // Icons for steps

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'FAILED';

interface OrderStatusStepperProps {
  currentStatus: OrderStatus;
}

const statusSteps = [
  { id: 'CONFIRMED', label: 'Order Confirmed', icon: CheckCircle },
  { id: 'PREPARING', label: 'Preparing Food', icon: Package },
  { id: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: Truck },
  { id: 'DELIVERED', label: 'Delivered', icon: Home },
] as const; // Use "as const" for stricter typing of id

const statusMap: Record<OrderStatus, number> = {
  'PENDING': 0, // Technically before CONFIRMED
  'CONFIRMED': 1,
  'PREPARING': 2,
  'OUT_FOR_DELIVERY': 3,
  'DELIVERED': 4,
  'CANCELLED': -1, // Special case
  'FAILED': -2,    // Special case
};

const OrderStatusStepper: React.FC<OrderStatusStepperProps> = ({ currentStatus }) => {
  console.log("Rendering OrderStatusStepper, current status:", currentStatus);
  const currentStepIndex = statusMap[currentStatus] || 0;

  if (currentStatus === 'CANCELLED' || currentStatus === 'FAILED') {
    const isCancelled = currentStatus === 'CANCELLED';
    return (
      <div className="flex flex-col items-center p-4 bg-red-50 border border-red-200 rounded-lg">
        {isCancelled ? <XCircle className="w-12 h-12 text-red-500 mb-2" /> : <XCircle className="w-12 h-12 text-red-500 mb-2" /> }
        <p className="text-xl font-semibold text-red-700">
          Order {isCancelled ? 'Cancelled' : 'Failed'}
        </p>
        {/* Optionally add more details here */}
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between">
        {statusSteps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStepIndex;
          const isCurrent = stepNumber === currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2
                    ${isActive ? 'bg-orange-500 border-orange-500 text-white' : 'bg-gray-100 border-gray-300 text-gray-400'}
                    ${isCurrent ? 'ring-2 ring-orange-300 ring-offset-2' : ''}`}
                >
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <p className={`mt-2 text-xs sm:text-sm font-medium ${isActive ? 'text-orange-600' : 'text-gray-500'}`}>
                  {step.label}
                </p>
              </div>
              {index < statusSteps.length - 1 && (
                <div className={`flex-1 h-1 mx-1 sm:mx-2 rounded
                  ${isActive && stepNumber < currentStepIndex ? 'bg-orange-500' : 'bg-gray-300'}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
export default OrderStatusStepper;