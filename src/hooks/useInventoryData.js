import { useState, useEffect } from 'react';

// Initial inventory data structure from the original HTML
const initialInventoryByCategory = {
  "Paddles": [
    ["JOOLA Ben Johns Perseus Pro IV 16mm Paddle", 279.95, 153.97, 6],
    ["JOOLA Ben Johns Perseus Pro IV 14mm Paddle", 279.95, 153.97, 2],
    ["JOOLA Ben Johns Hyperion Pro IV 16mm Paddle", 279.95, 153.97, 4],
    ["JOOLA Ben Johns Hyperion Pro IV 14mm Paddle", 279.95, 153.97, 2],
    ["JOOLA Simone Jardim Hyperion Pro IV 16mm Paddle", 279.95, 153.97, 2],
    ["JOOLA Collin Johns Scorpeus Pro IV 16mm Paddle", 279.95, 153.97, 3],
    ["JOOLA Anna Bright Scorpeus Pro IV 14mm Paddle", 279.95, 153.97, 3],
    ["JOOLA Tyson McGuffin Magnus Pro IV 16mm Paddle", 279.95, 153.97, 2],
    ["JOOLA Tyson McGuffin Magnus Pro IV 14mm Paddle", 279.95, 153.97, 5],
    ["JOOLA Agassi Pro 16mm Pickleball Paddle", 279.95, 153.97, 4],
    ["JOOLA Graf Pro 16mm Pickleball Paddle", 279.95, 153.97, 2],
    ["JOOLA Agassi Pro 14mm Pickleball Paddle", 279.95, 153.97, 0],
    ["JOOLA Agassi Edge 16mm Pickleball Paddle", 99.95, 54.97, 3],
    ["JOOLA Graf Edge 16mm Pickleball Paddle", 59.95, 32.97, 3],
    ["JOOLA Agassi Champion 12mm Pickleball Paddle", 59.95, 32.97, 0],
    ["JOOLA Graf Champion 12mm Pickleball Paddle", 59.95, 32.97, 0],
    ["JOOLA Agassi/Graf Champion Pickleball Paddle Set", 129.95, 71.47, 1],
    ["FRANKLIN Tour Dynasty 12mm FthrWt Paddle", 149.99, 75.00, 2],
    ["FRANKLIN Tour Tempo 12mm FthrWt Paddle", 149.99, 75.00, 3],
    ["FRANKLIN C45 Dynasty 14mm Red Paddle", 229.99, 115.00, 3],
    ["FRANKLIN C45 Dynasty 16mm Red Paddle", 229.99, 115.00, 2],
    ["P365 Pickleball Paddle", 79.00, 49.47, 24]
  ],
  "Apparel": [
    ["AA Sport-Tek Ladies Repeat Skort - True Navy / Medium", 45.00, 26.99, 1],
    ["AA Sport-Tek Ladies Repeat Skort - True Navy / Large", 45.00, 26.99, 1],
    ["AA Sport-Tek PosiCharge RacerMesh Visor - True Navy", 25.00, 15.26, 0],
    ["AA Holloway Ladies Coolcore Skort - Navy / Medium", 60.00, 41.82, 1],
    ["AA Performance Short Sleeve Tee Shirt - Navy / Small", 30.00, 14.00, 0],
    ["AA Performance Short Sleeve Tee Shirt - Navy / Medium", 30.00, 14.00, 0],
    ["AA Performance Short Sleeve Tee Shirt - Navy / Large", 30.00, 14.00, 0],
    ["AA Performance Short Sleeve Tee Shirt - Navy / X-Large", 30.00, 14.00, 0],
    ["AA Performance Short Sleeve Tee Shirt - Navy / XX-Large", 30.00, 14.00, 0],
    ["AA Performance Short Sleeve Tee Shirt - Navy / XXX-Large", 30.00, 14.00, 0],
    ["AA Performance Short Sleeve Tee Shirt - Neon Green / Small", 30.00, 14.00, 1],
    ["AA Performance Short Sleeve Tee Shirt - Neon Green / Medium", 30.00, 14.00, 1],
    ["AA Performance Short Sleeve Tee Shirt - Neon Green / Large", 30.00, 14.00, 1],
    ["AA Performance Short Sleeve Tee Shirt - Neon Green / X-Large", 30.00, 14.00, 1],
    ["AA Performance Long Sleeve Tee Shirt - Navy / Small", 35.00, 16.50, 0],
    ["AA Performance Long Sleeve Tee Shirt - Navy / Medium", 35.00, 16.50, 0],
    ["AA Performance Long Sleeve Tee Shirt - Navy / Large", 35.00, 16.50, 0],
    ["AA Performance Long Sleeve Tee Shirt - Navy / X-Large", 35.00, 16.50, 0],
    ["AA Performance Long Sleeve Tee Shirt - Navy / XX-Large", 35.00, 16.50, 0],
    ["AA Performance Long Sleeve Tee Shirt - Navy / XXX-Large", 35.00, 16.50, 0],
    ["QMI P365 Performance Short Sleeve Tee Shirt - Navy / Small", 30.00, 12.40, 6],
    ["QMI P365 Performance Short Sleeve Tee Shirt - Navy / Medium", 30.00, 12.40, 2],
    ["QMI P365 Performance Short Sleeve Tee Shirt - Navy / Large", 30.00, 12.40, 3],
    ["QMI P365 Performance Short Sleeve Tee Shirt - Navy / X-Large", 30.00, 12.40, 6],
    ["QMI P365 Performance Short Sleeve Tee Shirt - Navy / XX-Large", 30.00, 14.02, 6],
    ["QMI P365 Performance Short Sleeve Tee Shirt - Navy / XXX-Large", 30.00, 15.08, 3],
    ["QMI P365 Performance Long Sleeve Tee Shirt - Navy / Small", 35.00, 14.48, 0],
    ["QMI P365 Performance Long Sleeve Tee Shirt - Navy / Medium", 35.00, 14.48, 0],
    ["QMI P365 Performance Long Sleeve Tee Shirt - Navy / Large", 35.00, 14.48, 8],
    ["QMI P365 Performance Long Sleeve Tee Shirt - Navy / X-Large", 35.00, 14.48, 24],
    ["QMI P365 Performance Long Sleeve Tee Shirt - Navy / XX-Large", 35.00, 15.62, 4],
    ["QMI P365 Performance Long Sleeve Tee Shirt - Navy / XXX-Large", 35.00, 16.48, 2],
    ["QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Small", 25.00, 12.02, 0],
    ["QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Medium", 25.00, 12.02, 0],
    ["QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Large", 25.00, 12.02, 0],
    ["QMI P365 50/50 Short Sleeve Tee Shirt - Navy / X-Large", 25.00, 12.02, 0],
    ["QMI P365 50/50 Short Sleeve Tee Shirt - Navy / XX-Large", 25.00, 14.11, 11],
    ["QMI P365 50/50 Short Sleeve Tee Shirt - Navy / XXX-Large", 25.00, 16.52, 5],
    ["JUNK Flex Tie Headband Navy Blue", 30.00, 25.00, 10],
    ["JUNK Big Bang Lite Headband Navy Blue", 30.00, 25.00, 7]
  ],
  "Accessories": [
    ["JOOLA Essentials Pickleball Sling Bag", 25.00, 13.72, 30],
    ["JOOLA Universal Neoprene Pickleball Paddle Cover", 25.00, 10.97, 21],
    ["JOOLA Trinity Wristband 2-Pack", 12.00, 3.82, 20],
    ["JOOLA Pickleball Edge Guard Tape Black 5M", 17.95, 9.87, 0],
    ["JOOLA Pickleball Edge Guard Tape White 24M", 17.95, 9.87, 0],
    ["JOOLA Replacement White Ridge Grip 2-Pack", 15.95, 8.77, 0],
    ["JOOLA Replacement Feel-Tec Pure Grip", 15.95, 8.77, 0],
    ["JOOLA Premium Pickleball Paddle Overgrip 4-Count White", 12.00, 5.47, 2],
    ["JOOLA PRO IV Keychain - Agassi Pro", 10.00, 5.47, 6],
    ["JOOLA PRO IV Keychain - Hyperion Pro IV", 10.00, 5.47, 4],
    ["JOOLA PRO IV Keychain - Magnus Pro IV", 10.00, 5.47, 6],
    ["JOOLA PRO IV Keychain - Perseus Pro IV", 10.00, 5.47, 6],
    ["JOOLA PRO IV Keychain - Scorpeus Pro IV", 10.00, 5.47, 6],
    ["QMI P365 16oz Clear Tumbler - Lime Straw", 10.00, 4.55, 5],
    ["QMI P365 30oz White Travel Tumbler", 20.00, 7.75, 3],
    ["P365 Keychain Yellow", 5.00, 1.00, 30],
    ["P365 Keychain Pink", 5.00, 1.00, 23],
    ["P365 Keychain Red", 5.00, 1.00, 27],
    ["P365 Slim Tumbler", 12.00, 6.50, 14]
  ]
};

