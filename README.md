# MokeSell

## 📌 MokeSell Existing Features and Future Enhancements

This document organizes all existing features of the MokeSell platform, along with potential enhancements.

---

### 1. Cart System 🛒

#### Existing Features
- **Navigation & Search:** Fully functional navbar with quick links and a search bar.
- **Cart Display & Management:** Items are dynamically loaded and grouped by shop.
- **Product Details & Clickable Images:** Clicking on images or names redirects to product details.
- **Price & Total Calculation:** Displays item prices and dynamically calculates total cost.
- **Remove Items from Cart:** Users can delete items, and empty shops disappear.
- **Checkout Process:** Stores cart data in sessionStorage and redirects to checkout.

#### Future Enhancements
- Modify quantity in the cart without re-adding items.
- "Save for Later" wishlist option.
- Apply discount codes.
- Multi-shop checkout for combined orders.
- Show estimated delivery time & shipping fees.

---

### 2. Chat System 💬

#### Existing Features
- **Chat Sidebar & User List:** Displays available chat contacts.
- **Message Storage & Retrieval:** Chats are saved in the database.
- **Real-Time Updates:** Messages appear instantly.
- **Seller Chat Initialization:** Loads seller profiles if available, otherwise enables AI chat.
- **AI Chat Support:** Uses DuckDuckGo API for automated replies.
- **Session-Based Chat Handling:** Ensures continuity when switching pages.
- **Security & Error Handling:** Users can only send messages if a valid recipient is selected.

#### Future Enhancements
- Message read status & timestamps.
- Group chat functionality.
- Image & file attachments.
- Chat search & filters.
- Typing indicators & online status.
- Push notifications for new messages.
- Voice & video call support.

---

### 3. Contact Page 📞

#### Existing Features
- **Navigation & Responsive UI:** Fully functional navbar and mobile-friendly layout.
- **Contact Form with Validation:** Fields include Name, Email, and Message.
- **Error Handling:** Displays warnings for invalid input.
- **Submission to Database:** Messages are stored in RestDB.
- **Confirmation & Reset:** Users receive a confirmation message after submitting.

#### Future Enhancements
- Live chat support.
- Auto-reply & ticketing system.
- Admin dashboard for managing inquiries.
- Attachment uploads (screenshots, documents).
- Sorting by priority (Low, Medium, High).
- FAQ insights based on reported issues.

---

### 4. Create Listing Page 📦

#### Existing Features
- **Navigation & Responsive UI:** Allows users to browse and create listings.
- **Create & Edit Listings:** Users can update existing listings.
- **Form Validation:** Ensures name, price, and image format correctness.
- **Database Integration:** Submits listings to RestDB API.
- **User Authentication:** Only logged-in users can create/edit listings.
- **Shop Name Association:** Listings are linked to user profiles.

#### Future Enhancements
- Upload product images instead of URLs.
- Multi-image upload.
- Dynamic category & condition selection.
- AI-based price suggestions.
- Preview before submission.
- Admin approval for listing verification.

---

### 5. Forgot Password Page 🔑

#### Existing Features
- **User Email Verification:** Checks if email exists before allowing password reset.
- **Error Handling:** Alerts users if an email is not found.
- **OTP Notification:** Informs users that a reset code has been sent.
- **Validation for Email Format:** Prevents incorrect inputs.
- **Lottie Loading Animation:** Enhances user experience.
- **Navigation to Login Page:** Users can return to login easily.

#### Future Enhancements
- Send real OTPs via email or SMS.
- OTP input & verification page.
- Password reset after OTP confirmation.
- Account lockout after failed attempts.
- "Resend OTP" option for users.

---

### 6. Gamification (Coin Hunt Game) 🎮

