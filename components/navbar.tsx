'use client';

import Link from "next/link";
import React from "react";


export default function Navbar() {



    return (
        <div className=" text-white bg-black w-full py-8 px-10 flex items-center gap-40">
            <div className="text-4xl font-bold self-center">Parameter Comparison Tool</div>
            <div className="flex gap-24">
                <Link href="/reweld" className="text-xl font-semibold">REWELD</Link>
                <Link href="/eol" className="text-xl font-semibold">EOL</Link>
            </div>
        </div>
    );
}
