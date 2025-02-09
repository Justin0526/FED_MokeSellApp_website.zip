## 📌 **Testing Summary**
The MokeSell website has been tested across multiple browsers and screen sizes to ensure proper functionality, responsiveness, and error handling. Below are the findings based on individual page testing.

## Testing Plan & Bug Reports 🛠️
1. [Homepage](#1-homepage-indexhtml--indexcss)
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
## 16. About Us Page (about-us.html & about-us.css)

### Content & Layout
**Test Scenario 1: Readability & Responsiveness**
- **Steps:** View About Us on desktop and mobile.
- **Expected Result:** The text should be readable, and sections should align properly.

---

### ⚠ Bugs Identified  
- **Ellipsis does not appear on mobile screens when handling long text.**  
- **Lottie animation does not stop after the set duration.**  
- **API failure causes UI lag when fetching login credentials.**  
- **Occasionally, the homepage gallery for Trending Items and Recommended Items does not consistently display four items, and the cause is unclear.**
- **The Lottie animation does not stop after the specified time, and the reason for this behavior is unknown.**
- **The seller's profile picture in listings is always displayed as the current user's profile picture, regardless of whether the listing belongs to them or another seller. This occurs because the profile picture is retrieved only from sessionStorage instead of the allUserProfile API. Unfortunately, I realized this too late and don’t have enough time to implement a fix.**

---

## 🚀 Future Improvements  
- **Enhance API error handling** for smoother fallback when requests fail.  
- **Improve mobile UI layout** for better responsiveness.  
- **Optimize image loading** by converting images to WebP format for faster performance.  

---
