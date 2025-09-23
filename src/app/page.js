'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const Page = () => {
  const [khatianType, setKhatianType] = useState('')
  const [mouza, setMouza] = useState('')

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-12 px-4">

      {/* হেডার */}
      <div className="bg-blue-800 w-full py-6 shadow-md">
        <h1 className="text-center text-white text-3xl font-bold">
          ডিজিটাল খতিয়ান অনুসন্ধান
        </h1>
        <p className="text-center text-blue-100 mt-1">
          বাংলাদেশের সরকারের ভূমি রেকর্ডের মতো
        </p>
      </div>

      {/* সিলেক্ট কার্ড */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
          খতিয়ান খুঁজুন
        </h2>

        {/* খতিয়ান টাইপ */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            খতিয়ান প্রকার
          </label>
          <select
            onChange={(e) => setKhatianType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">প্রকার নির্বাচন করুন</option>
            <option value="cs">CS</option>
            <option value="rs">RS</option>
            <option value="sa">SA</option>
            <option value="brs">BRS</option>
          </select>
        </div>

        {/* মৌজা সিলেক্ট */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            মৌজা নির্বাচন
          </label>
          <select
            onChange={(e) => setMouza(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">মৌজা নির্বাচন করুন</option>
            <option value="kupot">কুপট</option>
            <option value="talbariya">তালবাড়িয়া</option>
          </select>
        </div>

        {/* লিংক */}
        {khatianType && mouza && (
          <Link
            href={`/components/${khatianType}/${mouza}`}
            className="block text-center bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            খতিয়ান দেখুন
          </Link>
        )}
      </div>

      {/* ক্রিয়েটর কার্ড */}
      <div className="mt-8 bg-gray-200/80 w-full max-w-md text-center p-3 rounded-lg shadow-inner text-gray-700 text-sm font-medium">
        ওয়েবসাইটটি তৈরি করেছেন: <strong>আব্দুল আলিম</strong>, <br/> পিতাঃ <strong>আব্দুল জলিল গাজী</strong>
      </div>

      {/* ফুটার */}
      <footer className="mt-4 text-center text-gray-500">
        © 2025 বাংলাদেশের ডিজিটাল ভূমি রেকর্ড. সকল অধিকার সংরক্ষিত।
      </footer>
    </div>
  )
}

export default Page
