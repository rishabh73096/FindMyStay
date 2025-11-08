import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function wrapper() {
    return (
        <div>
            <Navbar />
            <main className="">{children}</main>
            <Footer />
        </div>
    )
}

