'use client'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiBell } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { FiSearch } from "react-icons/fi";
import React, { useState } from 'react'

const Header = () => {

    const searchList = [
        'Ldtax Pass Reset',
        'Holding Approved',
        'LDTAX Payment',
        'LDTax ServerPay',
        'Nagorik Search',
        'Find Dhakila',
        'Dashboard (User ID: )',
        'Recharge',
        'Transaction Details',
        'Approved'
    ]

    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState([]);

    console.log(filtered);

    const handleChange = (e) => {
        const input = e.target.value;
        setQuery(input);

        if (input === "") {
            setFiltered([]);
        } else {
            const results = searchList.filter((item) =>
                item.toLowerCase().includes(input.toLowerCase())
            );
            setFiltered(results);
        }
    };

    const handleSelect = (value) => {
        setQuery(value);
        setFiltered([]);
    };

    return (
        <div className='w-full h-full flex items-center font-rubic justify-between bg-[#f9fbfd] border-b border-b-gray-100'>
            <div className="w-[260px] bg-[#f7fcfb] shadow-[1px_0px_5px_rgba(0,0,0,0.03)] h-full flex items-center justify-center border-r border-r-gray-100">
                <img src="/icons/2ef5f73f9c27f4f96e209ee9456d68a2-logo.png" alt="" className='w-[140px] mt-1.5' />
            </div>
            <div className="flex-1 pl-9 flex items-center justify-between">
                <div className="flex items-center justify-center gap-x-2.5 mb-2">
                    <button className="relative top-1 text-gray-400 hover:text-gray-800 transition-all duration-100">
                        <span className="absolute bg-[#5f76e8] bottom-3.5 left-[11px] rounded-2xl flex items-center justify-center font-normal text-[13px] text-white size-[19px]">0</span>
                        <span className="text-[19px]"><FiBell /></span>
                    </button>

                    <p className="text-[#3cca80] font-rubic text-[16px] relative top-2 left-1.5">Balance : 26.37</p>

                </div>

                <div className="w-auto flex items-center justify-between gap-x-9">
                    <div className="flex items-center relative bg-white shadow-[1px_2px_10px_rgba(0,0,0,0.05)] rounded-full px-3 py-[7px] w-[260px] group">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-[185px] pl-3 bg-transparent focus:outline-none text-[#b8c3d5] placeholder-[#b8c3d5]"
                            value={query}
                            onChange={handleChange}
                        />
                        {
                            query.length > 0 && (
                                <span className="text-[10px] pl-0.5 pr-2.5 text-blue-900" onClick={() => {
                                    setQuery('');
                                    setFiltered([]);

                                }}><ImCross /></span>
                            )
                        }
                        <button className="text-[#b8c3d5] absolute right-4 group-hover:text-gray-700"><FiSearch className=" text-xl" /></button>

                        <div className="w-[260px] left-0 top-12 absolute bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-xl z-10 overflow-y-hidden">
                            {filtered.length > 0 && (
                                <ul className="w-full mb-0 px-3 max-h-[305px] overflow-y-auto search-dropdown">
                                    {filtered.map((item, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSelect(item)}
                                            className="text-[13px] text-neutral-700 px-1 py-2.5 cursor-pointer border-b border-b-neutral-200 w-full"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>


                        {
                            filtered.length === 0 && query.length !== 0 && (
                                <p className="w-[260px] px-3 left-0 top-12 absolute bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-xl py-2 text-[#a6b1c2] ">
                                    No search result found.
                                </p>
                            )
                        }
                    </div>

                    <div className=" flex items-center justify-end gap-x-1 pr-5">
                        Hello, MD RAZIM UDDIN
                        <span className="text-[#a8b3b3] text-2xl"><MdOutlineKeyboardArrowDown /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header