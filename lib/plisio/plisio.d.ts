export const cryptoCurrencies = [
    "ETH",
    "ETH_BASE",
    "BTC",
    "LTC",
    "DASH",
    "TZEC",
    "DOGE",
    "BCH",
    "XMR",
    "USDT",
    "USDC",
    "USDC_BASE",
    "SHIB",
    "APE",
    "BTT",
    "USDT_TRX",
    "TRX",
    "BNB",
    "BUSD",
    "USDT_BSC",
    "USDС_BSC",
    "LB",
    "ETC",
    "TON",
    "USDT_TON",
    "SOL",
    "USDT_SOL"
] as const;

export const fiatCurrencies = [
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYN",
    "BYR",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLF",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KMF",
    "KPW",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LTL",
    "LVL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRO",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLL",
    "SOS",
    "SRD",
    "STD",
    "SVC",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "USD",
    "UYU",
    "UZS",
    "VEF",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XAG",
    "XAU",
    "XCD",
    "XDR",
    "XOF",
    "XPF",
    "YER",
    "ZAR",
    "ZMK",
    "ZMW",
    "ZWL",
] as const;

export const invoiceStatus = [
    "new",
    "pending",
    "pending internal",
    "expired",
    "completed",
    "mismatch",
    "error",
    "cancelled"
] as const;

export interface IPlisioResponseError {
    status: "error",
    data: {
        /**
         * Error name
         */
        name: string;

        /**
         * Error explanation
         */
        message: string;

        /**
         * Error code
         */
        code: number;
    }
}

/**
 * List of supported crypto currencies by Plisio
 */
export type CryptoCurrencies = typeof cryptoCurrencies[number];

/**
 * List of supported fiat currencies by Plisio
 */
export type FiatCurrencies = typeof fiatCurrencies[number];

/**
 * - **new** - initial invoice status
 * - **pending** - some amount received and waiting for confirmations
 * - **pending** internal - moving invoice money to user wallet has been initiated
 * - **expired** - look for the “amount” field to verify payment. The full amount may not have been paid.
 * - **completed** - paid in full
 * - **mismatch** - overpaid
 * - **error** - some error has occurred
 * - **cancelled** - no payment received within 10 hours
 */
export type InvoiceStatus = typeof invoiceStatus[number];

/**
 * Create Invoice ================================================================================================
 */

/**
 * List of all supported request fields for creating new invoice in Plisio.
 */
export interface CreateInvoiceRequestFields {
    /**
     * One of the crypto-currencies supported by Plisio 
     * (ID column from supported [cryptocurrencies](https://plisio.net/documentation/appendices/supported-cryptocurrencies)). 
     * 
     * If the parameter is not set, one of the active cryptocurrencies from the API settings is selected automatically when creating an invoice.
     */
    currency?: CryptoCurrencies;

    /**
     * Merchant internal order name
     */
    order_name: string;

    /**
     * Merchant internal order number. Must be an **unique** number in your store for each new store's order!!!
     */
    order_number: number;

    /**
     * any crypto-currency float value.
     * 
     * If a fiat currency is to be converted, skip this field and use the source_currency and source_amount fields instead
     */
    amount?: number;

    /**
     * One of the 167 [fiat currencies](https://plisio.net/documentation/appendices/supported-fiat-currencies)
     */
    source_currency?: FiatCurrencies;

    /**
     * Any float value
     */
    source_amount?: number;

    /**
     * List of crypto-currencies that are allowed for a payment. 
     * 
     * Also, you will be able to select one of them. Example: ["BTC", "ETH", "TZEC"];. 
     * 
     * To display one currency, need allow_psys_cids to match the currency parameter
     */
    allowed_psys_cids?: CryptoCurrencies[];

    /**
     * Merchant invoice description
     */
    description?: string;

    /**
     * Merchant full URL to get invoice updates. 
     * 
     * The POST request will be sent to this URL. 
     * 
     * If this parameter isn’t set, a callback will be sent to the URL that can be set under profile in API settings, in the `Status URL` field.
     */
    callback_url?: string;

    /**
     * Merchant full URL to get succeed invoice. 
     */
    success_callback_url?: string;

    /**
     * Merchant full URL to get failed invoice.
     */
    fail_callback_url?: string;

    /**
     * "To the site" invoice's button link in a case of invoice has been paid.
     */
    success_invoice_url?: string;

    /**
     * "To the site" invoice's button link in a case of invoice has not been paid/
     */
    fail_invoice_url?: string;

    /**
     * Before paying an invoice, your client will be asked to enter an email to which a notification will be sent. 
     * 
     * If you want to skip this step for your clients, fill in this field beforehand.
     */
    email?: boolean;

    /**
     * en_US (supports English only)
     */
    language?: string;

    /**
     * Plisio’s internal field to determine integration plugin
     */
    plugin?: string;

    /**
     * Plisio’s internal field to determine integration plugin version
     */
    version?: string;

    /**
     * Instead of JSON response user will be redirected to the Plisio's invoice page (is not working for a white-label shop)
     */
    redirect_to_invoice?: boolean;

    /**
     * Interval in minutes when invoice will be expired
     */
    expire_min?: number;

    /**
     * Return existing invoice instead of error
     */
    return_existing?: boolean;
}

export interface ICreateInvoiceSuccess {
    status: "success",
    data: {
        /**
         * Plisio’s intertnal ID
         */
        txn_id: string;

        /**
         * Invoice URL
         */
        invoice_url: string;
    }
}

