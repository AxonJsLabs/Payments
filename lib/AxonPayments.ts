// Modules
import { PlisioClient, PlisioMode } from "@/Plisio";

/**
 * A map of supported payment SDKs keyed by provider name.
 * Each entry must be a class constructor.
 */
type ProvidersMap = {
    plisio: typeof PlisioClient;
    // stripe: typeof StripeClient;
};

/**
 * AxonPayments acts as a central hub to access and manage
 * instances of different payment providers with caching support.
 *
 * Currently supports Plisio and is extendable to others like Stripe.
 * 
 * @version 0.1.0
 * 
 * @since 0.1.0
 */
class AxonPayments {
    /**
     * Available provider constructors keyed by name.
     */
    private providers: ProvidersMap = {
        plisio: PlisioClient
    };

    /**
     * Internal cache to store and reuse SDK instances.
     * Keys are generated based on provider name and constructor arguments.
     */
    private cache = new Map<string, any>();

    /**
     * Returns a cached instance of the requested provider if available,
     * otherwise creates a new one with the provided arguments.
     *
     * @template K The provider key (e.g., "plisio")
     * @template T The constructor type of the provider
     * @param {K} provider - The name of the payment provider
     * @param {...ConstructorParameters<T>} args - Arguments to initialize the SDK
     * @returns {InstanceType<T>} An instance of the requested SDK
     *
     * @example
     * const instance = payments.getInstance("plisio", "secret-key", "sandbox");
     */
    private getInstance<
        K extends keyof ProvidersMap,
        T extends new (...args: any[]) => any = ProvidersMap[K]
    >(
        provider: K,
        ...args: ConstructorParameters<T>
    ): InstanceType<T> {
        const key = `${provider}:${JSON.stringify(args)}`;

        if (!this.cache.has(key)) {
            const ProviderClass = this.providers[provider] as T;
            this.cache.set(key, new ProviderClass(...args));
        }

        return this.cache.get(key) as InstanceType<T>;
    }

    /**
     * Shortcut to get a cached or new instance of the Plisio SDK.
     *
     * @param secret_key - Your Plisio API key
     * @param mode - The environment mode ("whitelabel" or "default")
     * @returns A PlisioClient instance
     *
     * @example
     * const plisio = payments.getPlisio("your-key", "default");
     */
    getPlisio(secret_key: string, mode: PlisioMode) {
        return this.getInstance("plisio", secret_key, mode);
    }
}

export default AxonPayments;