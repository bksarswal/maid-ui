"use client";

import { useEffect, useState } from "react";
import { Drawer, Button, Space, message } from "antd";
import Image from "next/image";
import HttpInterceptor from "@/lib/http-interseptor";

interface EditProfileInterface {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialImage?: string;
}

const EditProfile = ({
  open,
  onClose,
  onSuccess,
  initialImage,
}: EditProfileInterface) => {
  const [preview, setPreview] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (open) {
      setPreview(initialImage || "/image/maid.jpg");
      setFile(null);
    }
  }, [open, initialImage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSave = async () => {
    try {
      // 🔥 Cloudinary upload yaha hoga
      // const imageUrl = await uploadImage(file);

      await HttpInterceptor.put("/maid/profile", {
        profileImage: preview,
      });

      message.success("Profile photo updated successfully");

      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.log(error);

      message.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <Drawer
      title="Change Profile Photo"
      placement="right"
      size={420}
      open={open}
      onClose={onClose}
      destroyOnHidden
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-48 w-48 overflow-hidden rounded-full border">
          <Image
            src={preview}
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
        />

        <Space>
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="primary"
            onClick={handleSave}
          >
            Save Photo
          </Button>
        </Space>
      </div>
    </Drawer>
  );
};

export default EditProfile;