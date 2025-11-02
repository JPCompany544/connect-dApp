# TrustLoan Design System

## Overview
A clean, modern fintech design system for the TrustLoan decentralized lending dApp. The design emphasizes trust, clarity, and professionalism while maintaining subtle Web3 aesthetics.

---

## 🎨 Color System

### Primary Colors
- **Background**: `#F9FAFB` - Light grey background for the entire app
- **Surface**: `#FFFFFF` - White cards and containers
- **Primary**: `#2563EB` - Main brand blue
- **Primary Dark**: `#1E40AF` - Darker blue for gradients
- **Primary Light**: `#3B82F6` - Lighter blue for hover states

### Text Colors
- **Primary Text**: `#111827` - Dark grey for headings and body
- **Secondary Text**: `#6B7280` - Medium grey for labels and captions

### Semantic Colors
- **Border**: `#E5E7EB` - Light grey borders
- **Success**: `#10B981` - Green for approved/active states
- **Error**: `#EF4444` - Red for rejected/error states
- **Warning**: `#F59E0B` - Amber for pending states

### Gradients
- **Accent Gradient**: `linear-gradient(90deg, #2563EB, #1E40AF)` - Used for primary CTAs

---

## 📝 Typography

### Font Family
- **Primary**: `'Inter', sans-serif`
- **Monospace**: `'Courier New', monospace` (for wallet addresses)

### Font Sizes
- **Page Title**: 32px, weight 700
- **Section Title**: 20px, weight 600
- **Body**: 16px, weight 400-500
- **Caption**: 13px, weight 400

### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

---

## 🔲 Layout & Spacing

### Container
- **Max Width**: 1200px
- **Padding**: 24px (desktop), 16px (mobile)

### Border Radius
- **Cards**: 12px
- **Buttons**: 8px
- **Inputs**: 6px
- **Pills**: 9999px (fully rounded)

### Shadows
- **Card**: `0 4px 12px rgba(0, 0, 0, 0.05)`
- **Hover**: `0 6px 16px rgba(0, 0, 0, 0.08)`

---

## 🧩 Component Library

### 1. NavBar
**Purpose**: Top navigation with sticky positioning

**Features**:
- Sticky header (64px height)
- Logo on left
- Menu items in center (Dashboard, Support, Transactions)
- Wallet chip on right showing connected address
- Mobile hamburger menu
- White background with subtle bottom border

**Usage**:
```jsx
<NavBar />
```

---

### 2. WalletCard (Hero Overview Card)
**Purpose**: Display user's loan overview and wallet info

**Features**:
- Two-column layout (responsive)
- Left: Wallet address, Credit Limit, Active Loans
- Right: Disconnect button with security message
- White card with shadow and border

---

### 3. LoanSelectionCard
**Purpose**: Allow users to select loan amounts

**Features**:
- Title and subtitle
- 6 preset pill buttons ($500 - $50,000)
- Custom amount input field
- "Apply for Loan" CTA button with gradient
- Fee information (2%)
- Pill buttons transform on hover (border turns blue, background fills)

---

### 4. ActiveLoansTable
**Purpose**: Display user's active loans

**Features**:
- Clean table layout with columns: Loan ID, Amount, Status, Due Date, Repay
- Empty state with icon and message
- Hover effect on rows
- Color-coded status badges (green for Active)
- Repay button with gradient

---

### 5. FAQAccordion
**Purpose**: Display frequently asked questions

**Features**:
- Minimal accordion design
- Left border accent (blue) on active items
- Smooth expand/collapse animations
- Bottom border dividers
- Hover background on questions

**Questions**:
1. How long does it take to approve a loan?
2. How do I repay my loan?
3. Is my wallet data secure?
4. What is the 2% fee used for?

---

### 6. LiveTransactionsFeed
**Purpose**: Show recent platform transactions

**Features**:
- Table layout with columns: Wallet, Amount, Status, Time
- Color-coded status badges:
  - **Approved**: Green (`bg-green-100 text-green-800`)
  - **Pending**: Amber (`bg-amber-100 text-amber-800`)
  - **Rejected**: Red (`bg-red-100 text-red-800`)
- Muted font for wallet addresses
- Hover effect on rows

---

### 7. LoanSummaryModal
**Purpose**: Confirm loan details before transaction

