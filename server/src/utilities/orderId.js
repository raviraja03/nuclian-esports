export const generateOrderId = () => {
  return (
    "ORDER_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9)
  );
};