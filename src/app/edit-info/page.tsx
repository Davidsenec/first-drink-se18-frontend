"use client";

import { useState } from "react";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import RadioOption from "@/components/ui/RadioOption";
import Link from "next/link";

export default function EditInfoPage() {
    const [fullName, setFullName] = useState("");
    const [Nickname, setNickName] = useState("");
    const [ContactInfo, setContactInfo] = useState("");
    const [selectedOption, setSelectedOption] = useState<"parents" | "other">("parents");
    const [addressText, setAddressText] = useState("")

    let address;
    if (selectedOption === "parents") {
        address = "parents";
    } else {
        address = addressText;
    }

    const handleConfirm = () => {
        if (selectedOption === "other" && addressText.trim() === "") {
            alert("Please enter address!!!");
            return;
        } 
        console.log({ fullName, Nickname, ContactInfo, address });
        // placeholder wait for backend
    };

    return (
        <div className="min-h-screen text-white px-6 py-8">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto">

                {/* Back button */}
                <Link href="../" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <span className="text-lg"> ← </span>
                <span>Back</span>
                </Link>

                {/* Header */}
                <div className="flex items-center gap-4 mt-8 mb-10">
                    <span className="text-3xl">⚽</span>
                    <h1 className="text-5xl font-black tracking-tight">EDIT INFO</h1>
                </div>

                <div className="flex flex-col gap-4 mt-4">

                    {/* Fullname */}
                    <TextInput
                        label="Fullname"
                        value={fullName}
                        onChange={setFullName}
                    />

                    {/* Nickname */}
                    <TextInput
                        label="Nickname"
                        value={Nickname}
                        onChange={setNickName}
                    />

                    {/* Contact info */}
                    <TextInput
                        label="Contact Info"
                        value={ContactInfo}
                        onChange={setContactInfo}
                    />
                </div>

                {/* Going home */}
                <div className="flex flex-col gap-1 mt-6">
                <label className="block font-bold mb-3">
                    How are you going home?
                </label>

                <div>
                    <div className="flex flex-col gap-3 mt-1">
                        <RadioOption
                            label="Parents"
                            checked={selectedOption === "parents"}
                            onChange={() => setSelectedOption("parents")}
                        />

                        <RadioOption
                            label="Other (Please include address incase of emergency)"
                            checked={selectedOption === "other"}
                            onChange={() => setSelectedOption("other")}
                        />
                        </div>

                    {/* Conditional address */}
                        <div className="flex flex-col mt-2">
                        {selectedOption === "other" && (
                            <TextInput
                            label=""
                            value={addressText}
                            onChange={setAddressText}
                            placeholder="Emergency address"
                            />
                        )}
                        </div>
                    </div>
                </div>

                {/* Confirm button */}
                <div className="mt-1">
                    <Button onClick={handleConfirm}>CONFIRM</Button>
                </div>
            </div>
        </div>
    );
}