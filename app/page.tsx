'use client';

import { useRef } from 'react';
import React from 'react';

export default function Navbar() {
  const reweldRef = useRef<HTMLTextAreaElement>(null);
  const eolRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = (textArea: HTMLTextAreaElement | null) => {
    if (textArea) {
      navigator.clipboard.writeText(textArea.value);
    }
  };

  return (
    <main className="p-10 w-screen mx-auto space-y-10 text-black">
      <h1 className="text-3xl font-bold">Instructions</h1>

      {/* Reweld Frame QCP Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Reweld Frame QCP</h2>
        <p>
          When pulling up QCP data for <strong>&quot;Reweld Frame QCP&quot;</strong>, you can paste all of the following <strong>Parameter IDs</strong> into the <strong>&quot;Para.&quot; filter</strong> at once in the QCP pop-up screen. There&#39;s no need to separate them with commas. After pasting, simply check the boxes.
        </p>

        <div className="space-y-2 bg-gray-100 h-full w-full max-w-2xl p-4 rounded">
          <div className="flex justify-end">
            <button
              onClick={() => handleCopy(reweldRef.current)}
              className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-blue-600 transition"
            >
              Copy
            </button>
          </div>
          <textarea
            ref={reweldRef}
            readOnly
            className="w-full bg-gray-100 p-4 rounded text-sm font-mono leading-relaxed resize-none h-40"
            value={`8545LEN0630P 8545LEN0640P 8545LEN0650P 8545LEN0660P 8545LEN0670P 
8545LEN0680P 8545LEN0690P 8545LEN0700P 8545SQM0280P 8545SQM0290P 
8545SQM0300P 8545SQM0310P 8545LEN3150P 8545LEN3160P 8545LEN3170P 
8545LEN3180P 8545LEN3190P 8545LEN3200P 8545LEN3210P 8545LEN3220P 
8545SQM0910P 8545SQM0920P 8545SQM0930P 8545SQM0940P`}
          />
        </div>

        <ol className="list-decimal list-inside space-y-1">
          <li>Sort the results by <strong>&quot;Eqp. Name&quot;</strong>.</li>
          <li>Copy the values from <strong>top to bottom</strong> and paste them into the <strong>&quot;MES Parameter Values&quot;</strong> input field. (No commas needed)</li>
          <li>Go to the Excel sheet, copy the values for the <strong>same LOT ID</strong>, and paste them into the <strong>&quot;Excel Parameter Values&quot;</strong> input field. (No commas needed)</li>
          <li>Click the <strong>&quot;Compare&quot;</strong> button.</li>
          <li>You will see whether the MES and Excel values match.</li>
        </ol>
      </section>

      {/* EOL Rework QCP Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">EOL Rework QCP</h2>
        <p>
          The same instructions apply to <strong>&quot;EOL Rework QCP&quot;</strong>. Paste these <strong>Parameter IDs</strong> into the <strong>&quot;Para.&quot; filter</strong> all at once. There&#39;s no need to separate them with commas.
        </p>

        <div className="space-y-2 bg-gray-100 w-full max-w-2xl p-4 rounded">
          <div className="flex justify-end">
            <button
              onClick={() => handleCopy(eolRef.current)}
              className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-blue-600 transition"
            >
              Copy
            </button>
          </div>
          <textarea
            ref={eolRef}
            readOnly
            className="w-full bg-gray-100 p-4 rounded text-sm font-mono leading-relaxed resize-none h-40"
            value={`8575INF0390P 8575CNT0010P 8575INF0280P 8575INF0400P
8575VOL1201P 8575VOL1202P 8575VOL1203P 8575VOL1204P
8575VOL1205P 8575VOL1206P 8575VOL1207P 8575VOL1208P
8575TEM0010P 8575TEM0011P 8575VOL1300P 8575TEM0020P
8575VOL1310P 8575TEM0030P`}
          />
        </div>
      </section>
    </main>
  );
}
