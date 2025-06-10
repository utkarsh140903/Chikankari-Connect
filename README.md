# Chikankari Connect Craft 🧵

*Empowering Traditional Artisans - A Digital Marketplace for Authentic Chikankari*

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.11-teal.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-red.svg)]()

## 📖 About The Project

Chikankari Connect Craft is a modern web platform that bridges the gap between traditional Chikankari artisans from Lucknow and customers worldwide. This platform eliminates middlemen, ensuring fair prices for artisans while providing customers with authentic, handcrafted Chikankari products.

### 🎯 Key Features
- **Direct Connection**: Connect customers directly with skilled artisans
- **Fair Marketplace**: Transparent pricing and authentic products
- **Learning Center**: Educational resources about Chikankari craft
- **Multi-language Support**: Available in English and Hindi
- **Responsive Design**: Works seamlessly on all devices
- **Role-based Access**: Separate interfaces for customers, artisans, and designers

## 🚀 Project Status

### ✅ Completed Features
- [x] **Landing Page**: Complete with hero section, features showcase, and testimonials
- [x] **Multi-language Support**: English and Hindi language toggle
- [x] **Theme System**: Dark/light mode toggle
- [x] **Role Selection**: Customer, Artisan, and Designer role flows
- [x] **UI Components**: Complete Shadcn/UI component library integration
- [x] **Authentication Pages**: Phone authentication and profile setup
- [x] **Responsive Design**: Mobile-first approach with Tailwind CSS
- [x] **Routing System**: React Router DOM implementation
- [x] **Basic Project Structure**: Well-organized component architecture

### 🚧 In Progress
- [ ] **Marketplace Functionality**: Product browsing and search
- [ ] **Artisan Dashboard**: Product management and order tracking
- [ ] **Chat System**: Direct communication between users
- [ ] **Learning Center**: Tutorial and educational content
- [ ] **Payment Integration**: Secure payment processing

### 📋 Upcoming Features
- [ ] **Backend Integration**: API connections and data management
- [ ] **User Profile Management**: Complete profile customization
- [ ] **Order Management System**: End-to-end order processing
- [ ] **Review and Rating System**: Product and artisan ratings
- [ ] **Advanced Search and Filters**: Enhanced product discovery
- [ ] **Notification System**: Real-time updates and alerts
- [ ] **Analytics Dashboard**: Business intelligence for artisans
- [ ] **Mobile App**: React Native companion app

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: TailwindCSS 3.4.11 with custom design system
- **UI Components**: Shadcn/UI with Radix UI primitives
- **Icons**: Lucide React
- **Routing**: React Router DOM 6.26.2
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization

### Development Tools
- **Linting**: ESLint 9.9.0 with TypeScript support
- **Type Checking**: TypeScript 5.5.3
- **Package Manager**: npm (with optional Bun support)
- **Version Control**: Git

## 📦 Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **Bun** (v1.0.0 or higher)
- **Git**

### 🔄 Cloning the Repository

1. **Clone the main repository**:
   ```bash
   git clone https://github.com/your-organization/chikan-connect-craft.git
   cd chikan-connect-craft
   ```

### 📥 Installation

1. **Install dependencies**:
   ```bash
   npm install
   # or if using Bun
   bun install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

### 🏗️ Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🌿 Git Workflow & Best Practices

### 🚨 **IMPORTANT: Never Push Directly to Main Branch**

To maintain code quality and prevent conflicts, **always** follow this workflow:

### 1. Create a Feature Branch
```bash
# Always start from the latest main branch
git checkout main
git pull origin main

# Create a new feature branch with descriptive name
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/bug-description
# or for improvements
git checkout -b improvement/improvement-description
```

### 2. Branch Naming Conventions
- **Features**: `feature/marketplace-product-search`
- **Bug Fixes**: `fix/authentication-error`
- **Improvements**: `improvement/mobile-responsiveness`
- **Documentation**: `docs/readme-update`

### 3. Making Changes
```bash
# Make your changes and commit regularly
git add .
git commit -m "feat: add product search functionality"

