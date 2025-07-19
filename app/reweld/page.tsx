'use client';

import React, { useState } from "react";

interface ComparisonResult {
    key: string;
    val1: string;
    val2: string;
    status: string;
  }

const PARAM_IDS_DATA1 = [
    "8545LEN0630P", "8545LEN0640P", "8545LEN0650P", "8545LEN0660P",
    "8545LEN0670P", "8545LEN0680P", "8545LEN0690P", "8545LEN0700P",
    "8545LEN3150P", "8545LEN3160P", "8545LEN3170P", "8545LEN3180P",
    "8545LEN3190P", "8545LEN3200P", "8545LEN3210P", "8545LEN3220P",
    "8545SQM0280P", "8545SQM0290P", "8545SQM0300P", "8545SQM0310P",
    "8545SQM0910P", "8545SQM0920P", "8545SQM0930P", "8545SQM0940P",
];

const PARAM_IDS_DATA2 = [
    "8545LEN0630P", "8545LEN0640P", "8545LEN0650P", "8545LEN0660P",
    "8545LEN0670P", "8545LEN0680P", "8545LEN0690P", "8545LEN0700P",
    "8545SQM0280P", "8545SQM0290P", "8545SQM0300P", "8545SQM0310P",
    "8545LEN3150P", "8545LEN3160P", "8545LEN3170P", "8545LEN3180P",
    "8545LEN3190P", "8545LEN3200P", "8545LEN3210P", "8545LEN3220P",
    "8545SQM0910P", "8545SQM0920P", "8545SQM0930P", "8545SQM0940P",
];

export default function Reweld() {
    const [values1Raw, setValues1Raw] = useState("");
    const [values2Raw, setValues2Raw] = useState("");
    const [results, setResults] = useState<ComparisonResult[] | null>(null);

    const parseLines = (raw: string) =>
        raw
            .trim()
            .split("\n")
            .map((line) => parseFloat(line.trim()))
            .filter((num) => !isNaN(num));

    const parseTabs = (raw: string) =>
        raw
            .trim()
            .split("\t")
            .map((item) => parseFloat(item.trim()))
            .filter((num) => !isNaN(num));

    function handleCompare() {
        const values1 = parseLines(values1Raw);
        const values2 = parseTabs(values2Raw);

        const data1: Record<string, number> = {};
        const data2: Record<string, number> = {};

        PARAM_IDS_DATA1.forEach((k, i) => {
            data1[k] = values1[i];
        });
        PARAM_IDS_DATA2.forEach((k, i) => {
            data2[k] = values2[i];
        });

        const tolerance = 0.001;
        const allKeys = Array.from(new Set([...PARAM_IDS_DATA1, ...PARAM_IDS_DATA2])).sort();

        const comparisonResults = allKeys.map((key) => {
            const val1 = data1[key];
            const val2 = data2[key];
            let status = "";

            if (val1 === undefined) status = "Missing in Data1";
            else if (val2 === undefined) status = "Missing in Data2";
            else if (Math.abs(val1 - val2) <= tolerance) status = "Match";
            else status = "Mismatch";

            return {
                key,
                val1: val1 !== undefined ? val1.toFixed(3) : "-",
                val2: val2 !== undefined ? val2.toFixed(3) : "-",
                status,
            };
        });

        setResults(comparisonResults);
    }

    return (
        <main className="p-10 w-screen mx-auto space-y-10 text-black">

            <h1 className="text-4xl font-bold">Reweld Frame QCP</h1>

            <div className="space-y-4">
                <h2 className="font-semibold text-xl">MES Parameter Values (Vertical Values Only)</h2>
                <textarea
                    className="w-full p-2 border rounded resize-none"
                    rows={10}
                    placeholder="Paste values (one per line)"
                    value={values1Raw}
                    onChange={(e) => setValues1Raw(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                <h2 className="font-semibold">Excel Parameter Values (Horizontal Values Only)</h2>
                <textarea
                    className="w-full p-2 border rounded resize-none"
                    rows={3}
                    placeholder="Paste values (tab separated)"
                    value={values2Raw}
                    onChange={(e) => setValues2Raw(e.target.value)}
                />
            </div>

            <button
                onClick={handleCompare}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
            >
                Compare
            </button>

            {results && (
                <div>
                    <h2 className="text-xl font-semibold mt-8 mb-4">Comparison Results</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2">Parameter</th>
                                    <th className="border px-4 py-2 text-right">Data1</th>
                                    <th className="border px-4 py-2 text-right">Data2</th>
                                    <th className="border px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map(({ key, val1, val2, status }) => (
                                    <tr
                                        key={key}
                                        className={status === "Mismatch" ? "bg-red-100" : ""}
                                    >
                                        <td className="border px-4 py-1">{key}</td>
                                        <td className="border px-4 py-1 text-right">{val1}</td>
                                        <td className="border px-4 py-1 text-right">{val2}</td>
                                        <td className="border px-4 py-1">{status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </main>
    );
}