// April 2025 actual quantities
const aprilQuantities = {
  "JOOLA Ben Johns Perseus Pro IV 16mm Paddle": 13,
  "JOOLA Ben Johns Perseus Pro IV 14mm Paddle": 3,
  "JOOLA Ben Johns Hyperion Pro IV 16mm Paddle": 1,
  "JOOLA Ben Johns Hyperion Pro IV 14mm Paddle": 2,
  "JOOLA Simone Jardim Hyperion Pro IV 16mm Paddle": 2,
  "JOOLA Collin Johns Scorpeus Pro IV 16mm Paddle": 1,
  "JOOLA Anna Bright Scorpeus Pro IV 14mm Paddle": 2,
  "JOOLA Tyson McGuffin Magnus Pro IV 16mm Paddle": 1,
  "JOOLA Tyson McGuffin Magnus Pro IV 14mm Paddle": 2,
  "JOOLA Agassi Pro 16mm Pickleball Paddle": 0,
  "JOOLA Graf Pro 16mm Pickleball Paddle": 0,
  "JOOLA Agassi Pro 14mm Pickleball Paddle": 0,
  "JOOLA Agassi Edge 16mm Pickleball Paddle": 0,
  "JOOLA Graf Edge 16mm Pickleball Paddle": 0,
  "JOOLA Agassi Champion 12mm Pickleball Paddle": 0,
  "JOOLA Graf Champion 12mm Pickleball Paddle": 0,
  "JOOLA Agassi/Graf Champion Pickleball Paddle Set": 1,
  "FRANKLIN Tour Dynasty 12mm FthrWt Paddle": 0,
  "FRANKLIN Tour Tempo 12mm FthrWt Paddle": 0,
  "FRANKLIN C45 Dynasty 14mm Red Paddle": 0,
  "FRANKLIN C45 Dynasty 16mm Red Paddle": 0,
  "P365 Pickleball Paddle": 50,
  "AA Sport-Tek Ladies Repeat Skort - True Navy / Medium": 0,
  "AA Sport-Tek Ladies Repeat Skort - True Navy / Large": 0,
  "AA Sport-Tek PosiCharge RacerMesh Visor - True Navy": 0,
  "AA Holloway Ladies Coolcore Skort - Navy / Medium": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / Small": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / Medium": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / X-Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / XX-Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / XXX-Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / Small": 0,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / Medium": 0,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / X-Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / Small": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / Medium": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / X-Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / XX-Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / XXX-Large": 0,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / Small": 10,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / Medium": 15,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / Large": 25,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / X-Large": 30,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / XX-Large": 15,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / XXX-Large": 5,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / Small": 5,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / Medium": 15,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / Large": 25,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / X-Large": 30,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / XX-Large": 15,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / XXX-Large": 5,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Small": 20,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Medium": 40,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Large": 55,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / X-Large": 40,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / XX-Large": 20,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / XXX-Large": 10,
  "JUNK Flex Tie Headband Navy Blue": 0,
  "JUNK Big Bang Lite Headband Navy Blue": 0,
  "JOOLA Essentials Pickleball Sling Bag": 75,
  "JOOLA Universal Neoprene Pickleball Paddle Cover": 5,
  "JOOLA Trinity Wristband 2-Pack": 0,
  "JOOLA Pickleball Edge Guard Tape Black 5M": 2,
  "JOOLA Pickleball Edge Guard Tape White 24M": 2,
  "JOOLA Replacement White Ridge Grip 2-Pack": 2,
  "JOOLA Replacement Feel-Tec Pure Grip": 2,
  "JOOLA Premium Pickleball Paddle Overgrip 4-Count White": 0,
  "JOOLA PRO IV Keychain - Agassi Pro": 0,
  "JOOLA PRO IV Keychain - Hyperion Pro IV": 0,
  "JOOLA PRO IV Keychain - Magnus Pro IV": 0,
  "JOOLA PRO IV Keychain - Perseus Pro IV": 0,
  "JOOLA PRO IV Keychain - Scorpeus Pro IV": 0,
  "QMI P365 16oz Clear Tumbler - Lime Straw": 0,
  "QMI P365 30oz White Travel Tumbler": 128,
  "P365 Keychain Yellow": 0,
  "P365 Keychain Pink": 0,
  "P365 Keychain Red": 0,
  "P365 Slim Tumbler": 35
};

