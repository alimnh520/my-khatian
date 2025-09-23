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
    const [ownerInput, setOwnerInput] = useState('');
    const [khatianInput, setKhatianInput] = useState('');
    const [debouncedOwner, setDebouncedOwner] = useState('');
    const [debouncedKhatian, setDebouncedKhatian] = useState('');
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

    const mainData =
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

    // Loading animation on page load
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    // Debounce inputs
    useEffect(() => {
        setLoading(true);
        const handler = setTimeout(() => {
            setDebouncedOwner(ownerInput);
            setDebouncedKhatian(khatianInput);
            setLoading(false);
        }, 500);

        return () => clearTimeout(handler);
    }, [ownerInput, khatianInput]);

    // Filter data by owner and khatian
    const results = mainData.data.items.filter(item => {
        const ownerMatch = item.OWNERS?.includes(debouncedOwner);
        const khatianMatch = item.KHATIAN_NO?.includes(debouncedKhatian);
        return ownerMatch && khatianMatch;
    });

    const displayItems = debouncedOwner || debouncedKhatian ? results : mainData.data.items;

    const engToBanDigits = (str) => {
        const engToBanMap = {
            "0": "০", "1": "১", "2": "২", "3": "৩",
            "4": "৪", "5": "৫", "6": "৬", "7": "৭",
            "8": "৮", "9": "৯",
        };
        return String(str).replace(/[0-9]/g, (d) => engToBanMap[d]);
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center sm:p-6 p-4">
            {/* Header */}
            <header className="w-full bg-blue-900 p-6 shadow-lg">
                <h1 className="text-white text-3xl font-extrabold text-center">ডিজিটাল খতিয়ান অনুসন্ধান</h1>
                <p className="text-blue-200 text-center mt-1 text-lg">বাংলাদেশ সরকারের ভূমি রেকর্ডের মতো</p>
            </header>

            {/* Search Card */}
            <div className="mt-10 w-full bg-white sm:p-8 p-4 rounded-2xl shadow-xl max-w-6xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
                    {mouzaName} মৌজার ({khatianName}) খতিয়ান খুঁজুন 🔍
                </h2>

                {/* Two Inputs in one line */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    {/* Owner Input */}
                    <input
                        type="text"
                        placeholder="মালিকের নাম লিখুন..."
                        value={ownerInput}
                        onChange={(e) => setOwnerInput(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                    />
                    {/* Khatian Number Input */}
                    <input
                        type="text"
                        placeholder="খতিয়ান নম্বর লিখুন..."
                        value={khatianInput}
                        onChange={(e) => setKhatianInput(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                    />
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="w-full flex flex-col gap-y-8 items-center justify-center">
                        {displayItems.length > 0 ? (
                            displayItems.map(item => (
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
                            <p className="text-red-600 text-center font-semibold text-lg">কোন OWNER বা খতিয়ান নম্বর পাওয়া যায়নি 😔</p>
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="mt-12 text-center text-gray-500">
                © 2025 বাংলাদেশের ডিজিটাল ভূমি রেকর্ড. সকল অধিকার সংরক্ষিত।
            </footer>
        </div>
    )
}

export default Page