export interface ICreateInvoiceSuccessWhiteLabel {
    status: "success",
    data: {
        /**
         * Plisio’s intertnal ID
         */
        txn_id: string,

        /**
         * Invoice URL
         */
        invoice_url: string;

        /**
         * Invoice amount in the selected cryptocurrency
         */
        amount: string;

        /**
         * 	The remaining amount to be paid in the selected cryptocurrency
         */
        pending_amount: string;

        /**
         * Invoice hash
         */
        wallet_hash: string;

        /**
         * Cryptocurrencies ID ([supported cryptocurrencies](https://plisio.net/documentation/appendices/supported-cryptocurrencies))
         */
        psys_cid: CryptoCurrencies;

        /**
         * Cryptocurrencies code ([supported cryptocurrencies](https://plisio.net/documentation/appendices/supported-cryptocurrencies))
         */
        currency: CryptoCurrencies;

        /**
         * Status of invoice
         */
        status: InvoiceStatus;

        /**
         * Fiat currency
         */
        source_currency: FiatCurrencies;

        /**
         * Exchange rate from the “psys_cid” to the “source_currency” at the moment of transfer
         */
        source_rate: string;

        /**
         * Timestamp in the UTC timezone; it may need to be divided by 1000
         */
        expire_utc: number;

        /**
         * How many confirmations expected to mark invoice completed
         */
        expected_confirmations: string;

        /**
         * QR code image in base64 format
         */
        qr_code: string;

        /**
         * Hash to verify the “POST” data signed with your SHOP_API_KEY
         */
        verify_hash: string;

        /**
         * 	Plisio commission
         */
        invoice_commission: string;

        /**
         * Shop pays commission: invoice amount - invoice_commission
         * 
         * client pays commission: invoice amount
         */
        invoice_sum: string;

        /**
         * shop pays commission: invoice amount
         * 
         * client pays commission: invoice_commission + invoice_sum
         */
        invoice_total_sum: string;
    }
}

export interface ICreateInvoiceCallback {
    txn_id: string;
    ipn_type: string;
    merchant: string;
    merchant_id: string;
    amount: string;
    currency: CryptoCurrencies;
    order_number: string;
    order_name: string;
    confirmations: string;
    status: InvoiceStatus;
    source_currency: FiatCurrencies;
    source_amount: string;
    source_rate: string;
    comment: string;
    verify_hash: string;
    invoice_commission: string;
    invoice_sum: string;
    invoice_total_sum: string;
}

/**
 * Withdraw ======================================================================================================
 */

/**
 * Plisio withdraw type
 */
export type WithdrawType = "cash_out" | "mass_cash_out";

/**
 * Plisio withdraw fee plan
 */
export type FeePlan = "normal" | "priority";

/**
 * List of all supported request fields for withdraw cash in Plisio.
 */
export interface WithdrawRequestFields {
    /**
     * One of the cryptocurrencies supported by Plisio (ID column from supported [cryptocurrencies](https://plisio.net/documentation/appendices/supported-cryptocurrencies))
     */
    currency: CryptoCurrencies;

    /**
     * “cash_out” or “mass_cash_out” to send to single or multiple hashes
     */
    type: WithdrawType;

    /**
     * Hash or multiple hashes pooled for the “mass_cash_out”
     */
    to: string[];

    /**
     * Any float values for the “ mass_cash_out” in the order that hashes are in “to” parameter
     */
    amount: number[];

    /**
     * a name of the one of: normal or priority ([more info](https://plisio.net/documentation/endpoints/fee-plans))
     */
    feePlan: FeePlan;
}

export interface IWithdrawSuccess {
    status: "success";
    data: {
        /**
         * 	“cash_out” or “mass_cash_out” depending on the request
         */
        type: WithdrawType;

        /**
         * Specifies whether the operation was completed or not (completed, error)
         */
        status: "completed" | "error";

        /**
         * ID column from [supported cryptocurrencies](https://plisio.net/documentation/appendices/supported-cryptocurrencies)
         */
        psys_cid: CryptoCurrencies;

        /**
         * Code column from [supported cryptocurrencies](https://plisio.net/documentation/appendices/supported-cryptocurrencies)
         */
        currency: CryptoCurrencies;

        /**
         * Name of the fiat currency (only USD available)
         */
        source_currency: FiatCurrencies;

        /**
         * Exchange rate from the “psys_cid” to the “source_currency” at the moment of transfer
         */
        source_rate: string;

        /**
         * Transaction fee stated in the transfer
         */
        fee: string;

        /**
         * Destination hash (if type=cash_out)
         */
        wallet_hash?: string;

        /**
         * Pairs of hashes and values (if type=mass_cash_out)
         */
        sendmany?: { [key: string]: number };
        params: {
            fee: {
                /**
                 * Estimated fee parameter to confirm the transaction in the “conf_target” blocks
                 */
                conf_target: number;

                /**
                 * The Plisio’s fee plan name
                 */
                plan: FeePlan;

                /**
                 * fee value
                 */
                value: string
            }
        };

        /**
         * Timestamp in the UTC timezone; it may need to be divided by 1000
         */
        created_at_utc: number;

        /**
         * Transfer amount in cryptocurrency
         */
        amount: string;

        /**
         * Link to the cryptocurrency block explorer
         */
        tx_url: string;

        /**
         * Internal Plisio operation ID
         */
        id: string
    }
}

// TODO: Docs of response interfaces. https://plisio.net/documentation/endpoints/create-an-invoice
// TODO: Other endpoint interfaces and types.