#### Existing Features
- **Mini-Game Mechanics:** Users get two chances to find a hidden coin.
- **Dynamic Coin Rewards:** Earn between 3-10 coins upon success.
- **User-Specific Score Storage:** Coins are stored per user.
- **Leaderboard System:** Displays rankings based on total coins earned.
- **API Integration for Data Persistence:** Scores update in the database.
- **Game Reset:** Players can retry after a failed attempt.

#### Future Enhancements
- Daily rewards & streak bonuses.
- New game modes with high-risk/high-reward options.
- Power-ups & hints in exchange for coins.
- Animation & sound effects.
- Achievement system for milestones.
- Live leaderboard updates using WebSockets.
- Store for purchasing profile upgrades using earned coins.

---

### 7. Homepage 🏠

#### Existing Features
- **Navigation & Responsive UI:** Fully interactive navbar & responsive layout.
- **Promotional Slideshow:** Image slider updates every 2.5 seconds.
- **Browsing Categories:** Users can filter by product type.
- **Coin Hunt Gamification Section:** Encourages user engagement.
- **Dynamic Listings:** Shows trending, recommended, and user-created listings.
- **Customer Reviews Section:** Displays testimonials for credibility.
- **AI Chatbot Support:** Helps users with product-related queries.

#### Future Enhancements
- Advanced search with real-time filtering.
- Personalized product recommendations.
- Live notifications for messages & offers.
- Featured seller spotlights.
- Social media sharing buttons.
- Expanded gamification (streak rewards).
- Real-time customer support chat.

---

### 8. Listings Page 📃

#### Existing Features
- **Navigation & Responsive UI:** Fully interactive navbar & mobile support.
- **Category Filtering:** Users can sort products by type.
- **Dynamic Listings Display:** Loads product details from RestDB.
- **Product Details & Seller Information:** Displays images, names, and prices.
- **Session-Based Category Storage:** Remembers the last selected category.

#### Future Enhancements
- Price-based search filters.
- Sorting options (price, newest, most popular).
- Product comparison tool.
- Low stock alerts ("Only X left!").
- Wishlist & saved items.
- Seller ratings & reviews.
- Location-based search.
- "Load More" button for seamless browsing.

---

### 9. Login Page 🔓

#### Existing Features
- **User Authentication:** Verifies credentials against the database.
- **Secure Password Handling:** Uses Caesar Cipher encryption.
- **Session-Based Login Handling:** Stores user details for a seamless experience.
- **Error Handling:** Alerts users on invalid credentials.
- **Lottie Loading Animation:** Enhances login experience.
- **Forgot Password & Social Login Links:** Supports Facebook & Instagram login.

#### Future Enhancements
- Two-factor authentication (OTP verification).
- "Remember Me" for auto-login.
- OAuth login (Google, Apple, Twitter).
- Password strength meter.
- Email confirmation before first login.

---

### 10. Product Details Page 🏷️

#### Existing Features
- **Navigation & Responsive UI:** Supports browsing on any device.
- **Product Information Display:** Shows name, image, price, and description.
- **Seller Profile Display:** Displays seller name & profile picture.
- **Quantity Selection & Error Handling:** Prevents invalid input.
- **Add to Cart & Buy Now:** Supports instant purchases.
- **Make an Offer Feature:** Allows negotiation.
- **Chat with Seller:** Initiates conversations from product pages.

#### Future Enhancements
- Image carousel for multiple product views.
- Customer reviews & ratings.
- Wishlist & "Save for Later."
- Related product suggestions.
- Stock alert system.
- Verified seller badge.
- Discount & coupon application.

---

### 11. User Profile Page 👤

#### Existing Features
- **Profile Summary Display:** Shows name, email, and profile picture.
- **Coins & Listings Count:** Displays earned coins & total listings.
- **Listings Management:** Users can edit or delete their listings.
- **Edit Profile Option:** Redirects to profile settings.

#### Future Enhancements
- User reviews & ratings.
- Direct chat with seller.
- Wishlist & saved listings.
- Social media profile linking.
- Profile completion progress bar.
- Recent purchases display.
- Verified seller badge.

---

