import rfdc from "rfdc";

export const deepClone: <T>(item: T) => T = rfdc();
