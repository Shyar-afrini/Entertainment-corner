import NavBar from './(components)/NavBar'
import Footer from './(components)/Footer'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Entertainment Corner',
  description: 'Entertainment Corner is a website that offers a variety of entertainment-related content, including articles, reviews, and recommendations on movies, TV shows, books, games, and more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        <Footer />  
      </body>
    </html>
  )
}