// May 2025 actual quantities
const mayQuantities = {
  "JOOLA Ben Johns Perseus Pro IV 16mm Paddle": 2,
  "JOOLA Ben Johns Perseus Pro IV 14mm Paddle": 2,
  "JOOLA Ben Johns Hyperion Pro IV 16mm Paddle": 1,
  "JOOLA Ben Johns Hyperion Pro IV 14mm Paddle": 2,
  "JOOLA Simone Jardim Hyperion Pro IV 16mm Paddle": 2,
  "JOOLA Collin Johns Scorpeus Pro IV 16mm Paddle": 3,
  "JOOLA Anna Bright Scorpeus Pro IV 14mm Paddle": 3,
  "JOOLA Tyson McGuffin Magnus Pro IV 16mm Paddle": 2,
  "JOOLA Tyson McGuffin Magnus Pro IV 14mm Paddle": 5,
  "JOOLA Agassi Pro 16mm Pickleball Paddle": 2,
  "JOOLA Graf Pro 16mm Pickleball Paddle": 2,
  "JOOLA Agassi Pro 14mm Pickleball Paddle": 2,
  "JOOLA Agassi Edge 16mm Pickleball Paddle": 3,
  "JOOLA Graf Edge 16mm Pickleball Paddle": 2,
  "JOOLA Agassi Champion 12mm Pickleball Paddle": 0,
  "JOOLA Graf Champion 12mm Pickleball Paddle": 0,
  "JOOLA Agassi/Graf Champion Pickleball Paddle Set": 1,
  "FRANKLIN Tour Dynasty 12mm FthrWt Paddle": 2,
  "FRANKLIN Tour Tempo 12mm FthrWt Paddle": 3,
  "FRANKLIN C45 Dynasty 14mm Red Paddle": 3,
  "FRANKLIN C45 Dynasty 16mm Red Paddle": 2,
  "P365 Pickleball Paddle": 23,
  "AA Sport-Tek Ladies Repeat Skort - True Navy / Medium": 0,
  "AA Sport-Tek Ladies Repeat Skort - True Navy / Large": 0,
  "AA Sport-Tek PosiCharge RacerMesh Visor - True Navy": 0,
  "AA Holloway Ladies Coolcore Skort - Navy / Medium": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / Small": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / Medium": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / X-Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / XX-Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / XXX-Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / Small": 0,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / Medium": 0,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / X-Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / Small": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / Medium": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / X-Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / XX-Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / XXX-Large": 0,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / Small": 6,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / Medium": 2,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / Large": 2,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / X-Large": 5,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / XX-Large": 6,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / XXX-Large": 3,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / Small": 0,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / Medium": 0,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / Large": 8,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / X-Large": 24,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / XX-Large": 4,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / XXX-Large": 2,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Small": 0,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Medium": 0,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Large": 0,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / X-Large": 0,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / XX-Large": 11,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / XXX-Large": 5,
  "JUNK Flex Tie Headband Navy Blue": 10,
  "JUNK Big Bang Lite Headband Navy Blue": 7,
  "JOOLA Essentials Pickleball Sling Bag": 30,
  "JOOLA Universal Neoprene Pickleball Paddle Cover": 21,
  "JOOLA Trinity Wristband 2-Pack": 20,
  "JOOLA Pickleball Edge Guard Tape Black 5M": 0,
  "JOOLA Pickleball Edge Guard Tape White 24M": 0,
  "JOOLA Replacement White Ridge Grip 2-Pack": 0,
  "JOOLA Replacement Feel-Tec Pure Grip": 0,
  "JOOLA Premium Pickleball Paddle Overgrip 4-Count White": 2,
  "JOOLA PRO IV Keychain - Agassi Pro": 6,
  "JOOLA PRO IV Keychain - Hyperion Pro IV": 4,
  "JOOLA PRO IV Keychain - Magnus Pro IV": 6,
  "JOOLA PRO IV Keychain - Perseus Pro IV": 6,
  "JOOLA PRO IV Keychain - Scorpeus Pro IV": 6,
  "QMI P365 16oz Clear Tumbler - Lime Straw": 5,
  "QMI P365 30oz White Travel Tumbler": 3,
  "P365 Keychain Yellow": 30,
  "P365 Keychain Pink": 23,
  "P365 Keychain Red": 27,
  "P365 Slim Tumbler": 14
};

