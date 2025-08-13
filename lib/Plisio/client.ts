import axios from "axios";

// data
import endpoints from "@/Plisio/endpoints.json";

// types
import type {
    CreateInvoiceRequestFields,
    ICreateInvoiceSuccess,
    ICreateInvoiceSuccessWhiteLabel,
    IPlisioResponseError,
    IWithdrawSuccess,
    PlisioMode,
    WithdrawRequestFields
} from "@/Plisio/types";

/**
 * PlisioClient is a type-safe SDK wrapper for interacting with the Plisio crypto payment API.
 * 
 * It supports both `default` and `whitelabel` modes, and dynamically adjusts the invoice response
 * types based on the selected mode. Whitelabel mode includes additional customization fields
 * in the API response.
 * 
 * This class handles authentication, query string generation, and API request execution.
 * It ensures that the correct response type is returned for each mode.
 * 
 * @version 0.1.0
 * 
 * @since 0.1.0
 * 
 * @template T - Mode of the client, either `"default"` or `"whitelabel"`.
 * 
 * @example
 * // Default client (standard Plisio hosted payment page)
 * const client = new PlisioClient("your-secret-key", "default");
 * const invoice = await client.createInvoice({ source_currency: "USD", source_amount: 10, order_number: 1, order_name: "order 1" });
 * 
 * @example
 * // Whitelabel client (custom hosted checkout experience)
 * const client = new PlisioClient("your-secret-key", "whitelabel");
 * const invoice = await client.createInvoice({ source_currency: "USD", source_amount: 10, order_number: 1, order_name: "order 1" });
 */
class PlisioClient<T extends PlisioMode = "default"> {
    private SECRET_KEY: string;
    private mode: T;

    /**
     * Creates an instance of the Plisio client.
     *
     * @param secret_key - The Plisio API secret key used for authenticating requests.
     * @param mode - The environment mode (e.g., "live" or "sandbox").
     */
    constructor(secret_key: string, mode: T) {
        this.SECRET_KEY = secret_key;
        this.mode = mode;
    }

    /**
     * Sends a request to Plisio to create a new invoice.
     * 
     * The return type dynamically depends on whether the client is in `"whitelabel"` or `"default"` mode.
     * 
     * @param options - Fields required to create the invoice (amount, currency, order number, etc.)
     * @returns A promise resolving to the invoice creation response.
     * 
     * @throws AxiosError if the API call fails, with additional context if available.
     */
    public async createInvoice(options: CreateInvoiceRequestFields) {
        // Converts the options object into a URL query string.
        const params = this.parseQueryParams(options);
        const url = `${endpoints.createInvoice.url}?${params}`;

        const response = await this.request<
            T extends "whitelabel" ? ICreateInvoiceSuccessWhiteLabel : ICreateInvoiceSuccess
        >(url);

        // Return the data from the response payload.
        return response.data;
    }

    /**
     * Sends a request to Plisio to initiate a new withdrawal.
     * 
     * @param options - Fields required for the withdrawal, conforming to the `WithdrawRequestFields` type.
     * @returns A promise resolving to the `data` object from the successful withdrawal response.
     * 
     * @throws AxiosError if the API call fails, with additional context if available.
     */
    public async withdraw(options: WithdrawRequestFields) {
        // Converts the options object into a URL query string.
        const params = this.parseQueryParams(options);
        const url = `${endpoints.withDrawal.url}?${params}`;

        const response = await this.request<IWithdrawSuccess>(url);

        // Return the data from the response payload.
        return response.data;
    }

    /**
     * A simple request method to send `GET` request to the following url and return the response or throws error of the request.
     * 
     * @param url Url which request must send to it.
     * @returns A promise resolving the data of successful request response.
     */
    private async request<AxiosSuccessResponse>(url: string) {
        let response;

        try {
            response = await axios.get<AxiosSuccessResponse>(url);
        } catch (error) {
            if (axios.isAxiosError<IPlisioResponseError>(error)) {
                console.error("Axios error:", error.response?.data.data.message ?? error.message);
                throw error;
            } else {
                console.error("Unknown error:", error);
                throw error;
            }
        }

        return response;
    }

    /**
    * Converts an array of strings into a comma-separated string.
    * 
    * @param arr - The array of strings to convert.
    * @returns A single string with array values joined by commas.
    */
    private parseArray(arr: string[]) {
        return arr.join(",");
    }

    /**
     * Converts an object of key-value pairs into a URL query string.
     * Automatically includes the `api_key` for authentication.
     * 
     * Special handling: boolean false values are skipped for certain keys to match API behavior.
     * 
     * @param obj - Object representing query parameters.
     * @returns A query string that can be appended to a URL.
     */
    private parseQueryParams(obj: { [key: string]: any }) {
        obj["api_key"] = this.SECRET_KEY;
        const params = new URLSearchParams();

        for (const key in obj) {
            const value = Array.isArray(obj[key]) ? this.parseArray(obj[key]) : obj[key];

            /**
             * This code will ignore false values because user maybe set false value for some items like return_existing but the API just check that is the key exist or not.
             * Another thing is some keys like email must be disable_email to make `true` meaningful but this code will remove that email: false item.
             */
            // if (typeof value === "boolean" && !value || value === "false") continue;

            params.append(key, value.toString());
        }

        return params.toString();
    }
}

export default PlisioClient;