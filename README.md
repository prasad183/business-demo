# MSME Platform - Static UI Pages

A complete set of static, responsive UI pages for an MSME platform built with React, TypeScript, and Tailwind CSS.

## Project Structure

```
my-app/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Customer Home page
│   ├── catalogue/                # Customer Catalogue pages
│   │   ├── page.tsx              # Catalogue listing
│   │   └── [id]/page.tsx         # Product/Service detail
│   ├── booking/                  # Booking flow
│   ├── cart/                     # Shopping cart & checkout
│   ├── account/                  # User account & profile
│   ├── shows/                    # Showtimes & seat map
│   ├── search/                   # Search & results
│   ├── admin/                    # Admin portal
│   │   ├── dashboard/            # Admin dashboard
│   │   ├── catalogue/            # Catalogue manager
│   │   ├── bookings/             # Bookings & calendar
│   │   ├── transactions/         # Transactions & invoicing
│   │   ├── employees/            # Employees & scheduling
│   │   └── suppliers/            # Suppliers & procurement
│   └── mobile/                   # Employee mobile app
│       ├── home/                 # Today/Home screen
│       ├── order/                # Order taking
│       ├── schedule/             # Provider day view
│       ├── stock/                # Stock management
│       └── profile/              # Profile & clock in/out
├── components/                   # Reusable UI components
│   └── ui/                       # UI component library
│       ├── AppBar.tsx
│       ├── BottomNav.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       ├── Drawer.tsx
│       ├── Stepper.tsx
│       ├── Skeleton.tsx
│       ├── EmptyState.tsx
│       ├── OfflineBanner.tsx
│       ├── Toast.tsx
│       ├── KPITile.tsx
│       ├── SeatMap.tsx
│       ├── CalendarGrid.tsx
│       └── Timeline.tsx
├── data/                         # Sample data
│   └── sampleData.ts             # Mock data & i18n placeholders
└── globals.css                   # Design tokens & global styles
```

## Design Tokens

The project uses CSS variables for design tokens:

- **Primary Color**: `#0E7C86`
- **Accent Color**: `#F0C36A`
- **Neutral**: `#0A0E14`
- **Surface**: `#0F141A`

All tokens are defined in `app/globals.css`.

## Features

### Customer Website (Mobile-first)
- ✅ Home page with hero, services carousel, branch info
- ✅ Catalogue with filters and search
- ✅ Product/Service detail pages
- ✅ Multi-step booking flow
- ✅ Shopping cart with GST calculation
- ✅ Account management with bookings & invoices
- ✅ Showtimes with interactive seat map
- ✅ Search functionality

### Admin Portal (Web-first)
- ✅ Dashboard with KPIs and charts
- ✅ Catalogue management
- ✅ Bookings calendar view
- ✅ Transactions & invoicing (GST & IRN)
- ✅ Employee scheduling
- ✅ Supplier management & GRN

### Employee Mobile App (Mobile-first)
- ✅ Today/Home screen with role-aware cards
- ✅ Order taking interface
- ✅ Provider day view with timeline
- ✅ Stock management with barcode scanning
- ✅ Profile with clock in/out & geofencing

## Component Library

All components are accessible (WCAG AA target) with:
- Minimum 44px touch targets
- Keyboard navigation support
- ARIA attributes
- Focus indicators

## Accessibility

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support

## i18n Support

Placeholders for English and Hindi translations are included in `data/sampleData.ts`. All UI labels use i18n keys.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## TODO Notes

Throughout the codebase, you'll find `// TODO:` comments indicating where:
- API calls should be integrated
- Dynamic data binding is needed
- Interactive features require backend support
- Chart libraries should be integrated

## Notes

- All pages are static and don't make API calls
- Sample data is embedded in pages
- Interactive features (calendar, seat map, payment) are mocked
- Charts use placeholder divs (ready for Chart.js, Recharts, etc.)

## Browser Support

Modern browsers with CSS Grid and Flexbox support.
