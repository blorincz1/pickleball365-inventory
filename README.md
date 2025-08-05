# Pickleball 365 Inventory Tracker

A modern React-based inventory management application for Pickleball 365 business, featuring beautiful UI design and persistent data storage.

## Features

- **Monthly Inventory Tracking**: Switch between 12 months to view and manage inventory
- **Product Categories**: Organized by Paddles, Apparel, and Accessories
- **Real-time Calculations**: Automatic cost and retail value calculations
- **Stock Level Indicators**: Visual indicators for low stock and out-of-stock items
- **Add/Delete Products**: Dynamic product management with form validation
- **Data Persistence**: All data is saved to localStorage automatically
- **Export Functionality**: Export inventory data to CSV format
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices

## Technology Stack

- **React 18**: Modern React with hooks and functional components
- **CSS3**: Beautiful gradient designs and smooth animations
- **localStorage**: Client-side data persistence
- **Create React App**: Development and build tooling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd inventory-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### Viewing Inventory
- Use the month buttons to switch between different months
- View summary statistics at the top of the page
- See product categories with emoji indicators

### Managing Products
- Click "➕ Add Product" to add new products
- Click "🗑️ Delete Mode" to enable product deletion
- Edit quantities directly in the table cells

### Exporting Data
- Click "📥 Export CSV" to download the current month's inventory as a CSV file

## Data Structure

The application maintains inventory data with the following structure:
- **Product Name**: Full product description
- **Retail Price**: Selling price to customers
- **Cost Price**: Purchase cost
- **Quantity**: Current stock level
- **Cost Value**: Total cost value (cost × quantity)
- **Retail Value**: Total retail value (retail × quantity)

## Deployment

### For AWS S3 + CloudFront

1. Build the production version:
```bash
npm run build
```

2. Upload the `build` folder contents to your S3 bucket

3. Configure CloudFront for CDN distribution

### For AWS Amplify

1. Connect your repository to AWS Amplify
2. Configure build settings to use `npm run build`
3. Deploy automatically on git push

## Development

### Project Structure

```
src/
├── components/          # React components
│   ├── InventoryTable.js
│   ├── MonthSelector.js
│   ├── SummaryCards.js
│   ├── ProductManagement.js
│   └── AddProductModal.js
├── hooks/              # Custom React hooks
│   └── useInventoryData.js
├── utils/              # Utility functions
│   └── formatters.js
├── App.js              # Main application component
└── App.css             # Styling
```

### Key Components

- **useInventoryData**: Custom hook managing all inventory state and localStorage persistence
- **InventoryTable**: Main table component with category grouping and editing
- **MonthSelector**: Month navigation and export functionality
- **SummaryCards**: Real-time summary statistics display
- **AddProductModal**: Form for adding new products

## Future Enhancements

- [ ] AWS DynamoDB integration for cloud data storage
- [ ] User authentication with AWS Cognito
- [ ] Real-time collaboration features
- [ ] Advanced reporting and analytics
- [ ] Barcode scanning integration
- [ ] Email notifications for low stock

## License

This project is proprietary software for Pickleball 365 business use.
