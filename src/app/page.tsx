'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
          مسابقة رسلان و المهرة الرمضانية
        </h1>
        <p className="text-xl text-foreground">
          مسابقة تفاعلية للأسئلة والأجوبة بمناسبة شهر رمضان المبارك
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card border-2 border-primary rounded-lg p-6 flex flex-col items-center"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">بدء المسابقة</h2>
          <p className="text-center mb-6">
            ابدأ المسابقة مع المتسابقين واختر الأسئلة وسجل النقاط
          </p>
          <Link 
            href="/game" 
            className="bg-primary text-primary-foreground border-2 border-gold-dark rounded-md py-3 px-6 font-bold hover:bg-gold-light transition-all duration-200 w-full text-center"
          >
            بدء اللعب
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-card border-2 border-primary rounded-lg p-6 flex flex-col items-center"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">إدارة الصور والأصوات</h2>
          <p className="text-center mb-6">
            قم بتحميل صور الأسئلة والأجوبة والمؤثرات الصوتية للمسابقة
          </p>
          <Link 
            href="/upload" 
            className="bg-primary text-primary-foreground border-2 border-gold-dark rounded-md py-3 px-6 font-bold hover:bg-gold-light transition-all duration-200 w-full text-center"
          >
            إدارة الملفات
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-12 text-center"
      >
        <p className="text-muted-foreground">
          تم تطوير هذا الموقع خصيصًا لمسابقة رسلان والمهرة الرمضانية
        </p>
        <p className="text-muted-foreground mt-2">
          رمضان كريم وكل عام وأنتم بخير
        </p>
      </motion.div>
    </div>
  );
}
