/** hireproto.com — touch devices always use iPhone layout scaling. */
export function isTouchPrimaryDevice(): boolean {
  if (typeof window === "undefined") return false;
  return navigator.maxTouchPoints > 0;
}

export function shouldLockProtoTouchPhoneLayout(): boolean {
  return isTouchPrimaryDevice();
}
