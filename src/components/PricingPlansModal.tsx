import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LicensePlanType } from '../types/erp';

interface PricingPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: LicensePlanType;
  onSelectPlan: (plan: LicensePlanType) => void;
}

export function PricingPlansModal({ isOpen, onClose, currentPlan, onSelectPlan }: PricingPlansModalProps) {
  if (!isOpen) return null;

  const plans = [
    {
      id: 'basic' as LicensePlanType,
      name: 'پایه (Basic)',
      price: '۱۲۰ میلیون تومان',
      description: 'مناسب برای شرکت‌های کوچک و استارتاپ‌ها',
      features: ['ماژول انبارداری و کالا', 'ماژول فروش و صدور فاکتور', 'مدیریت کاربران پایه'],
      locked: ['تدارکات و تامین', 'حسابداری و مالی', 'هوش تجاری (BI)', 'تنظیمات پیشرفته حسابرسی'],
      color: 'bg-slate-100 text-slate-700 border-slate-300'
    },
    {
      id: 'standard' as LicensePlanType,
      name: 'استاندارد (Standard)',
      price: 'از ۲۸۰ الی ۳۲۰ میلیون تومان',
      description: 'پکیج یکپارچه بازرگانی (شامل هزینه توسعه اختصاصی)',
      features: ['ماژول انبارداری و کالا', 'ماژول فروش', 'تدارکات، تامین و ارزیابی پیمانکاران', 'گردش کار (Workflow)'],
      locked: ['حسابداری و مالی', 'هوش تجاری (BI)', 'تنظیمات پیشرفته حسابرسی'],
      color: 'bg-blue-50 text-blue-700 border-blue-300'
    },
    {
      id: 'pro' as LicensePlanType,
      name: 'پیشرفته (Pro)',
      price: 'حدود ۴۹۰ میلیون تومان',
      description: 'سیستم کامل ERP برای شرکت‌های متوسط',
      features: ['انبار، فروش، تدارکات', 'حسابداری، خزانه و سامانه مودیان', 'گردش کار و تاییدات چند مرحله‌ای'],
      locked: ['هوش تجاری (BI)', 'حسابرسی پیشرفته هلدینگی', 'استقرار On-Premise'],
      color: 'bg-indigo-50 text-indigo-700 border-indigo-300'
    },
    {
      id: 'enterprise' as LicensePlanType,
      name: 'هلدینگ (Enterprise)',
      price: 'از ۹۵۰ الی ۱۰۵۰ میلیون تومان',
      description: 'راهکار جامع سفارشی برای هلدینگ‌ها و کارخانجات',
      features: ['دسترسی به تمامی ماژول‌ها', 'هوش تجاری و داشبوردهای تحلیلی', 'نصب در سرور اختصاصی مشتری (On-Premise)', 'شخصی‌سازی نامحدود کدها و فرم‌ها', 'حسابرسی پیشرفته و امضای دیجیتال', 'دستورات صوتی و جستجوی هوشمند (Voice AI)'],
      locked: [],
      color: 'bg-amber-50 text-amber-700 border-amber-300'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#002045]/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="px-6 py-4 border-b border-[#e6eeff] flex items-center justify-between bg-[#f8fbff] shrink-0">
            <div>
              <h2 className="text-xl font-bold text-[#002045]">انتخاب لایسنس سیستم (نسخه دمو)</h2>
              <p className="text-xs text-[#52617e] mt-1">با تغییر لایسنس، ماژول‌های فعال در منوی کناری تغییر می‌کنند تا ارزش واقعی هر پلن را مشاهده کنید.</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#e6eeff] text-[#52617e] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {plans.map((plan) => {
                const isActive = currentPlan === plan.id;
                return (
                  <div 
                    key={plan.id}
                    onClick={() => onSelectPlan(plan.id)}
                    className={`relative rounded-xl border-2 transition-all cursor-pointer overflow-hidden flex flex-col ${
                      isActive ? 'border-[#3b82f6] shadow-md ring-4 ring-[#3b82f6]/10' : 'border-[#e6eeff] hover:border-[#cbd5e1] hover:shadow'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 right-0 bg-[#3b82f6] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                        پلن فعال
                      </div>
                    )}
                    
                    <div className={`p-5 border-b ${plan.color}`}>
                      <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                      <p className="text-[11px] opacity-80 h-8 line-clamp-2">{plan.description}</p>
                      <div className="mt-4 font-bold text-xl tracking-tight">{plan.price}</div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col gap-4 bg-white">
                      <div>
                        <div className="text-[11px] font-bold text-[#15803d] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          امکانات فعال:
                        </div>
                        <ul className="space-y-2">
                          {plan.features.map((feat, i) => (
                            <li key={i} className="text-xs text-[#0d1c2e] flex items-start gap-1.5 leading-snug">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#15803d] mt-1 shrink-0" />
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {plan.locked.length > 0 && (
                        <div className="mt-auto pt-4 border-t border-[#e6eeff]">
                          <div className="text-[11px] font-bold text-[#b91c1c] mb-2 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">lock</span>
                            ماژول‌های غیرفعال:
                          </div>
                          <ul className="space-y-2">
                            {plan.locked.map((feat, i) => (
                              <li key={i} className="text-xs text-[#74777f] flex items-start gap-1.5 leading-snug opacity-75">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#b91c1c] mt-1 shrink-0" />
                                <span className="line-through">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
