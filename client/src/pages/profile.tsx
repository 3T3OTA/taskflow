import React from "react";
import DashboardLayout from "@/layouts/dashboard";
import { 
  Avatar, 
  Button, 
  Card, 
  CardBody, 
  CardHeader, 
  Divider, 
  Input, 
  addToast 
} from "@heroui/react";
import { Lock, Mail, User } from "lucide-react";
import { ProfileImageUpload } from "@/components/profile/profile-image-upload";
import { updateProfile } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { UserRound } from "lucide-react";

function Profile() {
  const { user, refreshAuth } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [profileData, setProfileData] = React.useState({
    name: user?.name || "user",
    email: user?.email || "user@example.com",
    password: "",
    confirmPassword: "",
  });
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = React.useState<string | null>(user?.profile_picture || null);

  const handleInputChange = (key: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageSelected = (image: string | null) => {
    if (image) {
      const arr = image.split(",");
      const mimeMatch = arr[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file = new File([u8arr], "profile.jpg", { type: mime });
      setProfileImage(file);
      setProfileImagePreview(image);
    } else {
      setProfileImage(null);
      setProfileImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.name.trim()) {
      addToast({
        title: "Error",
        description: "Name is required",
        color: "danger",
      });
      return;
    }
    if (!profileData.email.trim() || !/^\S+@\S+\.\S+$/.test(profileData.email)) {
      addToast({
        title: "Error",
        description: "Please enter a valid email address",
        color: "danger",
      });
      return;
    }
    if (profileData.password && profileData.password !== profileData.confirmPassword) {
      addToast({
        title: "Error",
        description: "Passwords do not match",
        color: "danger",
      });
      return;
    }
    setIsLoading(true);
    try {
      await updateProfile(
        profileData.name,
        profileData.email,
        profileData.password ? profileData.password : undefined,
        profileImage || undefined
      );
      addToast({
        title: "Success",
        description: "Profile updated successfully",
        color: "success",
      });
      await refreshAuth();
    } catch (err: any) {
      addToast({
        title: "Error",
        description: err?.message || "Failed to update profile",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <DashboardLayout
      isCreateOpen={isCreateOpen}
      setIsCreateOpen={setIsCreateOpen}
    >
      <div className="flex items-center space-x-2 px-4 mt-4 mb-5">
        <UserRound />
        <h2 className="text-lg font-semibold">My Profile</h2>
      </div>
      <div className="max-w-5xl mx-auto">
      <div className=" gap-6">
        {}
        <div className="lg:col-span-2">
          <Card className="overflow-visible">
            <CardHeader className="flex flex-col gap-1">
              <h2 className="text-xl font-medium">Edit Profile</h2>
              <p className="text-default-500 text-small">
                Update your personal information and account settings
              </p>
            </CardHeader>
            <Divider />
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-6">
                {}
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      src={profileImagePreview || undefined}
                      className="w-24 h-24 text-large"
                      name={profileData.name}
                    />
                    <ProfileImageUpload 
                      onImageSelected={handleImageSelected} 
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-small font-medium">Profile Photo</p>
                    <p className="text-tiny text-default-500">
                      This will be displayed on your profile and in comments.
                      We recommend using a square image of at least 300x300 pixels.
                    </p>
                  </div>
                </div>
                <Divider />
                {}
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={profileData.name}
                    onValueChange={(value) => handleInputChange("name", value)}
                    isRequired
                    startContent={<User className="text-default-400" />}
                  />
                  <Input
                    label="Email Address"
                    placeholder="Enter your email"
                    value={profileData.email}
                    onValueChange={(value) => handleInputChange("email", value)}
                    isRequired
                    type="email"
                    startContent={<Mail className="text-default-400" />}
                  />
                </div>
                <Divider />
                {}
                <div className="space-y-4">
                  <h3 className="text-medium font-medium">Change Password</h3>
                  <p className="text-tiny text-default-500">
                    Leave blank if you don't want to change your password
                  </p>
                  <Input
                    label="New Password"
                    placeholder="Enter new password"
                    value={profileData.password}
                    onValueChange={(value) => handleInputChange("password", value)}
                    type="password"
                    startContent={<Lock className="text-default-400" />}
                  />
                  <Input
                    label="Confirm Password"
                    placeholder="Confirm new password"
                    value={profileData.confirmPassword}
                    onValueChange={(value) => handleInputChange("confirmPassword", value)}
                    type="password"
                    startContent={<Lock className="text-default-400" />}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    color="danger"
                    variant="flat"
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
        {}
        {}
      </div>
    </div>
    </DashboardLayout>
    </>
  );
}

export default Profile