// June 2025 actual quantities
const juneQuantities = {
  "JOOLA Ben Johns Perseus Pro IV 16mm Paddle": 0,
  "JOOLA Ben Johns Perseus Pro IV 14mm Paddle": 1,
  "JOOLA Ben Johns Hyperion Pro IV 16mm Paddle": 1,
  "JOOLA Ben Johns Hyperion Pro IV 14mm Paddle": 2,
  "JOOLA Simone Jardim Hyperion Pro IV 16mm Paddle": 2,
  "JOOLA Collin Johns Scorpeus Pro IV 16mm Paddle": 1,
  "JOOLA Anna Bright Scorpeus Pro IV 14mm Paddle": 3,
  "JOOLA Tyson McGuffin Magnus Pro IV 16mm Paddle": 1,
  "JOOLA Tyson McGuffin Magnus Pro IV 14mm Paddle": 5,
  "JOOLA Agassi Pro 16mm Pickleball Paddle": 1,
  "JOOLA Graf Pro 16mm Pickleball Paddle": 2,
  "JOOLA Agassi Pro 14mm Pickleball Paddle": 1,
  "JOOLA Agassi Edge 16mm Pickleball Paddle": 3,
  "JOOLA Graf Edge 16mm Pickleball Paddle": 3,
  "JOOLA Agassi Champion 12mm Pickleball Paddle": 0,
  "JOOLA Graf Champion 12mm Pickleball Paddle": 0,
  "JOOLA Agassi/Graf Champion Pickleball Paddle Set": 1,
  "FRANKLIN Tour Dynasty 12mm FthrWt Paddle": 2,
  "FRANKLIN Tour Tempo 12mm FthrWt Paddle": 3,
  "FRANKLIN C45 Dynasty 14mm Red Paddle": 3,
  "FRANKLIN C45 Dynasty 16mm Red Paddle": 2,
  "P365 Pickleball Paddle": 24,
  "AA Sport-Tek Ladies Repeat Skort - True Navy / Medium": 0,
  "AA Sport-Tek Ladies Repeat Skort - True Navy / Large": 0,
  "AA Sport-Tek PosiCharge RacerMesh Visor - True Navy": 0,
  "AA Holloway Ladies Coolcore Skort - Navy / Medium": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / Small": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / Medium": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / X-Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / XX-Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / XXX-Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / Small": 0,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / Medium": 0,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / X-Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / Small": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / Medium": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / X-Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / XX-Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / XXX-Large": 0,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / Small": 2,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / Medium": 1,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / Large": 1,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / X-Large": 2,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / XX-Large": 4,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / XXX-Large": 3,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / Small": 1,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / Medium": 0,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / Large": 8,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / X-Large": 24,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / XX-Large": 4,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / XXX-Large": 2,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Small": 0,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Medium": 0,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Large": 0,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / X-Large": 0,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / XX-Large": 11,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / XXX-Large": 5,
  "JUNK Flex Tie Headband Navy Blue": 9,
  "JUNK Big Bang Lite Headband Navy Blue": 5,
  "JOOLA Essentials Pickleball Sling Bag": 30,
  "JOOLA Universal Neoprene Pickleball Paddle Cover": 21,
  "JOOLA Trinity Wristband 2-Pack": 20,
  "JOOLA Pickleball Edge Guard Tape Black 5M": 0,
  "JOOLA Pickleball Edge Guard Tape White 24M": 0,
  "JOOLA Replacement White Ridge Grip 2-Pack": 0,
  "JOOLA Replacement Feel-Tec Pure Grip": 0,
  "JOOLA Premium Pickleball Paddle Overgrip 4-Count White": 2,
  "JOOLA PRO IV Keychain - Agassi Pro": 6,
  "JOOLA PRO IV Keychain - Hyperion Pro IV": 4,
  "JOOLA PRO IV Keychain - Magnus Pro IV": 6,
  "JOOLA PRO IV Keychain - Perseus Pro IV": 6,
  "JOOLA PRO IV Keychain - Scorpeus Pro IV": 6,
  "QMI P365 16oz Clear Tumbler - Lime Straw": 5,
  "QMI P365 30oz White Travel Tumbler": 3,
  "P365 Keychain Yellow": 30,
  "P365 Keychain Pink": 23,
  "P365 Keychain Red": 27,
  "P365 Slim Tumbler": 14
};

