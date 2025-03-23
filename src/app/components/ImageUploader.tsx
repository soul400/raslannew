import React from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File, index: number) => void;
  type: 'question' | 'answer';
  index: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  type,
  index
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0], index);
    }
  };

  return (
    <div className="bg-card border border-primary rounded-md p-3">
      <label className="block text-sm font-medium mb-2">
        {type === 'question' ? 'تحميل صورة السؤال' : 'تحميل صورة الإجابة'} #{index}
      </label>
      <input
        type="file"
        accept="image/png"
        onChange={handleFileChange}
        className="block w-full text-sm text-foreground
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-primary-foreground
                  hover:file:bg-gold-light"
      />
    </div>
  );
};

export default ImageUploader;
