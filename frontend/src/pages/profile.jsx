import React, { useState } from "react";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { PersonalInfoForm } from "../components/profile/PersonalInfoForm";
import { EmergencyContactForm } from "../components/profile/EmergencyContactForm";
import { AccountActions } from "../components/profile/AccountActions";

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@email.com",
        phone: "+251 11 123 4567",
        address: "Bole Road, Addis Ababa, Ethiopia",
        dateOfBirth: "1990-05-15",
        gender: "male",
        emergencyContact: "Jane Doe",
        emergencyPhone: "+251 11 987 6543",
        occupation: "Software Engineer",
        insuranceProvider: "Ethiopian Insurance Corporation",
        policyNumber: "EIC123456789",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        // Reset to original
        setFormData({
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@email.com",
            phone: "+251 11 123 4567",
            address: "Bole Road, Addis Ababa, Ethiopia",
            dateOfBirth: "1990-05-15",
            gender: "male",
            emergencyContact: "Jane Doe",
            emergencyPhone: "+251 11 987 6543",
            occupation: "Software Engineer",
            insuranceProvider: "Ethiopian Insurance Corporation",
            policyNumber: "EIC123456789",
        });
        setIsEditing(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Profile updated:", formData);
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ProfileHeader
                isEditing={isEditing}
                onEdit={() => setIsEditing(true)}
                onCancel={handleCancel}
                onSave={handleSubmit}
                role="user"
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handleSubmit}>
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <PersonalInfoForm
                            formData={formData}
                            isEditing={isEditing}
                            handleChange={handleChange}
                        />
                        <EmergencyContactForm
                            formData={formData}
                            isEditing={isEditing}
                            handleChange={handleChange}
                        />
                    </div>
                    <AccountActions showDelete={false} role="user" />
                </form>
            </div>
        </div>
    );
}