// July 2025 actual quantities
const julyQuantities = {
  "JOOLA Ben Johns Perseus Pro IV 16mm Paddle": 6,
  "JOOLA Ben Johns Perseus Pro IV 14mm Paddle": 2,
  "JOOLA Ben Johns Hyperion Pro IV 16mm Paddle": 4,
  "JOOLA Ben Johns Hyperion Pro IV 14mm Paddle": 2,
  "JOOLA Simone Jardim Hyperion Pro IV 16mm Paddle": 2,
  "JOOLA Collin Johns Scorpeus Pro IV 16mm Paddle": 3,
  "JOOLA Anna Bright Scorpeus Pro IV 14mm Paddle": 3,
  "JOOLA Tyson McGuffin Magnus Pro IV 16mm Paddle": 2,
  "JOOLA Tyson McGuffin Magnus Pro IV 14mm Paddle": 5,
  "JOOLA Agassi Pro 16mm Pickleball Paddle": 4,
  "JOOLA Graf Pro 16mm Pickleball Paddle": 2,
  "JOOLA Agassi Pro 14mm Pickleball Paddle": 0,
  "JOOLA Agassi Edge 16mm Pickleball Paddle": 3,
  "JOOLA Graf Edge 16mm Pickleball Paddle": 3,
  "JOOLA Agassi Champion 12mm Pickleball Paddle": 0,
  "JOOLA Graf Champion 12mm Pickleball Paddle": 0,
  "JOOLA Agassi/Graf Champion Pickleball Paddle Set": 1,
  "FRANKLIN Tour Dynasty 12mm FthrWt Paddle": 2,
  "FRANKLIN Tour Tempo 12mm FthrWt Paddle": 3,
  "FRANKLIN C45 Dynasty 14mm Red Paddle": 3,
  "FRANKLIN C45 Dynasty 16mm Red Paddle": 2,
  "P365 Pickleball Paddle": 24,
  "AA Sport-Tek Ladies Repeat Skort - True Navy / Medium": 1,
  "AA Sport-Tek Ladies Repeat Skort - True Navy / Large": 1,
  "AA Sport-Tek PosiCharge RacerMesh Visor - True Navy": 0,
  "AA Holloway Ladies Coolcore Skort - Navy / Medium": 1,
  "AA Performance Short Sleeve Tee Shirt - Navy / Small": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / Medium": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / X-Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / XX-Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / XXX-Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / Small": 1,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / Medium": 1,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / Large": 1,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / X-Large": 1,
  "AA Performance Long Sleeve Tee Shirt - Navy / Small": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / Medium": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / X-Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / XX-Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / XXX-Large": 0,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / Small": 6,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / Medium": 2,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / Large": 3,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / X-Large": 6,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / XX-Large": 6,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / XXX-Large": 3,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / Small": 0,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / Medium": 0,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / Large": 8,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / X-Large": 24,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / XX-Large": 11,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / XXX-Large": 2,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Small": 0,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Medium": 0,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Large": 0,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / X-Large": 0,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / XX-Large": 11,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / XXX-Large": 5,
  "JUNK Flex Tie Headband Navy Blue": 10,
  "JUNK Big Bang Lite Headband Navy Blue": 7,
  "JOOLA Essentials Pickleball Sling Bag": 30,
  "JOOLA Universal Neoprene Pickleball Paddle Cover": 21,
  "JOOLA Trinity Wristband 2-Pack": 20,
  "JOOLA Pickleball Edge Guard Tape Black 5M": 0,
  "JOOLA Pickleball Edge Guard Tape White 24M": 0,
  "JOOLA Replacement White Ridge Grip 2-Pack": 0,
  "JOOLA Replacement Feel-Tec Pure Grip": 0,
  "JOOLA Premium Pickleball Paddle Overgrip 4-Count White": 2,
  "JOOLA PRO IV Keychain - Agassi Pro": 6,
  "JOOLA PRO IV Keychain - Hyperion Pro IV": 4,
  "JOOLA PRO IV Keychain - Magnus Pro IV": 6,
  "JOOLA PRO IV Keychain - Perseus Pro IV": 5,
  "JOOLA PRO IV Keychain - Scorpeus Pro IV": 5,
  "QMI P365 16oz Clear Tumbler - Lime Straw": 5,
  "QMI P365 30oz White Travel Tumbler": 3,
  "P365 Keychain Yellow": 30,
  "P365 Keychain Pink": 23,
  "P365 Keychain Red": 27,
  "P365 Slim Tumbler": 14
};

