## 🎸 MokeSell: An Interactive Instrument Marketplace  
MokeSell is a **consumer-to-consumer platform** designed to **revolutionize the buying and selling of musical instruments**. By integrating **gamification, user-friendly navigation, and engaging interactions**, the platform creates a **seamless and enjoyable experience**. Users can explore various instruments, participate in **rewarding challenges**, and **build loyalty through achievements**, making MokeSell a vibrant and dynamic **marketplace for musicians and enthusiasts alike**.

## 🎨 Technical & Design Analysis  

### **🔹 Color Palette Summary**  
The MokeSell website follows a **dark-themed aesthetic** with **gold and brown accents**, ensuring a **modern, sleek, and visually appealing UI**.

#### **Primary Colors**
- ✅ **Dark Background (#172228)** – Main background for a sleek and modern look.
- ✅ **Secondary Dark (#121b20)** – Used for forms and section separations.
- ✅ **Dark Brown (#362c26)** – Buttons, headers, and interactive elements.

#### **Accent & Interactive Colors**
- ✅ **Gold-Brown (#7F604c)** – Primary accent for headings, buttons, and hover effects.
- ✅ **Light Gold (#C89872)** – Hover effects, buttons, and interactive elements.
- ✅ **Subtle Gray (#ddd)** – Used for form borders, input fields, and dividers.

#### **Call-to-Action (CTA) Colors**
- ✅ **Red (#e55634)** – Used in checkout buttons, delete actions, and error messages.
- ✅ **Bright Gold (#d3ac8e)** – Highlights important messages in chat bubbles and profile sections.
- ✅ **Deep Orange (#c76d56)** – Used in gradient buttons and CTA sections.

### **🔤 Typography Summary**
MokeSell follows a **modern, clean, and readable typography system**.

#### **Primary Font**
- ✅ **"Arial, sans-serif"** – Ensures **maximum readability, accessibility, and cross-device compatibility**.

#### **Font Sizes & Usage**
1️⃣ **Headings (Bold & Attention-Grabbing)**
   - `h1: 2.5rem` – Homepage, About Us, Gamification.  
   - `h2: 2.3rem` – Product Titles, Profile Sections.  
   - `h3: 2rem` – Cart Summary, Checkout Sections.  

2️⃣ **Body Text & Descriptions**
   - `p: 1rem (16px)` – Paragraphs, product details, general text.  
   - `small: 0.9rem (14px)` – Tooltips, footers, error messages.  

3️⃣ **Buttons & Links**
   - `.btn { font-size: 1.1rem; text-transform: uppercase; }`  
   - Links use **gold-brown (#C89872)** with an **underlined hover effect**.

### **📱 Responsiveness Summary**
MokeSell follows a **mobile-first, fully responsive design** using **Bootstrap 5.3’s Grid System** and **custom media queries**.

#### **Breakpoints & Adjustments**
- 🖥️ **Desktop (≥1024px)** – Full-width layouts with structured multi-column grids.
- 📲 **Tablets (768px - 1023px)** – Navigation bar collapses, and product cards resize.
- 📱 **Mobile (≤767px)** – Single-column layouts, touch-friendly buttons, and image scaling.

#### **Component-Specific Adjustments**
- ✅ **Navbar** – Desktop: Full-width, Mobile: Collapsible hamburger menu.
- ✅ **Product Listings** – Switches from grid (desktop) to stacked layout (mobile).
- ✅ **Chat UI** – Expands to 50% width on desktop, full width on mobile.

---

## 📌 MokeSell Existing Features and Future Enhancements  

**This section contains a detailed breakdown of all 16 HTML pages and their corresponding functionalities, as well as planned improvements for future releases.**  

⚡ **[CLICK HERE TO SEE THE FULL FEATURE BREAKDOWN](FULLFEATURE.md)**  

---

## 📌 MokeSell Existing Features and Future Enhancements

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

## 🛠 Technologies Used

This project leverages multiple languages, frameworks, libraries, and tools to build a fully functional **e-commerce platform** with **user authentication, gamification, chat, and transaction processing**.

---

### **📝 Languages**
1. **[HTML5](https://dev.w3.org/html5/spec-LC/)** – Structures the content and layout of all web pages.
2. **[CSS3](https://www.w3.org/Style/CSS/Overview.en.html)** – Styles the user interface and ensures responsiveness.
3. **[JavaScript (ES6+)](https://262.ecma-international.org/)** – Handles dynamic interactions, API calls, data retrieval, and form validations.

---

### **🛠 Front-End Frameworks & Libraries**
4. **[Bootstrap 5](https://getbootstrap.com/)** – Used for responsive design, UI components, and grid layout.
5. **[Font Awesome 6](https://fontawesome.com/)** – Provides vector icons used in buttons, navigation, and UI elements.
6. **[Bootstrap Icons](https://icons.getbootstrap.com/)** – Alternative icon set for additional UI elements.
7. **[Lottie.js](https://airbnb.io/lottie/#/web)** – Enhances the UI with animations for loading screens and confirmations.

---

### **💾 Back-End & API**
8. **[RestDB.io](https://restdb.io/)** – NoSQL cloud database that stores user data, product listings, chat messages, transactions, and gamification scores.
9. **[DuckDuckGo API](https://api.duckduckgo.com/)** – Enables AI-based chatbot functionality when chatting with an unavailable seller.

---

### **📂 Tools & Utilities**
10. **Session Storage (JavaScript)** – Temporarily stores user session data, such as login details and cart items.
11. **Fetch API (JavaScript)** – Handles HTTP requests to retrieve and update data from **RestDB.io**.
12. **WebSockets (Planned for Future Use)** – Could be used for real-time chat updates and leaderboard tracking.

---

## **💡 Why These Technologies?**
- **[HTML](https://dev.w3.org/html5/spec-LC/), [CSS](https://www.w3.org/Style/CSS/Overview.en.html), and [JavaScript](https://262.ecma-international.org/)** provide a complete front-end solution without requiring a separate back-end framework.
- **[Bootstrap](https://getbootstrap.com/) & [Font Awesome](https://fontawesome.com/)** ensure a consistent and responsive UI design.
- **[RestDB.io](https://restdb.io/)** simplifies database management without complex server-side setup.
- **[SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) & [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)** improve data retrieval efficiency, keeping pages lightweight.
- **[Lottie.js](https://airbnb.io/lottie/#/web) animations** enhance user experience and engagement.


### ✅ **How to Use This Repo**
1. Repository Link : https://github.com/Justin0526/FED_MokeSellApp_website.zip

## 📌 **Testing Summary**
The MokeSell website has been tested across multiple browsers and screen sizes to ensure proper functionality, responsiveness, and error handling. Below are the findings based on individual page testing.

# Testing Plan & Bug Reports 🛠️

## Table of Contents
1. [Homepage](#1-homepage-indexhtml--homecss)
2. [Shopping Cart Page](#2-shopping-cart-page-carthtml--cartcss)
3. [Chat Page](#3-chat-page-chathtml--chatcss)
4. [Contact Page](#4-contact-page-contacthtml--contactcss)
5. [Product Details Page](#5-product-details-page-product-detailshtml--product-detailscss)
6. [Profile Settings Page](#6-profile-settings-page-profile-settinghtml--profile-settingcss)
7. [Sign-Up Page](#7-sign-up-page-sign-uphtml--sign-upcss)
8. [Transaction Page](#8-transaction-page-transactionhtml--transactioncss)
9. [Transaction Receipt Page](#9-transaction-receipt-page-transaction-receipthtml--transaction-receiptcss)
10. [User Profile Page](#10-user-profile-page-user-profilehtml--user-profilecss)
11. [Create Listing Page](#11-create-listing-page-create-listinghtml--create-listingcss)
12. [Forgot Password Page](#12-forgot-password-page-forgot-pwhtml--forgot-pwcss)
13. [Gamification Page](#13-gamification-page-gamificationhtml--gamificationcss)
14. [Listings Page](#14-listings-page-listingshtml--listingscss)
15. [Login Page](#15-login-page-loginhtml--logincss)
16. [About Us Page](#16-about-us-page-about-ushtml--about-uscss)

---
## 1. Homepage (index.html & index.css)

### 🛠 **Navigation and Layout**
#### ✅ Test Case 1: Navigation Bar Links
- **Steps:** Click on the Home, Chat, Cart, Sell, Profile, and Contact links.
- **Expected Result:** Each link should navigate to the correct page without errors.

### 🔍 **UI and Functionality Tests**
#### ✅ Test Case 2: Search and Slideshow Functionality
- **Steps:** Observe the slideshow and test the navigation buttons.
- **Expected Result:** Slides should cycle every 2.5 seconds, and manual navigation should work.

#### ✅ Test Case 3: Categories & Listings Display
- **Steps:** Click on a category button (Strings, Keyboards, Percussions) and verify redirection.
- **Expected Result:** User should be redirected to the Listings Page with the chosen category selected.

#### ✅ Test Case 4: Gamification & Chatbox
- **Steps:** Click on the "Play Now" button in the game section and interact with the chatbot.
- **Expected Result:** Game should load correctly, and the chatbot should return results.

### ⚠ **Bugs Identified**
- **Trending & Recommended items gallery sometimes fails to display 4 items.**
- **User's own profile picture appears as the seller's image regardless of listing owner.**

---

## 2. Shopping Cart Page (cart.html & cart.css)

### 🛒 **Cart Functionality**
#### ✅ Test Case 1: Display Cart Items
- **Steps:** Log in, add items to the cart, navigate to Cart Page.
- **Expected Result:** Cart should display correct items with name, price, quantity, and total.

#### ✅ Test Case 2: Remove an Item from Cart
- **Steps:** Click on the trash icon next to an item and confirm removal.
- **Expected Result:** Item should be removed, and if the cart is empty, a message should appear.

### ⚠ **Bugs Identified**
- **Empty cart message does not always appear after removing all items.**

---

## 3. Chat Page (chat.html & chat.css)

### 💬 **Chat Functionality**
#### ✅ Test Case 1: Display Available Chats
- **Steps:** Open the chat page and check if previous chat conversations appear.
- **Expected Result:** Users should see previous chat history and be able to start new conversations.

#### ✅ Test Case 2: Send a Message
- **Steps:** Type a message and send it.
- **Expected Result:** Message should appear in the chatbox instantly and be saved in the database.

### ⚠ **Bugs Identified**
- **Messages sometimes do not load after refreshing the page.**

---

## 4. Contact Page (contact.html & contact.css)

### 📩 **Form Functionality**
#### ✅ Test Case 1: Submit an Empty Form
- **Steps:** Click "Submit" without entering details.
- **Expected Result:** Error messages should highlight missing fields.

#### ✅ Test Case 2: Submit with Invalid Email
- **Steps:** Enter a malformed email and submit.
- **Expected Result:** A validation message should appear.

### ⚠ **Bugs Identified**
- **Rapid multiple clicks on submit button may cause duplicate form entries.**

---

## 5. Product Details Page (product-details.html & product-details.css)

### 🏷 **Product Information Display**
#### ✅ Test Case 1: Navigate to Product Details Page
- **Steps:** Click on a product from the Homepage or Listings Page.
- **Expected Result:** All product details (name, price, seller info, image) should be displayed correctly.

#### ✅ Test Case 2: Add to Cart & Make an Offer
- **Steps:** Enter a valid quantity and click "Add to Cart" or "Make an Offer".
- **Expected Result:** The system should process the request correctly.

### ⚠ **Bugs Identified**
- **Seller profile picture sometimes overlaps the product image.**

---

## 6. Profile Settings Page (profile-setting.html & profile-setting.css)

### 🔧 **Profile Editing Functionality**
#### ✅ Test Case 1: Edit User Profile Fields
- **Steps:** Click "Edit" next to a field and update information.
- **Expected Result:** Changes should save successfully.

#### ✅ Test Case 2: Update Profile Picture
- **Steps:** Select a new image and confirm the update.
- **Expected Result:** Profile picture should update immediately.

### ⚠ **Bugs Identified**
- **Form alignment and spacing inconsistencies make UI look cluttered.**

---

## 7. Sign-Up Page (sign-up.html & sign-up.css)

### 🔑 **Account Registration**
#### ✅ Test Case 1: Sign Up with Valid Credentials
- **Steps:** Enter valid username, email, and password.
- **Expected Result:** Account should be created, and user redirected to Homepage.

#### ✅ Test Case 2: Password Mismatch
- **Steps:** Enter different values in "Password" and "Confirm Password" fields.
- **Expected Result:** An error message should appear.

### ⚠ **Bugs Identified**
- **Weak password validation does not enforce special character requirements.**

---

## 8. Transaction Page (transaction.html & transaction.css)

### 💳 **Payment Process**
#### ✅ Test Case 1: Enter Valid Payment Details
- **Steps:** Fill out billing and card information, then click "Checkout".
- **Expected Result:** Payment should process, and user should be redirected to the Transaction Receipt Page.

#### ✅ Test Case 2: Enter Expired Card
- **Steps:** Enter an expired credit card.
- **Expected Result:** System should reject the card with an error message.

### ⚠ **Bugs Identified**
- **Sometimes, Lottie animation does not stop after set duration.**

---

## 9. Transaction Receipt Page (transaction-receipt.html & transaction-receipt.css)

### 🧾 **Order Confirmation**
#### ✅ Test Case 1: View Transaction Summary
- **Steps:** Complete a checkout process and land on the receipt page.
- **Expected Result:** Order details should be displayed correctly.

### ⚠ **Bugs Identified**
- **Missing transaction ID in order summary.**

---

## 10. User Profile Page (user-profile.html & user-profile.css)

### 👤 **Profile Management**
#### ✅ Test Case 1: View Profile Information
- **Steps:** Navigate to the Profile Page.
- **Expected Result:** Profile details should load correctly.

#### ✅ Test Case 2: Edit Listings
- **Steps:** Click "Edit" on a listing.
- **Expected Result:** User should be redirected to the Edit Listing Page.

### ⚠ **Bugs Identified**
- **Profile page does not display listings correctly when there are more than 5.**

---

## 11. Create Listing Page (create-listing.html & create-listing.css)

### Listing Form Functionality
**Test Scenario 1: Submit an Empty Form**
- **Steps:** Click Create Now without filling any fields.
- **Expected Result:** Error messages should appear for missing fields.

**Test Scenario 2: Submit with Negative Price or Quantity**
- **Steps:** Enter negative numbers in Price or Quantity fields.
- **Expected Result:** "Quantity must be greater than 0!" message should appear.

---

## 12. Forgot Password Page (forgot-pw.html & forgot-pw.css)

### Password Reset Functionality
**Test Scenario 1: Submit Empty Email**
- **Steps:** Click Send OTP Now without entering an email.
- **Expected Result:** "Email is required" message should appear.

**Test Scenario 2: Enter Unregistered Email**
- **Steps:** Enter an email not registered.
- **Expected Result:** "This email is not registered. Please sign up first!" alert should appear.

---

## 13. Gamification Page (gamification.html & gamification.css)

### Gameplay Functionality
**Test Scenario 1: Play the Game and Win**
- **Steps:** Click a box containing a coin.
- **Expected Result:** A message confirms the win, and the player's score updates.

**Test Scenario 2: Lose the Game**
- **Steps:** Click two boxes without finding the coin.
- **Expected Result:** "Game Over! Try Again." message appears.

---

## 14. Listings Page (listings.html & listings.css)

### Listings Display Functionality
**Test Scenario 1: Select a Category**
- **Steps:** Click a category button (Strings, Keyboards, Percussions).
- **Expected Result:** Only products from that category should be displayed.

**Test Scenario 2: Display No Products**
- **Steps:** Simulate an API returning no products.
- **Expected Result:** "No products found for this category" message should appear.

---

## 15. Login Page (login.html, login.css, login.js) 

### 🔐 Login Functionality  
**Test Scenario 1: Successful Login**  
- **Steps:**  
  1. Enter a **valid email and password**.  
  2. Click the **Log In** button.  
  3. Wait for the login process to complete.  
- **Expected Result:**  
  - A **loading animation** should appear.  
  - The login should be **successful**.  
  - The user should be **redirected to the homepage**.  
  - A **welcome message** should be displayed: `"Welcome back [Username]"`.  

**Test Scenario 2: Incorrect Password**  
- **Steps:**  
  1. Enter a **registered email** but an **incorrect password**.  
  2. Click the **Log In** button.  
- **Expected Result:**  
  - A message should appear: `"Incorrect password entered"` below the password input field.  

**Test Scenario 3: Unregistered Email**  
- **Steps:**  
  1. Enter an **email that is not registered**.  
  2. Enter **any password**.  
  3. Click the **Log In** button.  
- **Expected Result:**  
  - An alert should appear stating:  
    `"This email is not registered. Please sign up first."`  

**Test Scenario 4: Empty Input Fields**  
- **Steps:**  
  1. Leave both the **email** and **password fields empty**.  
  2. Click the **Log In** button.  
- **Expected Result:**  
  - An alert should appear: `"Please enter a valid email address."`  
  - The form should **not submit**.  

---

### 🔗 Social Login  
**Test Scenario 5: Instagram Login**  
- **Steps:**  
  1. Click the **Instagram login button**.  
- **Expected Result:**  
  - The page should redirect to **Instagram’s login page**.  

**Test Scenario 6: Facebook Login**  
- **Steps:**  
  1. Click the **Facebook login button**.  
- **Expected Result:**  
  - The page should redirect to **Facebook’s login page**.  

---

### ⚠ Error Handling & Edge Cases  
**Test Scenario 7: Unauthorized User Access**  
- **Steps:**  
  1. Ensure the user is **not logged in**.  
  2. Try accessing **restricted pages** (e.g., Cart Page, Profile Page, Checkout Page) by entering the URLs manually.  
- **Expected Result:**  
  - A console message should log: `"User not logged in."`  
  - The pages should **not load user-specific content**.  

**Test Scenario 8: API Failure Handling**  
- **Steps:**  
  1. Simulate an **API failure** by disconnecting the internet or modifying the API URL in `login.js`.  
  2. Reload the page and try to log in.  
- **Expected Result:**  
  - An error message should appear stating:  
    `"An error occurred while logging in. Please try again."`  
  - The page should **not break** and remain functional.  

---

### 🎥 Lottie Animation Behavior  
**Test Scenario 9: Loading Animation**  
- **Steps:**  
  1. Enter **valid login credentials**.  
  2. Click **Log In**.  
  3. Observe the **loading animation**.  
- **Expected Result:**  
  - The **animation should appear immediately**.  
  - It should **loop until the redirection occurs**.  
---
## 9️⃣ About Us Page (about-us.html & about-us.css)

### Content & Layout
**Test Scenario 1: Readability & Responsiveness**
- **Steps:** View About Us on desktop and mobile.
- **Expected Result:** The text should be readable, and sections should align properly.

---

### ⚠ Bugs Identified  
- **Ellipsis does not appear on mobile screens when handling long text.**  
- **Lottie animation does not stop after the set duration.**  
- **API failure causes UI lag when fetching login credentials.**  

---

## 🚀 Future Improvements  
- **Enhance API error handling** for smoother fallback when requests fail.  
- **Improve mobile UI layout** for better responsiveness.  
- **Optimize image loading** by converting images to WebP format for faster performance.  

---
