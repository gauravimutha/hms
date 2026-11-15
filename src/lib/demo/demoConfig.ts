
export const isDemoEnabled = (): boolean => {
  return process.env.NEXT_PUBLIC_DEMO_ENABLED === "true";
};
