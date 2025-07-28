import AxonPayments from "@/AxonPayments";

let instance: AxonPayments | null = null;

/**
 * Factory function to get a singleton instance of the AxonPayments manager,
 * or create a new instance if requested.
 * 
 * By default, returns the existing singleton instance.
 * Pass `true` to `newInstance` to force creation of a fresh instance.
 * 
 * Useful for resetting state in tests or multi-tenant scenarios.
 * 
 * @param newInstance - Whether to create a new instance instead of reusing.
 * @returns The AxonPayments instance.
 * 
 * @example
 * // Get the singleton instance
 * const payments1 = Payments();
 * 
 * // Force a new instance (e.g., for testing or isolated context)
 * const payments2 = Payments(true);
 */
const Payments = (newIntance: boolean = false) => {
    if (newIntance) return new AxonPayments();
    if (!instance) instance = new AxonPayments();
    return instance;
};

export {
    Payments,
    AxonPayments
}