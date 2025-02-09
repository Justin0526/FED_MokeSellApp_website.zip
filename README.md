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

---

## 🤖 **Assistive AI**
### 1. Email Validation using expressions with ChatGPT: 
![Email Validation](images/EmailValidation.jpg)
### 2. duckduckGo API Implementation with ChatGPT:
![duckduckGo](images/duckduckGo.jpg)
![duckduckGo](images/duckduckGo2.jpg)
### 3. Real Time validation for transaction with ChatGPT:
![Real Time Validation](images/RealTimeTransactionInput.jpg)
![Real Time Validation](images/RealTimeTransactionInput2.jpg)
![Real Time Validation](images/RealTimeTransactionInput3.jpg)
![Real Time Validation](images/RealTimeTransactionInput4.jpg)
### 4. Caesar Cipher Implementation with ChatGPT:
![Caesar Cipher](images/caesarCipher.jpg)
### 5. Gamification Implementation with ChatGPT :
![Gamification](images/gamification.png)
![Gamification](images/gamification1.png)
![Gamification](images/gamification2.png)
### 6. Chat Bot - ChatGPT is used to write frame and style for Chat Bot :
![Chat Bot](images/chat-bot.png)
![Chat Bot](images/chat-bot-css.png)
![Chat Bot](images/chat-bot-css1.png)

---

## 🧪 **Testing**
**This section contains a detailed breakdown of all 16 HTML pages and scenario testing that have not been automated.**  

⚡ **[CLICK HERE TO SEE ALL TEST SCENARIOS](TEST.md)**  

## 📜 Credits & Acknowledgements

### 📌 Contents

#### Listings
- All listings, except for user-created ones, are sourced from **[ReverbAPI](https://www.reverb-api.com/docs/getting-started)**.

#### Media Sources
- **[Canva](https://www.canva.com/)** – for graphic design elements.
- **[Pexels](https://www.pexels.com/zh-cn/)** – for royalty-free stock images.
- Other online images retrieved through **[Google](https://www.google.com/)**.

---

### 🎉 Acknowledgements
We would like to extend our heartfelt gratitude to everyone who contributed to the development of the **MokeSell: An Interactive Instrument Marketplace**:

- **Our Lecturer** – for providing invaluable advice, constructive feedback, and motivation throughout the project.
- **Our Teammates** – for their relentless dedication, hard work, and commitment. This project is a product of our collective effort, and while it may not be perfect, we take pride in what we have built together.
- **Our Friends** – for inspiring us to implement key features such as the AI Chatbot and Live Chat functionality. Your encouragement pushed us to go the extra mile.
- **The Open-Source Community** – for the abundance of free resources that made this project possible.
- **Our Family and Friends** – for supporting us, testing our platform, and offering valuable feedback.

---

Thank you all for your contributions! 🎊


### ✅ **How to Use This Repo**
1. Repository Link : https://github.com/Justin0526/FED_MokeSellApp_website.zip

### ✅ **Figma WireFrames**
1. WireFrames Link : https://www.figma.com/design/UBKXPtwVoZ5SBUJAie2ez3/MokeSell_WireFrames_Justin%26Shein?node-id=0-1&t=LEAg0takzISwVKcG-1