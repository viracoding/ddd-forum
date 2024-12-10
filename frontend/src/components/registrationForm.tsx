"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Loader2 } from "lucide-react"

export type RegistrationInput = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

interface RegistrationFormProps {
    onSubmit: (formDetails: RegistrationInput) => void;
    isLoading: boolean;
}

export const RegistrationForm = (props: RegistrationFormProps) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.onSubmit({
            username,
            email,
            firstName,
            lastName,
        })
    }

    return (
        <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6">Create Account</h2>
            <input
                type="email"
                placeholder="email"
                className="w-full mb-4 p-2 border rounded"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="text"
                placeholder="username"
                className="w-full mb-4 p-2 border rounded"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="text"
                placeholder="first name"
                className="w-full mb-4 p-2 border rounded"
                onChange={(e) => setFirstName(e.target.value)}
            />

            <input
                type="text"
                placeholder="last name"
                className="w-full mb-4 p-2 border rounded"
                onChange={(e) => setLastName(e.target.value)}
            />

            <div className="mb-4">
                <span>Already have an account? </span>
                <button className="text-blue-600">Login</button>
            </div>

            <Button type="submit" disabled={props.isLoading}>
                {props.isLoading ? <Loader2 className="animate-spin" /> : null}
                Submit
            </Button>
        </form>
    );
};
