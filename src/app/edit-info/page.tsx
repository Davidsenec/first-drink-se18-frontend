"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import RadioOption from "@/components/ui/RadioOption";
import Link from "next/link";

export default function EditInfoPage() {
    const [full_name, setFullName] = useState("");
    const [nick_name, setNickName] = useState("");
    const [contact_info, setContactInfo] = useState("");
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
            
            if (localStorage.getItem("isAdmin") == "true") {
                router.push("../admin");
            }

            try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                localStorage.clear();
                router.push("../");
                return;
            }

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
            setError("Please enter address!!!");
            return;
        }
        
        if (full_name.length < 1 || full_name.length > 100) {
            setError("Fullname must be 1-100 characters long");
            return;
        }

        if (nick_name.length < 1 || nick_name.length > 50) {
            setError("nickname must be 1-50 characters long");
            return;
        }

        if (contact_info.length < 1 || contact_info.length >100) {
            setError("contact info must be 1-100 characters long");
            return;
        }

        if (address.length < 1 || address.length >255) {
            setError("address must be 1-255 characters long");
            return;
        }

        setError("");
        const token = localStorage.getItem("token");

        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/edit_info`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
                body: JSON.stringify({
                full_name: full_name,
                nick_name: nick_name,
                contact_info: contact_info,
                address,
            }),
        });
        
        if (response.status === 401) {
            localStorage.clear();
            router.push("../");
            return;
        }

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
                <Link href="../info" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <span className="text-lg"> ← </span>
                <span>Back</span>
                </Link>

                {/* Header */}
                <div className="flex items-center gap-4 mt-8 mb-10 animate-header">
                    <span className="text-3xl">⚽</span>
                    <h1 className="text-5xl font-black tracking-tight">EDIT INFO</h1>
                </div>

                <div className="flex flex-col gap-4 mt-4 animate-card">

                    {/* Fullname */}
                    <TextInput
                        label="Fullname"
                        value={full_name}
                        onChange={setFullName}
                    />

                    {/* Nickname */}
                    <TextInput
                        label="Nickname"
                        value={nick_name}
                        onChange={setNickName}
                    />

                    {/* Contact info */}
                    <TextInput
                        label="Contact Info"
                        value={contact_info}
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
                            label="Other (Please include address in case of emergency)"
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
                            placeholder="123, AJ Dorm, Building3"
                            />
                        )}
                        </div>
                    </div>
                </div>

                {errorMessage && (
                    <p className="text-red-400 text-center text-[14px] mt-4 animate-shake">{errorMessage}</p>
                )}

                {/* Confirm button */}
                <div className="mt-1">
                    <Button onClick={handleConfirm}>CONFIRM</Button>
                </div>
            </div>
        </div>
    );
}