// August 2025 actual quantities
const augustQuantities = {
  "JOOLA Ben Johns Perseus Pro IV 16mm Paddle": 6,
  "JOOLA Ben Johns Perseus Pro IV 14mm Paddle": 2,
  "JOOLA Ben Johns Hyperion Pro IV 16mm Paddle": 4,
  "JOOLA Ben Johns Hyperion Pro IV 14mm Paddle": 2,
  "JOOLA Simone Jardim Hyperion Pro IV 16mm Paddle": 2,
  "JOOLA Collin Johns Scorpeus Pro IV 16mm Paddle": 3,
  "JOOLA Anna Bright Scorpeus Pro IV 14mm Paddle": 3,
  "JOOLA Tyson McGuffin Magnus Pro IV 16mm Paddle": 2,
  "JOOLA Tyson McGuffin Magnus Pro IV 14mm Paddle": 5,
  "JOOLA Agassi Pro 16mm Pickleball Paddle": 4,
  "JOOLA Graf Pro 16mm Pickleball Paddle": 2,
  "JOOLA Agassi Pro 14mm Pickleball Paddle": 0,
  "JOOLA Agassi Edge 16mm Pickleball Paddle": 3,
  "JOOLA Graf Edge 16mm Pickleball Paddle": 3,
  "JOOLA Agassi Champion 12mm Pickleball Paddle": 0,
  "JOOLA Graf Champion 12mm Pickleball Paddle": 0,
  "JOOLA Agassi/Graf Champion Pickleball Paddle Set": 1,
  "FRANKLIN Tour Dynasty 12mm FthrWt Paddle": 2,
  "FRANKLIN Tour Tempo 12mm FthrWt Paddle": 3,
  "FRANKLIN C45 Dynasty 14mm Red Paddle": 3,
  "FRANKLIN C45 Dynasty 16mm Red Paddle": 2,
  "P365 Pickleball Paddle": 24,
  "AA Sport-Tek Ladies Repeat Skort - True Navy / Medium": 1,
  "AA Sport-Tek Ladies Repeat Skort - True Navy / Large": 1,
  "AA Sport-Tek PosiCharge RacerMesh Visor - True Navy": 0,
  "AA Holloway Ladies Coolcore Skort - Navy / Medium": 1,
  "AA Performance Short Sleeve Tee Shirt - Navy / Small": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / Medium": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / X-Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / XX-Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Navy / XXX-Large": 0,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / Small": 1,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / Medium": 1,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / Large": 1,
  "AA Performance Short Sleeve Tee Shirt - Neon Green / X-Large": 1,
  "AA Performance Long Sleeve Tee Shirt - Navy / Small": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / Medium": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / X-Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / XX-Large": 0,
  "AA Performance Long Sleeve Tee Shirt - Navy / XXX-Large": 0,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / Small": 6,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / Medium": 2,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / Large": 3,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / X-Large": 6,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / XX-Large": 6,
  "QMI P365 Performance Short Sleeve Tee Shirt - Navy / XXX-Large": 3,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / Small": 0,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / Medium": 0,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / Large": 8,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / X-Large": 24,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / XX-Large": 11,
  "QMI P365 Performance Long Sleeve Tee Shirt - Navy / XXX-Large": 2,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Small": 0,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Medium": 0,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / Large": 0,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / X-Large": 0,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / XX-Large": 11,
  "QMI P365 50/50 Short Sleeve Tee Shirt - Navy / XXX-Large": 5,
  "JUNK Flex Tie Headband Navy Blue": 10,
  "JUNK Big Bang Lite Headband Navy Blue": 7,
  "JOOLA Essentials Pickleball Sling Bag": 30,
  "JOOLA Universal Neoprene Pickleball Paddle Cover": 21,
  "JOOLA Trinity Wristband 2-Pack": 20,
  "JOOLA Pickleball Edge Guard Tape Black 5M": 0,
  "JOOLA Pickleball Edge Guard Tape White 24M": 0,
  "JOOLA Replacement White Ridge Grip 2-Pack": 0,
  "JOOLA Replacement Feel-Tec Pure Grip": 0,
  "JOOLA Premium Pickleball Paddle Overgrip 4-Count White": 2,
  "JOOLA PRO IV Keychain - Agassi Pro": 6,
  "JOOLA PRO IV Keychain - Hyperion Pro IV": 4,
  "JOOLA PRO IV Keychain - Magnus Pro IV": 6,
  "JOOLA PRO IV Keychain - Perseus Pro IV": 5,
  "JOOLA PRO IV Keychain - Scorpeus Pro IV": 5,
  "QMI P365 16oz Clear Tumbler - Lime Straw": 5,
  "QMI P365 30oz White Travel Tumbler": 3,
  "P365 Keychain Yellow": 30,
  "P365 Keychain Pink": 23,
  "P365 Keychain Red": 27,
  "P365 Slim Tumbler": 14
};

