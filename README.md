# [StudyShare](https://studyshare.se/)

StudyShare is a platform for course reviews at **Lunds Tekniska Högskola (LTH)**.  
It helps master students make informed decisions about which courses to take by collecting anonymous, structured, and verified reviews from students.

Developed by three Computer Science MSc students at **LTH**, StudyShare is built with **React**, **Supabase**, **TypeScript**, and **Tailwind CSS**.

---

## Purpose

Choosing courses during the master's program can be difficult due to limited and scattered information about course quality. StudyShare centralizes insights from students who have actually taken the courses-lectures, labs, exams, and overall experience-letting future students pick courses with confidence.

---

## Features

- **University-restricted sign-up**  
  Only students with a `@student.lu.se` email can create an account, ensuring authenticity and a trusted community.

- **Anonymous course reviews**  
  All published reviews are fully anonymous. Personal data is never exposed.

- **Verified reviews**  
  Every review goes through a manual verification process to maintain quality and prevent inappropriate or unserious content.

- **Structured rating system**  
  Each review includes:

  - Overall course rating
  - Exam quality
  - Free-text overall comment

- **Open access for students**  
  All verified reviews are visible to everyone to help guide course selection.

- **Secure data handling**  
  Supabase authentication and Row-Level Security (RLS) ensure all private data stays protected.

---

## Tech Stack

### Frontend

- React (Vite)
- TypeScript
- Tailwind CSS
- React Router
- TanStack Query (React Query)
- i18next (Swedish/English support)

### Backend / Data

- Supabase (PostgreSQL, Auth, Storage)
- Supabase RLS Policies
- Supabase Edge Functions

---

# How to Use StudyShare

## 1. Sign Up

- Register using your LTH student email (`@student.lu.se`)
- Verify the email and log in

---

## 2. Browse Courses

You can view:

- The course's average rating
- Number of verified reviews
- Detailed student feedback
- Ratings across lectures, labs, exam, etc.

---

## 3. Write a Review

You can review any course you have completed.

A review includes (ratings 1-5):

- Overall Rating
- How easy the course is
- Laborations
- Lectures rating
- Quality of course material
- Relevance
- Workload
- Exam comment
- Free-text comment

---

## 4. Review Verification

To maintain high-quality content:

- All reviews undergo manual verification
- Only verified reviews become publicly visible
- This prevents spam, jokes, and unconstructive content

---

## 5. Privacy & Security

- All reviews are fully anonymous
- Your identity is never attached to a published review

Supabase RLS ensures:

- Only you can edit your own review before verification
- No other user can read your personal data
- Admin-level verification does not reveal user identity

# Authors

StudyShare is developed by three students from the  
Master’s Programme in Computer Science and Engineering (Datateknik) at LTH:

- **Emil Sunnerdahl**
- **Sean Brennan**
- **Oskar Olofsson**
