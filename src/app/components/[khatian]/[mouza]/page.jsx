'use client'
import React, { useState, useEffect } from 'react'
import CsTalbariya from '@/app/components/data/cs/talbariya.json'
import CsKupot from '@/app/components/data/cs/kupot.json'

import RsTalbariya from '@/app/components/data/rs/talbariya.json'
import RsKupot from '@/app/components/data/rs/kupot.json'

import SaTalbariya from '@/app/components/data/sa/talbariya.json'
import SaKupot from '@/app/components/data/sa/kupot.json'

import { useParams } from 'next/navigation'

const Page = () => {
    const { khatian, mouza } = useParams();
    const [input, setInput] = useState('');
    const [debouncedInput, setDebouncedInput] = useState('');
    const [loading, setLoading] = useState(true);

    const mouzaName = mouza === 'kupot' ? 'কুপট' : 'তালবাড়িয়া';

    const khatianName =
        khatian === 'cs'
            ? 'সি,এস'
            : khatian === 'rs'
                ? 'আর,এস'
                : khatian === 'sa'
                    ? 'এস,এ'
                    : '';


    const dataMap = {
        cs: {
            talbariya: CsTalbariya,
            kupot: CsKupot,
        },
        rs: {
            talbariya: RsTalbariya,
            kupot: RsKupot,
        },
        sa: {
            talbariya: SaTalbariya,
            kupot: SaKupot,
        },
    };

    let mainData =
        dataMap[khatian]?.[mouza] || {
            success: true,
            status_code: 200,
            message: "Retrieved Successfully",
            data: {
                items: [],
                meta: {
                    totalItems: 0,
                    itemCount: 0,
                    itemsPerPage: 100,
                    totalPages: 0,
                    currentPage: 1,
                },
            },
        };

    // Debounce System

    useEffect(() => {
        setInterval(() => {
            setLoading(false);
        }, 500);
    }, []);

    useEffect(() => {
        setLoading(true);
        const handler = setTimeout(() => {
            setDebouncedInput(input);
            setLoading(false);
        }, 500); // 500ms delay

        return () => {
            clearTimeout(handler);
        };
    }, [input]);

    // Filter Data
    const results = mainData.data.items.filter(item =>
        item.OWNERS && item.OWNERS.includes(debouncedInput)
    );



    const displayItems = debouncedInput ? results : mainData.data.items;

    const engToBanDigits = (str) => {
        const engToBanMap = {
            "0": "০",
            "1": "১",
            "2": "২",
            "3": "৩",
            "4": "৪",
            "5": "৫",
            "6": "৬",
            "7": "৭",
            "8": "৮",
            "9": "৯",
        };
        return String(str).replace(/[0-9]/g, (d) => engToBanMap[d]);
    };


    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center sm:p-6 p-4">
            {/* হেডার */}
            <header className="w-full bg-blue-900 p-6 shadow-lg">
                <h1 className="text-white text-3xl font-extrabold text-center">ডিজিটাল খতিয়ান অনুসন্ধান</h1>
                <p className="text-blue-200 text-center mt-1 text-lg">বাংলাদেশ সরকারের ভূমি রেকর্ডের মতো</p>
            </header>

            {/* সার্চ কার্ড */}
            <div className="mt-10 w-full bg-white sm:p-8 p-4 rounded-2xl shadow-xl max-w-6xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
                    {mouzaName} মৌজার ({khatianName}) খতিয়ান খুঁজুন 🔍
                </h2>
                <input
                    type="text"
                    placeholder="OWNER এর নাম লিখুন..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-4 mb-6 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                />

                {/* লোডিং সিস্টেম */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="w-full flex flex-col gap-y-8 items-center justify-center">
                        {displayItems.length > 0 ? (
                            displayItems.map((item) => (
                                <div
                                    key={item.ID}
                                    className="sm:w-10/12 w-full border rounded-lg p-5 shadow hover:shadow-xl transition duration-300 bg-gradient-to-r from-white via-blue-50 to-white break-words"
                                >
                                    <p><strong>আইডি:</strong> {engToBanDigits(item.ID)}</p>
                                    <p><strong>JL নম্বর আইডি:</strong> {engToBanDigits(item.JL_NUMBER_ID)}</p>
                                    <p><strong>মৌজা আইডি:</strong> {engToBanDigits(item.MOUZA_ID)}</p>
                                    <p><strong>খতিয়ান নম্বর:</strong> {engToBanDigits(item.KHATIAN_NO)}</p>
                                    <p><strong>অফিস আইডি:</strong> {engToBanDigits(item.OFFICE_ID)}</p>
                                    <p><strong>খতিয়ান এন্ট্রি আইডি:</strong> {engToBanDigits(item.KHATIAN_ENTRY_ID)}</p>
                                    <p><strong>দাগ:</strong> {item.DAGS ? engToBanDigits(item.DAGS) : 'N/A'}</p>
                                    <p><strong>মালিক:</strong> {item.OWNERS}</p>
                                    <p><strong>অভিভাবক:</strong> {item.GUARDIANS}</p>
                                    <p><strong>মোট জমি:</strong> {engToBanDigits(item.TOTAL_LAND)} একর</p>
                                    <p><strong>বাকি জমি:</strong> {item.REMAINING_LAND ? engToBanDigits(item.REMAINING_LAND) : 'N/A'}</p>
                                    <p><strong>আগের খতিয়ান নম্বর:</strong> {item.AGOTO_KHATIAN_NO ? engToBanDigits(item.AGOTO_KHATIAN_NO) : 'N/A'}</p>
                                    <p><strong>পরের খতিয়ান নম্বর:</strong> {item.NEXT_KHATIAN_NO ? engToBanDigits(item.NEXT_KHATIAN_NO) : 'N/A'}</p>
                                    <p><strong>সংগঠন প্রকার:</strong> {engToBanDigits(item.ORGANIZATION_TYPE)}</p>
                                    <p><strong>বিভাজন অবস্থা:</strong> {item.SEGREGATION_STATUS ? engToBanDigits(item.SEGREGATION_STATUS) : 'N/A'}</p>
                                    <p><strong>লক করা আছে কি না:</strong> {engToBanDigits(item.IS_LOCKED)}</p>
                                    <p><strong>মূল খতিয়ান নম্বর:</strong> {engToBanDigits(item.CANONICAL_KHATIAN_NO)}</p>
                                    <p><strong>মূল খতিয়ান আইডি:</strong> {item.ROOT_KHATIAN_ID ? engToBanDigits(item.ROOT_KHATIAN_ID) : 'N/A'}</p>
                                    <p><strong>ভার্সন নম্বর:</strong> {item.VERSION_NO ? engToBanDigits(item.VERSION_NO) : 'N/A'}</p>
                                    <p><strong>সর্বশেষ:</strong> {engToBanDigits(item.LATEST)}</p>
                                </div>

                            ))
                        ) : (
                            <p className="text-red-600 text-center font-semibold text-lg">কোন OWNER পাওয়া যায়নি 😔</p>
                        )}
                    </div>
                )}
            </div>

            {/* ফুটার */}
            <footer className="mt-12 text-center text-gray-500">
                © 2025 বাংলাদেশের ডিজিটাল ভূমি রেকর্ড. সকল অধিকার সংরক্ষিত।
            </footer>
        </div>
    )
}

export default Page
