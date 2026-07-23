"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import RadioOption from "@/components/ui/RadioOption";
import Link from "next/link";

export default function EditInfoPage() {
    const [fullName, setFullName] = useState("");
    const [Nickname, setNickName] = useState("");
    const [ContactInfo, setContactInfo] = useState("");
    const [selectedOption, setSelectedOption] = useState<"parents" | "senior" | "other">("parents");
    const [addressText, setAddressText] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorMessage, setError] = useState("");
    const router = useRouter();

    let address;
    if (selectedOption === "parents") {
        address = "parents";
    } else if (selectedOption === "senior"){
        address = "senior"
    }else {
        address = addressText;
    }

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem("token");

            if (!token) {
            router.push("../");
            return;
            }

            try {
            const response = await fetch("http://127.0.0.1:8000/users/me", {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || "Failed to load info");
            }

            setFullName(data.full_name ?? "");
            setNickName(data.nick_name ?? "");
            setContactInfo(data.contact_info ?? "");

            if (data.address === "parents") {
                setSelectedOption("parents");
                setAddressText("");
            } else if(data.address === "senior"){
                setSelectedOption("senior")
                setAddressText("");
            } 
            else {
                setSelectedOption("other");
                setAddressText(data.address ?? "");
            }

            } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong, please try again.");
            }

            } finally {
            setLoading(false);
            }
        }
        fetchUser();
    }, [router]);


    const handleConfirm = async () => {
        if (selectedOption === "other" && addressText.trim() === "") {
            alert("Please enter address!!!");
            return;
        } 
        setError("");
        const token = localStorage.getItem("token");

        try {
        const response = await fetch("http://127.0.0.1:8000/users/edit_info", {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
                body: JSON.stringify({
                full_name: fullName,
                nick_name: Nickname,
                contact_info: ContactInfo,
                address,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || data.error || "Update failed");
        }

        router.push("../info");
        } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Something went wrong!!!, please try again.");
        }
        }
    };

    if (loading) {
        return(
            <div className="min-h-screen text-white flex items-center justify-center">
                loading...
            </div>
        );
    }

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
                            label="Senior"
                            checked={selectedOption === "senior"}
                            onChange={() => setSelectedOption("senior")}
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

                {errorMessage && (
                    <p className="text-red-400 text-center text-[14px] mt-4">{errorMessage}</p>
                )}

                {/* Confirm button */}
                <div className="mt-1">
                    <Button onClick={handleConfirm}>CONFIRM</Button>
                </div>
            </div>
        </div>
    );
}