import { useState, useEffect } from "react";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { PersonalInfoForm } from "../../components/profile/PersonalInfoForm";
import { AccountActions } from "../../components/profile/AccountActions";
import { useAuth } from "../../context/AuthContext";
import userService from "../../services/userService";
import { toast } from "react-toastify";

export default function AdminProfile() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [originalData, setOriginalData] = useState({});

    useEffect(() => {
        if (user) {
            fetchUserProfile();
        }
    }, [user]);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const response = await userService.getUserById(user.id || user._id);
            const userData = response.user;
            const profileData = {
                name: userData.name || "",
                email: userData.email || "",
                phone: userData.phone || "",
            };
            setFormData(profileData);
            setOriginalData(profileData);
        } catch (error) {
            toast.error('Failed to load profile: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        setFormData(originalData);
        setIsEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
            toast.error('All fields are required');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        try {
            setSubmitting(true);
            await userService.updateUser(user.id || user._id, formData);
            setOriginalData(formData);
            setIsEditing(false);
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error('Failed to update profile: ' + (error.response?.data?.message || error.message));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 mt-14 xl:mt-0 flex items-center justify-center">
                <div className="text-gray-500">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="flex-1 mt-14 xl:mt-0">
            <ProfileHeader
                isEditing={isEditing}
                onEdit={() => setIsEditing(true)}
                onCancel={handleCancel}
                onSave={handleSubmit}
                role={user?.role || "admin"}
                submitting={submitting}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handleSubmit}>
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <PersonalInfoForm
                            formData={formData}
                            isEditing={isEditing}
                            handleChange={handleChange}
                            role={user?.role}
                        />
                    </div>
                    <AccountActions showDelete={false} role={user?.role || "admin"} />
                </form>
            </div>
        </div>
    );
}
