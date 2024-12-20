import { useRef, useState } from "react";

type Props = {
  urlImg?: string;
  setFile: (file: any) => void;
  showExtended?: boolean;
};

const UploadPreviewImage = ({
  setFile,
  urlImg,
  showExtended = true,
}: Props) => {
  const [fileUpload, setFileUpload] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileUpload(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <section className="container w-full mx-auto items-center">
      <div className="max-w-sm mx-auto overflow-hidden items-center">
        <div className="px-4">
          <div
            className={`max-w-sm p-6 bg-gray-100 ${
              fileUpload ? "" : "border-dashed border-2 border-gray-400"
            } rounded-lg items-center mx-auto text-center cursor-pointer`}
          >
            <input
              id="upload"
              type="file"
              className="hidden"
              onChange={handleChangeFile}
              accept="image/*"
              ref={fileInputRef}
            />
            {fileUpload ? (
              <img
                src={fileUpload}
                alt="Selected file"
                className="max-h-48 rounded-lg mx-auto"
                onClick={handleImageClick}
              />
            ) : (
              urlImg && (
                <img
                  src={urlImg}
                  alt="Selected file"
                  className="max-h-48 rounded-lg mx-auto"
                  onClick={handleImageClick}
                />
              )
            )}

            {!fileUpload && !urlImg && (
              <label htmlFor="upload" className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-700 mx-auto mb-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                {showExtended && (
                  <>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                      Upload picture
                    </h5>
                    <p className="font-normal text-sm text-gray-400 md:px-6">
                      Choose photo size should be less than{" "}
                      <b className="text-gray-600">2mb</b>
                    </p>
                    <p className="font-normal text-sm text-gray-400 md:px-6">
                      and should be in{" "}
                      <b className="text-gray-600">JPG, PNG, or GIF</b> format.
                    </p>
                    <span
                      id="filename"
                      className="text-gray-500 bg-gray-200 z-50"
                    ></span>
                  </>
                )}
              </label>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadPreviewImage;
