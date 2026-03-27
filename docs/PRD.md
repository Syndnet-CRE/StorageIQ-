# StorageIQ — Product Requirements Document

**Status:** Prototype  
**Owner:** Personal  
**Last updated:** March 2026

---

## Problem

Self-storage acquisition underwriting lives in Excel. It's slow, not shareable, hard to update on the fly, and produces ugly LOIs. Every deal requires rebuilding the same model from scratch.

## Solution

A browser-based underwriting tool that goes from raw deal inputs → pro forma → offer structuring → professional LOI in one session. No Excel, no formatting, no copy-paste.

## Users

Right now: just me. Eventually: acquisition teams, brokers, syndicators who do self-storage deals.

## Core workflows

### 1. Underwrite a deal
- Enter property details, unit mix, acquisition costs, debt terms
- Model flows into NOI, cash-on-cash, DSCR, IRR, equity multiple, waterfall
- Live pro forma table updates as you type

### 2. Find the market
- Type an address → map loads → Overpass API queries competing storage facilities within a radius
- Click a competitor → see name, address, distance
- "Use as Comp" pulls them into the unit mix as a reference row

### 3. Structure the offer
- Three scenarios: bank loan (DSCR-constrained), seller financing (CoC-targeted), interest-only SF
- Override any field — price auto-adjusts down payment and monthly payment
- Seller payout totals calculated per scenario including total interest earned

### 4. Generate the LOI
- Select which offer options to include
- Fill buyer branding fields once
- Output a print-ready, professional LOI document

## What it is NOT (yet)
- Multi-user / team collaboration
- Deal pipeline / CRM
- Database-backed (all state lives in the browser session)
- Mobile-optimized

## Future ideas
- Save deals to Supabase (Postgres)
- Auth via Supabase or Clerk
- PDF export (Puppeteer serverless function)
- Comparable rent scraping
- Portfolio view across multiple deals
- Shareable deal links