// Initialize inventory data for all months
const initializeInventoryData = () => {
  const initialInventory = [
    ...initialInventoryByCategory.Paddles,
    ...initialInventoryByCategory.Apparel,
    ...initialInventoryByCategory.Accessories
  ];

  const inventoryData = {};
  
  for (let i = 0; i < 12; i++) {
    inventoryData[i] = initialInventory.map(item => [...item]);
    
    // Zero out quantities for January, February, March (business didn't open until April)
    if (i < 3) {
      inventoryData[i].forEach(item => {
        item[3] = 0; // Set quantity to 0
      });
    }
    
    // Use actual April quantities for April (month index 3)
    if (i === 3) {
      inventoryData[i].forEach(item => {
        const productName = item[0];
        if (aprilQuantities.hasOwnProperty(productName)) {
          item[3] = aprilQuantities[productName];
        } else {
          item[3] = 0; // Default to 0 if not found
        }
      });
    }
    
    // Use actual May quantities for May (month index 4)
    if (i === 4) {
      inventoryData[i].forEach(item => {
        const productName = item[0];
        if (mayQuantities.hasOwnProperty(productName)) {
          item[3] = mayQuantities[productName];
        } else {
          item[3] = 0; // Default to 0 if not found
        }
      });
    }
    
    // Use actual June quantities for June (month index 5)
    if (i === 5) {
      inventoryData[i].forEach(item => {
        const productName = item[0];
        if (juneQuantities.hasOwnProperty(productName)) {
          item[3] = juneQuantities[productName];
        } else {
          item[3] = 0; // Default to 0 if not found
        }
      });
    }
    
    // Use actual July quantities for July (month index 6)
    if (i === 6) {
      inventoryData[i].forEach(item => {
        const productName = item[0];
        if (julyQuantities.hasOwnProperty(productName)) {
          item[3] = julyQuantities[productName];
        } else {
          item[3] = 0; // Default to 0 if not found
        }
      });
    }
    
    // Use actual August quantities for August (month index 7)
    if (i === 7) {
      inventoryData[i].forEach(item => {
        const productName = item[0];
        if (augustQuantities.hasOwnProperty(productName)) {
          item[3] = augustQuantities[productName];
        } else {
          item[3] = 0; // Default to 0 if not found
        }
      });
    }
  }
  
  return inventoryData;
};

