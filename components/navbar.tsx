'use client';

import Link from "next/link";
import React from "react";


export default function Navbar() {



    return (
        <div className=" text-white bg-black w-full py-8 px-10 flex items-center gap-40">
            <div className="text-4xl font-bold self-center">
                <Link href="/">Parameter Comparison Tool</Link>
            </div>
            <div className="flex gap-24">
                <Link href="/reweld" className="text-xl font-semibold hover:text-slate-300 duration-100">REWELD</Link>
                <Link href="/eol" className="text-xl font-semibold hover:text-slate-300 duration-100">EOL</Link>
            </div>
        </div>
    );
}
