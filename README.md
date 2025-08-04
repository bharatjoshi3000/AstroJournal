🪐 Astro Journal App – README

******IMPORTANT NOTE : I HAVE USED MY DUMMY TEMPLATE PROJECT AND MODIFIED AND DONE ALL THE WORK IN THAT THATS WHY SOME COMMITS MIGHT SHOW AS AN YEAR AGO. KINDLY IGNORE THAT****
📱 Overview
A cross-platform React Native app that lets users:

🔮 View daily horoscopes by zodiac sign

📝 Write, save, and persist daily journal entries

🔄 Toggle horoscope between today, yesterday, and tomorrow

🔐 Secure onboarding with login/signup

📴 Offline support using Redux Persist + AsyncStorage

🚀 Features
Authentication:

Login & Signup screens (first-time users must sign up)

Data persisted using Redux Persist + AsyncStorage

Home Screen:

View horoscope for selected zodiac sign

Toggle between Today / Yesterday / Tomorrow

Sign Out button on all screens

Journal Screen:

Write and save journal entries locally

Auto-persisted using AsyncStorage (via Redux)

Horoscope API:

Sorry I was not able to find some free API and the API mentioned in the doc returned 503 Service Unavailable, so have to figure my own way out by making custom JSON

Used custom dummy JSON to simulate horoscope data

Navigation: Implemented via React Navigation

Animations: Smooth login/signup animations using React Native Reanimated

State Management: Handled by Redux Toolkit

Offline Support: Achieved using AsyncStorage with Redux Persist

Modular Folder Structure:

/components, /screens, /services, /store, /hooks, etc.

🛠️ Tech Stack
React Native

Redux Toolkit + Redux Persist

AsyncStorage

React Navigation

React Native Reanimated

🧱 Scalable & Extendable
Clean architecture makes it ready for:

🧠 AI-based horoscope insights

💬 Chat functionality with astrologers

💳 Payment integration for consultations

