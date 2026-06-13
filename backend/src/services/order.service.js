const ALLOWED_TRANSITIONS = {
  PLACED: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PREPARING", "CANCELLED"],
  PREPARING: ["OUT_FOR_DELIVERY"],
  OUT_FOR_DELIVERY: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
}

export const canTransitionOrderStatus = (currentStatus, nextStatus) => {
  currentStatus = currentStatus?.toUpperCase();
  nextStatus = nextStatus?.toUpperCase();

  const allowedNextStatus = ALLOWED_TRANSITIONS[currentStatus];

  if (!allowedNextStatus) {
    console.warn(`Invalid current status: ${currentStatus}`);
    return false;
  }

  return allowedNextStatus.includes(nextStatus);
}
