'use client';

import React, { useState } from "react";

interface ComparisonResult {
    key: string;
    val1: string;
    val2: string;
    status: string;
}

const PARAM_IDS_DATA1 = [
    "8575CNT0010P",
    "8575INF0280P",
    "8575INF0390P",
    "8575INF0400P",
    "8575TEM0010P",
    "8575TEM0011P",
    "8575TEM0020P",
    "8575TEM0030P",
    "8575VOL1201P",
    "8575VOL1202P",
    "8575VOL1203P",
    "8575VOL1204P",
    "8575VOL1205P",
    "8575VOL1206P",
    "8575VOL1207P",
    "8575VOL1208P",
    "8575VOL1300P",
    "8575VOL1310P"
];

const PARAM_IDS_DATA2 = [
    "8575INF0390P", "8575CNT0010P", "8575INF0280P", "8575INF0400P",
    "8575VOL1201P", "8575VOL1202P", "8575VOL1203P", "8575VOL1204P",
    "8575VOL1205P", "8575VOL1206P", "8575VOL1207P", "8575VOL1208P",
    "8575TEM0010P", "8575TEM0011P", "8575VOL1300P", "8575TEM0020P",
    "8575VOL1310P", "8575TEM0030P"

];



export default function EOL() {
    const [values1Raw, setValues1Raw] = useState("");
    const [values2Raw, setValues2Raw] = useState("");
    const [results, setResults] = useState<ComparisonResult[] | null>(null);

    const parseLines = (raw: string) =>
        raw
            .trim()
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);

    const parseTabs = (raw: string) =>
        raw
            .trim()
            .split("\t")
            .map((item) => item.trim())
            .filter(Boolean);

    function handleCompare() {
        const values1 = parseLines(values1Raw);
        const values2 = parseTabs(values2Raw);

        if (values1.length !== PARAM_IDS_DATA1.length) {
            alert(`Data1 expects ${PARAM_IDS_DATA1.length} values, but got ${values1.length}`);
            return;
        }
        if (values2.length !== PARAM_IDS_DATA2.length) {
            alert(`Data2 expects ${PARAM_IDS_DATA2.length} values, but got ${values2.length}`);
            return;
        }

        const data1: Record<string, string> = {};
        const data2: Record<string, string> = {};

        PARAM_IDS_DATA1.forEach((k, i) => {
            data1[k] = values1[i];
        });
        PARAM_IDS_DATA2.forEach((k, i) => {
            data2[k] = values2[i];
        });

        const rawStringParams = ["8575INF0390P", "8575INF0280P"];
        const tolerance = 0.001;
        const allKeys = Array.from(new Set([...PARAM_IDS_DATA1, ...PARAM_IDS_DATA2])).sort();

        const format = (key: string, val: string | undefined) => {
            if (val === undefined || val === "") return "-";
            if (rawStringParams.includes(key)) return val;
            const num = parseFloat(val);
            if (!isNaN(num)) return num.toFixed(3);
            return val; // preserve non-numeric strings like V223
        };

        const comparisonResults = allKeys.map((key) => {
            const val1 = data1[key];
            const val2 = data2[key];

            let status = "";
            if (val1 === undefined) status = "Missing in Data1";
            else if (val2 === undefined) status = "Missing in Data2";
            else if (rawStringParams.includes(key)) {
                status = val1 === val2 ? "Match" : "Mismatch";
            } else {
                const num1 = parseFloat(val1);
                const num2 = parseFloat(val2);
                if (!isNaN(num1) && !isNaN(num2)) {
                    status = Math.abs(num1 - num2) <= tolerance ? "Match" : "Mismatch";
                } else {
                    status = val1 === val2 ? "Match" : "Mismatch";
                }
            }

            return {
                key,
                val1: format(key, val1),
                val2: format(key, val2),
                status,
            };
        });

        setResults(comparisonResults);
    }

    return (
        <main className="p-10 w-screen mx-auto space-y-10 text-black">
            <h1 className="text-4xl font-bold">EOL Rework QCP</h1>

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
