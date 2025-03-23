'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ImageUploaderPageProps {}

const ImageUploaderPage: React.FC<ImageUploaderPageProps> = () => {
  const [questionImages, setQuestionImages] = useState<{ [key: number]: File | null }>({});
  const [answerImages, setAnswerImages] = useState<{ [key: number]: File | null }>({});
  const [correctSound, setCorrectSound] = useState<File | null>(null);
  const [wrongSound, setWrongSound] = useState<File | null>(null);
  const [tickSound, setTickSound] = useState<File | null>(null);
  const [selectSound, setSelectSound] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [savedFiles, setSavedFiles] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle question image upload
  const handleQuestionImageUpload = (file: File, index: number) => {
    setQuestionImages(prev => ({ ...prev, [index]: file }));
  };

  // Handle answer image upload
  const handleAnswerImageUpload = (file: File, index: number) => {
    setAnswerImages(prev => ({ ...prev, [index]: file }));
  };

  // Handle correct sound upload
  const handleCorrectSoundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCorrectSound(e.target.files[0]);
    }
  };

  // Handle wrong sound upload
  const handleWrongSoundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setWrongSound(e.target.files[0]);
    }
  };

  // Handle tick sound upload
  const handleTickSoundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTickSound(e.target.files[0]);
    }
  };

  // Handle select sound upload
  const handleSelectSoundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectSound(e.target.files[0]);
    }
  };

  // Save all uploaded files
  const handleSaveFiles = async () => {
    setIsUploading(true);
    setUploadStatus('جاري حفظ الملفات...');
    
    try {
      // Create FormData for uploading
      const formData = new FormData();
      
      // Add question images
      Object.entries(questionImages).forEach(([index, file]) => {
        if (file) {
          formData.append(`question_${index}`, file);
        }
      });
      
      // Add answer images
      Object.entries(answerImages).forEach(([index, file]) => {
        if (file) {
          formData.append(`answer_${index}`, file);
        }
      });
      
      // Add sound files
      if (correctSound) {
        formData.append('correct_sound', correctSound);
      }
      
      if (wrongSound) {
        formData.append('wrong_sound', wrongSound);
      }
      
      if (tickSound) {
        formData.append('tick_sound', tickSound);
      }
      
      if (selectSound) {
        formData.append('select_sound', selectSound);
      }
      
      // In a real application, you would send this to a server
      // For now, we'll simulate success and store file names locally
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a list of saved files for display
      const savedFilesList = [];
      
      Object.entries(questionImages).forEach(([index, file]) => {
        if (file) {
          savedFilesList.push(`/questions/${index}.png`);
        }
      });
      
      Object.entries(answerImages).forEach(([index, file]) => {
        if (file) {
          savedFilesList.push(`/answers/${index}.png`);
        }
      });
      
      if (correctSound) savedFilesList.push('/sounds/correct.mp3');
      if (wrongSound) savedFilesList.push('/sounds/wrong.mp3');
      if (tickSound) savedFilesList.push('/sounds/tick.mp3');
      if (selectSound) savedFilesList.push('/sounds/select.mp3');
      
      setSavedFiles(savedFilesList);
      setUploadStatus('تم حفظ الملفات بنجاح!');
      
      // Store in localStorage to persist between sessions
      localStorage.setItem('ramadanQuizSavedFiles', JSON.stringify(savedFilesList));
      
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadStatus('حدث خطأ أثناء حفظ الملفات. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsUploading(false);
    }
  };

  // Generate image upload sections
  const renderImageUploaders = () => {
    const sections = [];
    
    // Generate 80 image uploaders for questions and answers
    for (let i = 1; i <= 80; i++) {
      sections.push(
        <motion.div 
          key={i} 
          className="mb-8 p-4 border-2 border-primary rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.01 }}
        >
          <h3 className="text-lg font-bold mb-4 text-center">السؤال والإجابة #{i}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-primary rounded-md p-3">
              <label className="block text-sm font-medium mb-2">
                تحميل صورة السؤال #{i}
              </label>
              <input
                type="file"
                accept="image/png"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleQuestionImageUpload(e.target.files[0], i);
                  }
                }}
                className="block w-full text-sm text-foreground
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-primary file:text-primary-foreground
                          hover:file:bg-gold-light"
              />
              {questionImages[i] && (
                <div className="mt-2 text-sm text-green-500">
                  تم تحميل: {questionImages[i]?.name}
                </div>
              )}
            </div>
            
            <div className="bg-card border border-primary rounded-md p-3">
              <label className="block text-sm font-medium mb-2">
                تحميل صورة الإجابة #{i}
              </label>
              <input
                type="file"
                accept="image/png"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleAnswerImageUpload(e.target.files[0], i);
                  }
                }}
                className="block w-full text-sm text-foreground
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-primary file:text-primary-foreground
                          hover:file:bg-gold-light"
              />
              {answerImages[i] && (
                <div className="mt-2 text-sm text-green-500">
                  تم تحميل: {answerImages[i]?.name}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      );
    }
    
    return sections;
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.h1 
        className="text-center text-3xl md:text-4xl font-bold text-primary mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        تحميل صور الأسئلة والإجابات
      </motion.h1>
      
      <motion.div 
        className="mb-8 p-4 border-2 border-primary rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-4 text-center">تحميل المؤثرات الصوتية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-primary rounded-md p-3">
            <label className="block text-sm font-medium mb-2">
              صوت الإجابة الصحيحة
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleCorrectSoundUpload}
              className="block w-full text-sm text-foreground
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary file:text-primary-foreground
                        hover:file:bg-gold-light"
            />
            {correctSound && (
              <div className="mt-2 text-sm text-green-500">
                تم تحميل: {correctSound.name}
              </div>
            )}
          </div>
          
          <div className="bg-card border border-primary rounded-md p-3">
            <label className="block text-sm font-medium mb-2">
              صوت الإجابة الخاطئة
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleWrongSoundUpload}
              className="block w-full text-sm text-foreground
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary file:text-primary-foreground
                        hover:file:bg-gold-light"
            />
            {wrongSound && (
              <div className="mt-2 text-sm text-green-500">
                تم تحميل: {wrongSound.name}
              </div>
            )}
          </div>
          
          <div className="bg-card border border-primary rounded-md p-3">
            <label className="block text-sm font-medium mb-2">
              صوت العد التنازلي
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleTickSoundUpload}
              className="block w-full text-sm text-foreground
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary file:text-primary-foreground
                        hover:file:bg-gold-light"
            />
            {tickSound && (
              <div className="mt-2 text-sm text-green-500">
                تم تحميل: {tickSound.name}
              </div>
            )}
          </div>
          
          <div className="bg-card border border-primary rounded-md p-3">
            <label className="block text-sm font-medium mb-2">
              صوت اختيار الأرقام
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleSelectSoundUpload}
              className="block w-full text-sm text-foreground
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary file:text-primary-foreground
                        hover:file:bg-gold-light"
            />
            {selectSound && (
              <div className="mt-2 text-sm text-green-500">
                تم تحميل: {selectSound.name}
              </div>
            )}
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="sticky top-4 z-10 mb-8 p-4 bg-card border-2 border-primary rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">حفظ جميع الملفات</h2>
            {uploadStatus && (
              <p className={`mt-2 text-sm ${uploadStatus.includes('نجاح') ? 'text-green-500' : uploadStatus.includes('خطأ') ? 'text-red-500' : 'text-primary'}`}>
                {uploadStatus}
              </p>
            )}
          </div>
          <button
            onClick={handleSaveFiles}
            disabled={isUploading}
            className="bg-primary text-primary-foreground border-2 border-gold-dark rounded-md py-2 px-6 font-bold hover:bg-gold-light transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'جاري الحفظ...' : 'حفظ جميع الملفات'}
          </button>
        </div>
        
        {savedFiles.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">الملفات المحفوظة:</h3>
            <div className="max-h-40 overflow-y-auto bg-secondary p-2 rounded-md">
              <ul className="text-sm">
                {savedFiles.map((file, index) => (
                  <li key={index} className="mb-1">{file}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </motion.div>
      
      {renderImageUploaders()}
    </div>
  );
};

export default ImageUploaderPage;