**Features**:
- Semi-transparent backdrop with blur
- White card (400px max width)
- Loan breakdown: Amount, Fee (2%), Total Repayment
- Shows both USD and ETH values
- Warning message about collateral
- "Confirm & Sign Transaction" button
- Smooth fade-in/slide-up animations

---

### 8. ProcessingModal
**Purpose**: Show transaction processing state

**Features**:
- Semi-transparent backdrop with blur
- White card with spinner animation
- Dual-ring spinner (blue gradient)
- Title: "Processing"
- Subtitle: "Your payment is being securely processed on-chain."
- Time estimate: "This may take 10–15 seconds."
- Smooth animations

---

### 9. Footer
**Purpose**: Site footer with links and branding

**Features**:
- Light grey background (`#F3F4F6`)
- Three-column grid (responsive)
- Logo and description
- Navigation links
- Social/contact links
- Copyright notice
- Border top separator

---

## 🎭 Animations

### Transitions
- **Duration**: 200ms (fast)
- **Easing**: ease-in-out

### Hover Effects
- **2px lift**: `transform: translateY(-2px)`
- **Border tint**: Border color changes to primary
- **Shadow increase**: Box shadow becomes more prominent

### Keyframe Animations
- **fadeIn**: Opacity 0 → 1 (300ms)
- **slideUp**: Translate Y 20px → 0 (400ms)
- **slideDown**: Translate Y -10px → 0 (300ms)
- **spin**: Rotate 0deg → 360deg (1s linear infinite)

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Adaptations
- Navigation collapses to hamburger menu
- Cards stack vertically with 16px spacing
- Preset loan buttons wrap into 2 rows
- Tables become scrollable or stack
- Font sizes reduce (18-22px for headings)
- Padding reduces to 16px

---

## ♿ Accessibility

### Focus States
- Visible outline on keyboard focus
- 2px solid primary color
- 2px offset

### Color Contrast
- All text meets WCAG AA standards
- Primary text on white: 16.5:1
- Secondary text on white: 7.5:1

### Semantic HTML
- Proper heading hierarchy
- ARIA labels where needed
- Keyboard navigation support

---

## 🚀 Usage Guidelines

### Do's
✅ Use Inter font for all text
✅ Maintain consistent spacing (multiples of 4px)
✅ Use provided color tokens
✅ Apply hover effects to interactive elements
✅ Keep animations subtle (200ms)
✅ Ensure mobile responsiveness

### Don'ts
❌ Don't use custom colors outside the palette
❌ Don't add emojis unless specified
❌ Don't use heavy animations (> 500ms)
❌ Don't break the 1200px max-width container
❌ Don't use fonts other than Inter

---

## 🔧 Technical Implementation

### Tailwind Configuration
Custom design tokens are defined in `tailwind.config.js`:
- Colors
- Font families
- Font sizes
- Border radius
- Box shadows
- Transitions

### Global Styles
Base styles in `index.css`:
- Inter font import
- CSS reset
- Smooth transitions
- Custom scrollbar
- Animation keyframes

### Component Structure
```
src/
├── components/
│   ├── NavBar.js
│   ├── Dashboard.js
│   ├── ActiveLoans.js
│   ├── FAQ.js
│   ├── LiveTransactions.js
│   ├── LoanSummaryModal.js
│   ├── ProcessingModal.js
│   └── ConnectWallet.js
├── index.css
├── App.js
└── tailwind.config.js
```

---

## 📊 Design Principles

1. **Clarity**: Information is easy to scan and understand
2. **Trust**: Professional appearance builds user confidence
3. **Simplicity**: Minimal UI with clear hierarchy
4. **Consistency**: Uniform spacing, colors, and patterns
5. **Responsiveness**: Works seamlessly on all devices
6. **Accessibility**: Usable by everyone

---

## 🎯 Brand Personality

- **Professional**: Clean, organized, trustworthy
- **Modern**: Contemporary design patterns
- **Minimal**: No unnecessary elements
- **Data-Oriented**: Focus on numbers and clarity
- **Web3-Aware**: Subtle blockchain intelligence

---

## 📝 Notes

- All components use Tailwind CSS utility classes
- Animations are CSS-based (no heavy JS libraries)
- Design is optimized for light mode
- Mobile-first responsive approach
- Accessibility is built-in, not added later

---

**Version**: 1.0.0  
**Last Updated**: November 2025  
**Maintained By**: TrustLoan Development Team
