# 🏢 Tenant Management System (MVP)

## 📌 Overview

This project is a **Tenant Management System** designed for property owners to manage their buildings, tenants, and financial records in a simple and structured way.

The system focuses on:

- Managing tenants
- Tracking payments (ledger)
- Handling complaints
- Storing important documents

It is built as a **single-company system**, where each user (owner) manages their own workspace.

---

## 🎯 Goal

To provide a **simple, clean, and efficient tool** for property owners to:

- Keep track of tenant payments
- Maintain records
- Improve communication with tenants

---

## 🧠 Core Concept

```text
Owner → Company → Properties → Tenants → Ledger / Complaints / Documents
```

---

## 👥 User Roles

### 👑 Owner

- Full control over the system
- Manages properties, tenants, ledger, complaints, and documents

### 👤 Tenant

- Has login access
- Can:
  - View their payment history
  - Check balance
  - Raise complaints
  - Upload documents (optional, subject to approval)

---

## 🏗️ Features (MVP)

### 🔐 Authentication

- User signup & login
- Company auto-created on signup

---

### 🏠 Property Management

- Create, update, delete properties

---

### 👥 Tenant Management

- Add, update, remove tenants
- Assign tenants to properties

---

### 💰 Ledger System (Core Feature)

- Track credit and debit entries per tenant
- Auto-calculate balance
- View transaction history

---

### 📢 Complaint Management

- Tenants can raise complaints
- Owner can update status:
  - OPEN
  - IN_PROGRESS
  - RESOLVED

---

### 📄 Document Management

- Upload documents for tenants/properties
- Tenant uploads → marked as PENDING
- Owner can APPROVE or REJECT
- Only approved documents are considered valid

---

## ⚙️ Key Rules

- Each user has **one company**
- All data is scoped to a company
- Tenants can only access their own data
- Only owner can verify documents
- Ledger is read-only for tenants

---

## 🎨 Design Philosophy

- Simple and clean UI
- Focus on important data (tenants + ledger)
- Minimal navigation
- Clear visual distinction for financial data

---

## 🚀 Future Scope

- Staff roles and permissions
- Notifications system
- Payment integrations
- Advanced analytics

---

## 🏁 Summary

A lightweight system to help property owners:

- Manage tenants
- Track payments
- Maintain transparency

Built with simplicity and real-world usability in mind.
