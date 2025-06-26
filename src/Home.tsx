import { Outlet } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import Header from './header/Header';

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
}