# Push your branch to remote
git push origin feature/your-feature-name
```

### 4. Creating Pull Requests
1. **Go to GitHub repository**
2. **Click "New Pull Request"**
3. **Select your branch** as source and `main` as target
4. **Fill out the PR template**:
   - Clear title describing the change
   - Detailed description of what was implemented
   - Screenshots if UI changes were made
   - Testing instructions

### 5. Pull Request Review Process
- **Code Review**: At least one team member must review
- **Testing**: Ensure all tests pass
- **Conflicts**: Resolve any merge conflicts
- **Admin Approval**: Admin/maintainer approves and merges

### 6. After Merge
```bash
# Switch back to main and update
git checkout main
git pull origin main

# Delete the merged branch locally
git branch -d feature/your-feature-name

# Delete the remote branch (optional)
git push origin --delete feature/your-feature-name
```

## 👥 Team Collaboration Guidelines

### 📝 Commit Message Format
Use [Conventional Commits](https://www.conventionalcommits.org/) format:
```bash
# Feature commits
git commit -m "feat: add user authentication system"

# Bug fix commits
git commit -m "fix: resolve mobile navigation issue"

# Documentation commits
git commit -m "docs: update API documentation"

# Style commits
git commit -m "style: improve button hover effects"

# Refactor commits
git commit -m "refactor: optimize product listing component"
```

### 🔍 Code Review Checklist
- [ ] Code follows project conventions
- [ ] No console.logs or debugging code
- [ ] Components are properly typed (TypeScript)
- [ ] Responsive design works on mobile
- [ ] Accessibility considerations implemented
- [ ] Performance implications considered
- [ ] Tests added/updated if necessary

### 📱 Testing Your Changes
Before creating a PR, ensure:
```bash
# Run linter
npm run lint

# Build successfully
npm run build

# Test on different screen sizes
# Test dark/light mode toggle
# Test language switching (EN/HI)
# Test navigation flows
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   ├── layout/         # Layout components (Header, Nav)
│   └── *.tsx           # Feature-specific components
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── marketplace/    # Marketplace pages
│   ├── artisan/        # Artisan dashboard pages
│   └── learn/          # Learning center pages
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── App.tsx             # Main app component
└── main.tsx            # App entry point
```

## 🎨 Design System

This project uses a comprehensive design system built on:
- **Shadcn/UI**: Component library
- **Tailwind CSS**: Utility-first styling
- **Radix UI**: Accessible component primitives
- **Custom Color Palette**: Indigo and Rose theme
- **Typography**: Responsive font scaling
- **Dark Mode**: System-wide theme support

## 🚀 Key Improvements Needed

### High Priority
1. **Backend Integration**: Connect with REST APIs
2. **State Management**: Implement global state for user data
3. **Error Handling**: Add comprehensive error boundaries
4. **Loading States**: Implement loading skeletons and states
5. **Form Validation**: Enhanced form validation and error messages

### Medium Priority
1. **Performance Optimization**: Code splitting and lazy loading
2. **SEO Optimization**: Meta tags and structured data
3. **Progressive Web App**: Service worker and offline support
4. **Internationalization**: Better i18n implementation
5. **Testing Suite**: Unit and integration tests

### Low Priority
1. **Advanced Analytics**: User behavior tracking
2. **A/B Testing**: Feature flag system
3. **Advanced Animations**: Framer Motion integration
4. **Storybook**: Component documentation

## 🔧 Environment Setup

### Development Environment
```bash
# Copy environment template
cp .env.example .env.local

# Add your environment variables
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Chikankari Connect Craft
```

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Shadcn/UI Components](https://ui.shadcn.com/)
- [React Router Guide](https://reactrouter.com/)

## 🤝 Contributing

1. **Read the guidelines above**
2. **Pick an issue** from the project board
3. **Follow the git workflow**
4. **Write clean, documented code**
5. **Test thoroughly**
6. **Create detailed pull requests**

## 📞 Support

For questions or support:
- **Create an issue** on GitHub
- **Contact team lead** for urgent matters
- **Check existing documentation** first

## 📄 License

This project is private and proprietary. All rights reserved.

---

**Happy Coding! 🚀**

*Remember: Quality over speed. We're building something that preserves and promotes traditional Indian craftsmanship.*
