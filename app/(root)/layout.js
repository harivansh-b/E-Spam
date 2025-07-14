import React from 'react'
import Header from '../../components/Header'
import '../globals.css'

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-peach-900">
            <Header />
            <main className="max-w-screen-xl mx-auto px-4 py-6">
                {children}
            </main>
        </div>
    )
}

export default Layout
