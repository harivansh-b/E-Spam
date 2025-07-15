import React from 'react'
import Header from '../../components/Header'
import '../globals.css'

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-tertiary-500 via-tertiary-600 to-quaternary-600">
            <Header />
            <main className="max-w-screen-xl mx-auto px-6 py-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-tertiary-400/30 p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Layout