export const useInventoryData = () => {
  const [inventoryData, setInventoryData] = useState(initializeInventoryData());
  const [currentMonth, setCurrentMonth] = useState(6); // July (0-indexed)
  const [deleteMode, setDeleteMode] = useState(false);
  const [inventoryByCategory, setInventoryByCategory] = useState(initialInventoryByCategory);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('inventoryData');
    const savedMonth = localStorage.getItem('currentMonth');
    const savedCategoryData = localStorage.getItem('inventoryByCategory');
    
    if (savedData) {
      setInventoryData(JSON.parse(savedData));
    } else {
      const initialData = initializeInventoryData();
      setInventoryData(initialData);
    }
    
    if (savedMonth !== null) {
      setCurrentMonth(parseInt(savedMonth));
    }
    
    if (savedCategoryData) {
      setInventoryByCategory(JSON.parse(savedCategoryData));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('inventoryData', JSON.stringify(inventoryData));
    localStorage.setItem('currentMonth', currentMonth.toString());
    localStorage.setItem('inventoryByCategory', JSON.stringify(inventoryByCategory));
  }, [inventoryData, currentMonth, inventoryByCategory]);

  const updateQuantity = (index, newQuantity) => {
    const quantity = parseInt(newQuantity) || 0;
    setInventoryData(prev => {
      const newData = { ...prev };
      if (newData[currentMonth] && newData[currentMonth][index]) {
        newData[currentMonth] = [...newData[currentMonth]];
        newData[currentMonth][index] = [
          ...newData[currentMonth][index].slice(0, 3),
          quantity
        ];
      }
      return newData;
    });
  };

  const switchMonth = (monthIndex) => {
    setCurrentMonth(monthIndex);
  };

  const toggleDeleteMode = () => {
    setDeleteMode(prev => !prev);
  };

  const addProduct = (name, retail, cost, category, quantity = 0) => {
    const newProduct = [name, retail, cost, quantity];
    
    if (inventoryByCategory[category]) {
      const newCategoryData = {
        ...inventoryByCategory,
        [category]: [...inventoryByCategory[category], newProduct]
      };
      
      setInventoryByCategory(newCategoryData);
      
      // Rebuild flattened inventory
      const newFlatInventory = [
        ...newCategoryData.Paddles,
        ...newCategoryData.Apparel,
        ...newCategoryData.Accessories
      ];
      
      // Update all months with the new product structure
      setInventoryData(prev => {
        const newData = {};
        for (let i = 0; i < 12; i++) {
          // Keep existing quantities for existing products
          const existingQuantities = {};
          prev[i].forEach((item, index) => {
            if (index < prev[i].length) {
              existingQuantities[item[0]] = item[3];
            }
          });
          
          // Rebuild with new structure
          newData[i] = newFlatInventory.map(item => {
            const productName = item[0];
            const existingQty = existingQuantities[productName];
            return [
              item[0], 
              item[1], 
              item[2], 
              existingQty !== undefined ? existingQty : (i < 3 ? 0 : quantity)
            ];
          });
        }
        return newData;
      });
      
      return true;
    }
    return false;
  };

  const deleteProduct = (index) => {
    // Find which category and index within category
    let globalIndex = 0;
    let categoryFound = '';
    let categoryIndex = -1;
    
    for (const [category, products] of Object.entries(inventoryByCategory)) {
      if (index >= globalIndex && index < globalIndex + products.length) {
        categoryFound = category;
        categoryIndex = index - globalIndex;
        break;
      }
      globalIndex += products.length;
    }
    
    if (categoryFound && categoryIndex >= 0) {
      // Remove from category
      const newCategoryData = {
        ...inventoryByCategory,
        [categoryFound]: inventoryByCategory[categoryFound].filter((_, i) => i !== categoryIndex)
      };
      
      setInventoryByCategory(newCategoryData);
      
      // Update all months by removing the product
      setInventoryData(prev => {
        const newData = {};
        for (let i = 0; i < 12; i++) {
          newData[i] = prev[i].filter((_, i) => i !== index);
        }
        return newData;
      });
    }
  };

  return {
    inventoryData,
    currentMonth,
    deleteMode,
    inventoryByCategory,
    updateQuantity,
    switchMonth,
    toggleDeleteMode,
    addProduct,
    deleteProduct
  };
}; 