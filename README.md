<p align="center">
  <img src="https://avatars.githubusercontent.com/u/198393404?s=200&v=4" height="100" alt="AxonJs Logo" />
</p>

<h1 align="center">@axonlabs/payments</h1>

<p align="center">
  💳 Modular, type-safe payment gateway clients for Node.js — with first-class TypeScript, ESM exports, and real-world API support.
</p>

---

## 🚀 What is this?

`@axonlabs/payments` is a unified payment client library for Node.js applications — built with **TypeScript**, **ESM**, and **modern developer ergonomics** in mind.

Whether you're integrating **Plisio**, **Zarinpal** (more payment clients will coming soon) this package gives you:

- 🧩 Gateway-specific clients with type-safe methods
- 🔌 Easy plug-and-play usage
- 🔄 Common interfaces for consistency
- ⚡️ Fully tree-shakable via ESM exports
- 📦 Single package, clean structure

**[Project Changelog](./CHANGELOG.md)**

---

## 📦 Supported Gateways

| Gateway        | Import Path                          | Status      |
|----------------|--------------------------------------|-------------|
| Plisio         | `@axonlabs/payments/plisio`           | 🧪 In progress |
| Zarinpal       | `@axonlabs/payments/zarinpal`         | 🚧 In Future |

> Want to contribute a gateway? PRs are welcome!

---

## 🧪 Example Usage

```ts
// Plisio
import { PlisioClient } from '@axonlabs/payments/plisio';

const plisio = new PlisioClient(secret_key, "whitelabel");

// Central hub
import { Payments, AxonPayments } from '@axonlabs/payments';

const plisio1 = Payments.getPlisio(secret_key, "whitelabel");
const plisio2 = new AxonPayments().getPlisio(secret_key, "whitelabel");
```

Each gateway is designed to be self-contained and follow a consistent interface.

---

## 🧠 Philosophy

- ✅ ESM-first — optimized for modern tooling
- ⚙️ Shared interfaces, custom configs, and low-level control
- 🧪 Testable clients for real-world server environments
- 🌍 Multi-gateway ready in a single unified package

---

## 📂 Import Structure

```ts
// Plisio
import { PlisioClient } from '@axonlabs/payments/plisio';
// Central hub
import { Payments, AxonPayments } from '@axonlabs/payments';
```

---

## 📜 License

MIT © [AxonJsLabs](https://github.com/AxonJsLabs)

---

## 🙌 Contribute

We ❤️ open-source!
Feel free to open issues, suggest improvements, or add new gateway clients.

```bash
npm install
npm run build
npm run test
```

> Want to add your own gateway (e.g. NowPayments, IDPay, PayPal)? Check the lib/ folder and follow the structure.

<p align="center" style="font-size: 20px"> <sub>Built with 💜 by the <a href="https://github.com/AxonJsLabs">AxonJsLabs</a> community</sub> </p>