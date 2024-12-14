import { useState } from "react";
import { FaPen } from "react-icons/fa";

type Props = {
  name: string;
  onHandleChange: (name: string, value: string) => void;
};

const InputImage = ({ name, onHandleChange }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result); // Set the base64 URL of the uploaded image
        onHandleChange(name, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="absolute left-0 top-0 w-[100%] h-[100%] opacity-0"
      />
      {imageSrc ? (
        <div className="w-[100px] h-[100px] rounded-full border">
          <img src={imageSrc as string} className="" />
        </div>
      ) : (
        <div className="w-[100px] h-[100px] rounded-full border flex items-center justify-center">
          <FaPen />
        </div>
      )}
    </div>
  );
};

export default InputImage;
