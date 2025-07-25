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
        txn_id: string;
        invoice_url: string;
    }
}

export interface ICreateInvoiceSuccessWhiteLabel {
    status: "success",
    data: {
        txn_id: string,
        invoice_url: string;
        amount: number;
        pending_amount: number;
        wallet_hash: string;
        psys_cid: CryptoCurrencies;
        currency: CryptoCurrencies;
        status: InvoiceStatus;
        source_currency: FiatCurrencies;
        source_rate: number;
        expire_utc: number;
        expected_confirmations: number;
        qr_code: string;
        verify_hash: string;
        invoice_commission: number;
        invoice_sum: number;
        invoice_total_sum: number;
    }
}

export interface ICreateInvoiceError {
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

export interface ICreateInvoiceCallback {
    txn_id: number;
    ipn_type: string;
    merchant: string;
    merchant_id: number;
    amount: number;
    currency: CryptoCurrencies;
    order_number: number;
    order_name: string;
    confirmations: number;
    status: InvoiceStatus;
    source_currency: FiatCurrencies;
    source_amount: number;
    source_rate: number;
    comment: string;
    verify_hash: string;
    invoice_commission: string;
    invoice_sum: number;
    invoice_total_sum: number;
}

// TODO: Docs of response interfaces. https://plisio.net/documentation/endpoints/create-an-invoice
// TODO: Other endpoint interfaces and types.