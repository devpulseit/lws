import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ArrowRight, Play, CheckCircle, Globe, Users, Star, ChevronLeft, ChevronRight, Menu, X, Phone, MessageCircle, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTypewriter } from '@/hooks/useTypewriter';
import { CaseCard, DesktopCaseCard } from "@/components/CaseCard";
import InputMask from "react-input-mask";
import aaabez from "@/assets/aaabez.png";
import avtoshkolaFresh from "@/assets/avtoshkola-fresh.png";
import prioritetOnline from "@/assets/prioritet-online.png";
import headstonestore from "@/assets/headstonestore.png";
import udvorik from "@/assets/udvorik.png";
import landingMockup from "@/assets/landing-responsive-mockup.jpg";
import logo from "@/assets/logo.svg";
import { CalculatorWizard } from "@/components/calculator/CalculatorWizard";
import { HeroContactModal } from "@/components/HeroContactModal";
import { useContactModal } from "@/hooks/useContactModal";
import { useCalculatorModal } from "@/hooks/useCalculatorModal";
import { CalculatorContactForm } from "@/components/calculator/CalculatorContactForm";
import { Toaster } from "@/components/ui/toaster";
import { ConsentCheckbox } from "@/components/ConsentCheckbox";
import { PromoBanner } from "@/components/PromoBanner";

import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PaymentSection } from "@/components/PaymentSection";

const Index = () => {
  const { openModal } = useContactModal();
  const { isOpen: isCalculatorOpen, closeModal: closeCalculatorModal } = useCalculatorModal();
  const [language, setLanguage] = useState<'en' | 'ru'>(() => {
    const saved = localStorage.getItem('preferred-language');
    return (saved as 'en' | 'ru') || 'ru';
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [counts, setCounts] = useState({ years: 0, projects: 0, nps: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileButtonsVisible, setMobileButtonsVisible] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    brief: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentError, setConsentError] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const highlightsRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Typewriter effect for h1
  useTypewriter({
    ref: h1Ref,
    speed: 100,
    startDelay: 500,
    showCaret: false
  });

  const texts = {
    en: {
      hero: {
        title: "Personalized\nIT Solutions",
        subtitle: "Website, app and chatbot development. 0% installment plan for development, no banks. Price fixed in contract.",
        cta: "Payment terms",
        cta2: "Calculate cost"
      },
      services: {
        title: "Our Services",
        items: [
          { title: "Web Development", desc: "Modern websites with cutting-edge technologies" },
          { title: "Mobile Applications", desc: "Native and cross-platform solutions" },
          { title: "Chatbots", desc: "AI interfaces for communication automation" },
          { title: "Performance Marketing", desc: "Data-driven strategies with high conversion" },
          { title: "UX/UI Design", desc: "User-centered design for digital products" },
          { title: "Custom Solutions", desc: "Software for unique business tasks" }
        ]
      },
      highlights: {
        years: "10+ years experience",
        projects: "120+ projects",
        nps: "96 NPS"
      },
      landing: {
        badge: "Premium Quality",
        title: "High-Converting Single-Page Websites",
        description1: "We create natively — for speed and conversion.",
        description2: "Every block is designed for your brand and target action.",
        features: [
          {
            icon: "🎨",
            title: "Custom Design", 
            desc: "For brand style and task"
          },
          {
            icon: "⚡",
            title: "Lightning Speed",
            desc: "Native code instead of builders"
          },
          {
            icon: "🛡️",
            title: "Reliable Infrastructure",
            desc: "Hosting, SSL, backups"
          },
          {
            icon: "📱",
            title: "Mobile-first",
            desc: "Perfect on any device"
          }
        ],
        priceFrom: "from $400",
        priceFor: "for landing",
        conditions: [
          "Timeline: 10-14 days after brief",
          "Included: prototype → design → layout → basic SEO → analytics and forms",
          "Guarantee: 14 days of free edits"
        ],
        ctaDiscuss: "Discuss project",
        ctaPortfolio: "View cases"
      },
      caseStudies: {
        title: "Case Studies",
        cases: [
          "AAA-Security — engineering and production company: design and installation of video surveillance, access control and explosion-proof equipment for industrial facilities.",
          "Fresh — driving school: in-person and online theory, practice on modern cars.",
          "Priority — network of driving schools: online theory, simulators and full support for exam taking.",
          "Headstone Store — production and sale of monuments: individual design, granite/marble, engraving, delivery and installation.",
          "Southern Courtyard — country complex: hotel, restaurant, saunas and banquet halls for recreation and events."
        ]
      },
      process: {
        title: "Our Process",
        steps: [
          { title: "Research", desc: "We study business goals and requirements" },
          { title: "Strategy", desc: "Create a plan to achieve success" },
          { title: "Development", desc: "Build following best practices" },
          { title: "Launch", desc: "Seamless deployment and launch" },
          { title: "Support", desc: "Ongoing maintenance and optimization" }
        ]
      },
      form: {
        title: "Get a Quote",
        subtitle: "Tell us about your project and get a detailed proposal within 24 hours.",
        name: "Full Name",
        phone: "Phone Number",
        company: "Company",
        brief: "Project Description",
        cta: "Get Quote"
      },
      calculator: {
        title: "Cost Calculator",
        subtitle: "Get an estimated cost for your project",
        projectType: "Project Type",
        complexity: "Complexity",
        timeline: "Timeline",
        features: "Additional Features",
        calculate: "Calculate Cost",
        result: "Estimated project cost:",
        rubles: "$",
        projectTypes: {
          website: "Website",
          webapp: "Web Application",
          mobileapp: "Mobile App",
          chatbot: "Chatbot",
          ecommerce: "E-commerce"
        },
        complexities: {
          simple: "Simple",
          medium: "Medium",
          complex: "Complex"
        },
        timelines: {
          urgent: "Urgent (up to 1 month)",
          normal: "Normal (1-3 months)",
          flexible: "Flexible (3+ months)"
        },
        featuresList: [
          "Admin Panel",
          "CRM Integration",
          "Payment System",
          "Push Notifications",
          "Analytics & Reports",
          "Multi-language"
        ]
      },
      footer: {
        navigation: "Navigation",
        contact: "Contact",
        privacy: "Privacy Policy"
      }
    },
    ru: {
      hero: {
        title: "Персональные\nIT-решения",
        subtitle: "Разработка сайтов, приложений и чат-ботов. 0% рассрочка на разработку, без банков. Цена в договоре.",
        cta: "Условия оплаты",
        cta2: "Рассчитать стоимость"
      },
      services: {
        title: "Наши услуги",
        items: [
          { title: "Веб-разработка", desc: "Современные веб-сайты с передовыми технологиями" },
          { title: "Мобильные приложения", desc: "Нативные и кроссплатформенные решения" },
          { title: "Чат-боты", desc: "ИИ-интерфейсы для автоматизации общения" },
          { title: "Эффективный маркетинг", desc: "Стратегии на основе данных с высокой конверсией" },
          { title: "UX/UI дизайн", desc: "Пользовательский дизайн для цифровых продуктов" },
          { title: "Индивидуальные решения", desc: "Программное обеспечение под уникальные бизнес-задачи" }
        ]
      },
      highlights: {
        years: "10+ лет опыта",
        projects: "120+ проектов",
        nps: "96 NPS"
      },
      landing: {
        badge: "Премиум-качество",
        title: "Продающие одностраничные сайты",
        description1: "Создаём нативно — ради скорости и конверсии.",
        description2: "Каждый блок продуман под ваш бренд и целевое действие.",
        features: [
          {
            icon: "🎨",
            title: "Кастомный дизайн",
            desc: "Под фирменный стиль и задачу"
          },
          {
            icon: "⚡",
            title: "Молниеносная скорость",
            desc: "Нативный код вместо конструкторов"
          },
          {
            icon: "🛡️",
            title: "Надёжная инфраструктура",
            desc: "Хостинг, SSL, резервные копии"
          },
          {
            icon: "📱",
            title: "Mobile-first",
            desc: "Идеально на любом устройстве"
          }
        ],
        priceFrom: "от 30 000 ₽",
        priceFor: "за лендинг",
        conditions: [
          "Срок: 10–14 дней после брифа",
          "Включено: прототип → дизайн → вёрстка → базовая SEO → аналитика и формы",
          "Гарантия: 14 дней бесплатных правок"
        ],
        ctaDiscuss: "Обсудить проект",
        ctaPortfolio: "Смотреть кейсы"
      },
      caseStudies: {
        title: "Кейсы",
        cases: [
          "ААА-Безопасность — инженерно-производственная компания: проектирование и монтаж видеонаблюдения, СКУД и взрывозащищённого оборудования для промышленных объектов.",
          "Fresh — автошкола: очная и онлайн-теория, практика на современных авто.",
          "Приоритет — сеть автошкол: онлайн-теория, тренажёры и полное сопровождение сдачи экзаменов.",
          "Headstone Store — производство и продажа памятников: индивидуальный дизайн, гранит/мрамор, гравировка, доставка и установка.",
          "Южный Дворик — загородный комплекс: отель, ресторан, сауны и банкетные залы для отдыха и мероприятий."
        ]
      },
      process: {
        title: "Наш процесс",
        steps: [
          { title: "Исследование", desc: "Изучаем бизнес-цели и требования" },
          { title: "Стратегия", desc: "Создаем план достижения успеха" },
          { title: "Разработка", desc: "Строим с соблюдением лучших практик" },
          { title: "Запуск", desc: "Бесшовное развертывание и запуск" },
          { title: "Поддержка", desc: "Постоянное обслуживание и оптимизация" }
        ]
      },
      form: {
        title: "Получить расчёт",
        subtitle: "Расскажите о вашем проекте и получите детальное предложение в течение 24 часов.",
        name: "Полное имя",
        phone: "Номер телефона",
        company: "Компания",
        brief: "Описание проекта",
        cta: "Получить расчёт"
      },
      calculator: {
        title: "Калькулятор стоимости",
        subtitle: "Получите примерную стоимость вашего проекта",
        projectType: "Тип проекта",
        complexity: "Сложность",
        timeline: "Сроки",
        features: "Дополнительные функции",
        calculate: "Рассчитать стоимость",
        result: "Примерная стоимость проекта:",
        rubles: "₽",
        projectTypes: {
          website: "Веб-сайт",
          webapp: "Веб-приложение", 
          mobileapp: "Мобильное приложение",
          chatbot: "Чат-бот",
          ecommerce: "Интернет-магазин"
        },
        complexities: {
          simple: "Простой",
          medium: "Средний",
          complex: "Сложный"
        },
        timelines: {
          urgent: "Срочно (до 1 месяца)",
          normal: "Обычно (1-3 месяца)",
          flexible: "Гибко (3+ месяца)"
        },
        featuresList: [
          "Админ-панель",
          "Интеграция с CRM",
          "Платежная система",
          "Push-уведомления",
          "Аналитика и отчеты",
          "Многоязычность"
        ]
      },
      footer: {
        navigation: "Навигация",
        contact: "Контакты",
        privacy: "Политика конфиденциальности"
      }
    }
  };


  // Detailed service descriptions
  const serviceDetails = {
    en: {
      "Web Development": {
        title: "Web Development",
        description: "Modern websites with cutting-edge technologies",
        subcategories: [
          "Corporate websites and landing pages",
          "E-commerce platforms",
          "Web applications and SaaS solutions",
          "Progressive Web Apps (PWA)",
          "API development and integrations",
          "CMS and admin panels"
        ]
      },
      "Mobile Applications": {
        title: "Mobile Applications", 
        description: "Native and cross-platform solutions",
        subcategories: [
          "Native iOS applications",
          "Native Android applications",
          "Cross-platform React Native apps",
          "Flutter applications",
          "Mobile app UI/UX design",
          "App Store optimization"
        ]
      },
      "Chatbots": {
        title: "Chatbots",
        description: "AI interfaces for communication automation",
        subcategories: [
          "Telegram bots",
          "WhatsApp Business integration",
          "Website chat assistants",
          "Voice assistants",
          "AI customer support bots",
          "E-commerce chatbots"
        ]
      },
      "Performance Marketing": {
        title: "Performance Marketing",
        description: "Data-driven strategies with high conversion",
        subcategories: [
          "Google Ads campaigns",
          "Facebook & Instagram advertising",
          "Yandex.Direct campaigns",
          "SEO optimization",
          "Analytics setup and tracking",
          "Conversion rate optimization"
        ]
      },
      "UX/UI Design": {
        title: "UX/UI Design",
        description: "User-centered design for digital products",
        subcategories: [
          "User experience research",
          "Interface design",
          "Prototyping and wireframes",
          "Design systems",
          "Mobile app design",
          "Usability testing"
        ]
      },
      "Custom Solutions": {
        title: "Custom Solutions",
        description: "Software for unique business tasks",
        subcategories: [
          "CRM and ERP systems",
          "Business process automation",
          "Integration solutions",
          "Database design and optimization",
          "Custom APIs and microservices",
          "Legacy system modernization"
        ]
      }
    },
    ru: {
      "Веб-разработка": {
        title: "Веб-разработка",
        description: "Современные веб-сайты с передовыми технологиями",
        subcategories: [
          "Корпоративные сайты и лендинги",
          "Интернет-магазины",
          "Веб-приложения и SaaS решения",
          "Прогрессивные веб-приложения (PWA)",
          "Разработка API и интеграции",
          "CMS и административные панели"
        ]
      },
      "Мобильные приложения": {
        title: "Мобильные приложения",
        description: "Нативные и кроссплатформенные решения",
        subcategories: [
          "Нативные iOS приложения",
          "Нативные Android приложения", 
          "Кроссплатформенные React Native приложения",
          "Flutter приложения",
          "UI/UX дизайн мобильных приложений",
          "Оптимизация для App Store"
        ]
      },
      "Чат-боты": {
        title: "Чат-боты",
        description: "ИИ-интерфейсы для автоматизации общения",
        subcategories: [
          "Telegram боты",
          "WhatsApp Business интеграция",
          "Чат-ассистенты для сайтов",
          "Голосовые ассистенты",
          "ИИ боты для клиентской поддержки",
          "Чат-боты для e-commerce"
        ]
      },
      "Эффективный маркетинг": {
        title: "Эффективный маркетинг",
        description: "Стратегии на основе данных с высокой конверсией",
        subcategories: [
          "Google Ads кампании",
          "Реклама в Facebook и Instagram",
          "Яндекс.Директ кампании",
          "SEO оптимизация",
          "Настройка аналитики и трекинга",
          "Оптимизация конверсии"
        ]
      },
      "UX/UI дизайн": {
        title: "UX/UI дизайн",
        description: "Пользовательский дизайн для цифровых продуктов",
        subcategories: [
          "Исследование пользовательского опыта",
          "Дизайн интерфейсов",
          "Прототипирование и wireframes",
          "Дизайн-системы",
          "Дизайн мобильных приложений",
          "Тестирование юзабилити"
        ]
      },
      "Индивидуальные решения": {
        title: "Индивидуальные решения", 
        description: "Программное обеспечение под уникальные бизнес-задачи",
        subcategories: [
          "CRM и ERP системы",
          "Автоматизация бизнес-процессов",
          "Интеграционные решения",
          "Проектирование и оптимизация БД",
          "Пользовательские API и микросервисы",
          "Модернизация legacy систем"
        ]
      }
    }
  };


  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Count-up animation for highlights
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            
            // Animate years count
            let yearsCount = 0;
            const yearsTimer = setInterval(() => {
              if (yearsCount < 10) {
                yearsCount++;
                setCounts(prev => ({ ...prev, years: yearsCount }));
              } else {
                clearInterval(yearsTimer);
              }
            }, 100);

            // Animate projects count
            let projectsCount = 0;
            const projectsTimer = setInterval(() => {
              if (projectsCount < 120) {
                projectsCount += 5;
                setCounts(prev => ({ ...prev, projects: Math.min(projectsCount, 120) }));
              } else {
                clearInterval(projectsTimer);
              }
            }, 50);

            // Animate NPS count
            let npsCount = 0;
            const npsTimer = setInterval(() => {
              if (npsCount < 96) {
                npsCount += 3;
                setCounts(prev => ({ ...prev, nps: Math.min(npsCount, 96) }));
              } else {
                clearInterval(npsTimer);
              }
            }, 80);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (highlightsRef.current) {
      observer.observe(highlightsRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const scrollToNext = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Save language preference
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  // Handle scroll for logo size animation
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Block scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Mobile buttons visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const servicesSection = document.getElementById('services');
      const headerHeight = 80; // Approximate header height
      
      if (servicesSection) {
        const servicesSectionTop = servicesSection.offsetTop;
        const scrollPosition = window.scrollY;
        
        // Hide buttons when services section approaches header
        const shouldHideButtons = scrollPosition > servicesSectionTop - headerHeight - 100;
        setMobileButtonsVisible(!shouldHideButtons);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!consentChecked) {
      setConsentError('consent');
      return;
    }
    
    setConsentError('');
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          type: 'contact',
          name: formData.name,
          phone: formData.phone,
          company: formData.company,
          description: formData.brief,
          consent: true
        }
      });

      if (error) throw error;
      
      // Отправляем цель в Яндекс.Метрику
      if (typeof window !== 'undefined' && window.ym) {
        window.ym(103775554, 'reachGoal', 'message_sent_successfully');
      }
      
      toast.success(
        language === 'en' 
          ? 'Thank you! We\'ll get back to you within 24 hours.' 
          : 'Спасибо! Мы свяжемся с вами в течение 24 часов.'
      );
      
      setFormData({ name: '', phone: '', company: '', brief: '' });
      setConsentChecked(false);
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error(
        language === 'en' 
          ? 'Error sending message. Please try again.' 
          : 'Ошибка отправки сообщения. Попробуйте снова.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const t = texts[language];

  // Update h1 text when language changes
  useEffect(() => {
    if (h1Ref.current) {
      h1Ref.current.innerText = t.hero.title;
    }
  }, [language, t.hero.title]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Menu */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`flex items-center justify-between transition-all duration-300 ease-in-out ${
            isScrolled ? 'h-16' : 'h-24'
          }`}>
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={logo} 
                alt="Lean Web Studio" 
                className={`w-auto cursor-pointer transition-all duration-300 ease-in-out ${
                  isScrolled ? 'h-8' : 'h-16'
                }`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <a href="#landing-pages" className="text-sm hover:text-primary transition-colors">Одностраничные сайты</a>
              <a href="#calculator" className="text-sm hover:text-primary transition-colors">Калькулятор</a>
              <a href="#case-studies" className="text-sm hover:text-primary transition-colors">Кейсы</a>
              <button 
                onClick={openModal} 
                className="text-sm hover:text-primary transition-colors cursor-pointer"
              >
                Получить расчёт
              </button>
            </div>

            {/* Contact Links */}
            <div className="hidden lg:flex items-center space-x-2">
              <a 
                href="tel:+79365001333" 
                className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all hover:scale-105 group"
                title={language === 'en' ? 'Call us' : 'Позвонить'}
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium hidden xl:inline">+7 (936) 500-13-33</span>
              </a>
              <a 
                href="https://wa.me/79365001333" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 transition-all hover:scale-105 group"
                title="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-medium hidden xl:inline">WA</span>
              </a>
              <a 
                href="tg://resolve?phone=79365001333" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition-all hover:scale-105 group"
                title="Telegram"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span className="text-sm font-medium hidden xl:inline">TG</span>
              </a>
            </div>

            {/* Language Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <div className="flex bg-card rounded-full p-1 shadow-card">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    language === 'en' ? 'bg-gradient-brand text-white' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ru')}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    language === 'ru' ? 'bg-gradient-brand text-white' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  RU
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 relative z-10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                  }`}></span>
                  <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`lg:hidden border-t border-border bg-background overflow-hidden transition-all duration-300 ease-out ${
            mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className={`py-4 space-y-4 transform transition-transform duration-300 ease-out ${
              mobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
            }`}>
              <a href="#landing-pages" className="block px-4 py-2 text-sm hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Одностраничные сайты</a>
              <a href="#calculator" className="block px-4 py-2 text-sm hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Калькулятор</a>
              <a href="#case-studies" className="block px-4 py-2 text-sm hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Кейсы</a>
              <button 
                onClick={() => {
                  openModal();
                  setMobileMenuOpen(false);
                }} 
                className="block w-full text-left px-4 py-2 text-sm hover:text-primary transition-colors"
              >
                Получить расчёт
              </button>
              
                {/* Mobile Contact Links */}
                <div className="px-4 py-3 border-t border-border/50">
                  <div className="grid grid-cols-1 gap-2">
                    <a 
                      href="tel:+79365001333" 
                      className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span className="font-medium text-sm">+7 (936) 500-13-33</span>
                    </a>
                    <div className="grid grid-cols-2 gap-2">
                      <a 
                        href="https://wa.me/79365001333" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="font-medium text-sm">WhatsApp</span>
                      </a>
                      <a 
                        href="tg://resolve?phone=79365001333" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                        <span className="font-medium text-sm">Telegram</span>
                      </a>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-subtle"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center flex-1 flex flex-col justify-center">
          <h1 ref={h1Ref} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-none h-[5.5rem] md:h-[9rem] lg:h-[10.5rem] flex items-start justify-center">
            <div className="flex flex-col">
              {t.hero.title.split('\n').map((line, index) => (
                <span key={index} className={`block ${index > 0 ? '-mt-2 md:-mt-4 lg:-mt-6' : ''}`}>
                  {line}
                </span>
              ))}
            </div>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto h-[3.5rem] md:h-[2.5rem] flex items-center justify-center">
            {t.hero.subtitle}
          </p>
          
          {/* Desktop buttons - centered after text */}
          <div className="hidden md:flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button 
              variant="brand" 
              size="xl" 
              className="w-full sm:w-auto"
              onClick={() => {
                const paymentSection = document.getElementById('payment');
                paymentSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t.hero.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="secondary" 
              size="xl" 
              className="w-full sm:w-auto bg-white text-primary border-2 border-primary hover:bg-white/90 hover:scale-105 transition-all duration-200"
              onClick={() => {
                const calculatorSection = document.getElementById('calculator');
                calculatorSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t.hero.cta2}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Mobile buttons - fixed at bottom of screen */}
        <div className={`md:hidden fixed bottom-6 left-4 right-4 z-20 flex flex-col gap-3 transition-all duration-300 ease-in-out ${
          mobileButtonsVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
          <Button 
            variant="brand" 
            size="xl" 
            className="w-full"
            onClick={() => {
              const paymentSection = document.getElementById('payment');
              paymentSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t.hero.cta}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="secondary" 
            size="xl" 
            className="w-full bg-white text-primary border-2 border-primary hover:bg-white/90 hover:scale-105 transition-all duration-200"
            onClick={() => {
              const calculatorSection = document.getElementById('calculator');
              calculatorSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t.hero.cta2}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        {/* Scroll indicator */}
        <div className="flex justify-center pb-8">
          <button
            onClick={scrollToNext}
            className="animate-bounce"
          >
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </button>
        </div>
      </section>

      {/* Highlights Section */}
      <section ref={highlightsRef} className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="reveal">
              <div className="text-4xl md:text-5xl font-bold count-up">{counts.years}+</div>
              <p className="text-muted-foreground mt-2">{language === 'en' ? 'years experience' : 'лет опыта'}</p>
            </div>
            <div className="reveal">
              <div className="text-4xl md:text-5xl font-bold count-up">{counts.projects}+</div>
              <p className="text-muted-foreground mt-2">{language === 'en' ? 'projects' : 'проектов'}</p>
            </div>
            <div className="reveal">
              <div className="text-4xl md:text-5xl font-bold count-up">{counts.nps}</div>
              <p className="text-muted-foreground mt-2">NPS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 reveal">
            {t.services.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {t.services.items.map((service, index) => (
              <Card 
                key={index} 
                className="group service-card p-6 sm:p-8 reveal cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] hover:-translate-y-1 border-border/50 hover:border-primary/30 bg-gradient-to-br from-background to-muted/30 relative overflow-hidden" 
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedService(service.title)}
              >
                <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <CardContent className="p-0 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-3 h-3 bg-gradient-brand rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{service.desc}</p>
                  <div className="mt-4 pt-4 border-t border-border/30 group-hover:border-primary/30 transition-colors duration-300">
                    <span className="text-xs sm:text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {language === 'en' ? 'Learn more →' : 'Узнать больше →'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Landing Pages Section */}
      <section id="landing-pages" className="py-20 px-4 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-brand opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-brand opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Image */}
            <div className="reveal lg:order-first">
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-brand opacity-20 rounded-3xl blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
                
                {/* Main Image Container */}
                <div className="relative bg-gradient-to-br from-card to-muted/50 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-border/50 group-hover:border-primary/30 transition-all duration-500 group-hover:scale-[1.02] overflow-hidden">
                  <img 
                    src={landingMockup} 
                    alt={language === 'en' ? 'Landing page development' : 'Разработка лендинга'}
                    className="w-full h-[350px] md:h-[450px] object-cover rounded-xl shadow-lg"
                  />
                  
                  {/* Performance Badges */}
                  <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg animate-fade-in">
                    Lighthouse 95-99/100
                  </div>
                  <div className="absolute top-16 left-4 bg-gradient-brand/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
                    {language === 'en' ? 'Fast loading' : 'Быстрая загрузка'}
                  </div>
                  <div className="absolute top-28 left-4 bg-muted/90 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-full text-xs font-medium shadow-lg animate-fade-in" style={{ animationDelay: '400ms' }}>
                    Mobile-first
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="reveal space-y-8">
              {/* Header */}
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-brand/10 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-gradient-brand rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">
                    {t.landing.badge}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  {t.landing.title}
                </h2>
                
                <div className="space-y-3 text-lg text-muted-foreground leading-relaxed">
                  <p>{t.landing.description1}</p>
                  <p>{t.landing.description2}</p>
                </div>
              </div>

              {/* Features Grid 2x2 */}
              <div className="grid grid-cols-2 gap-4">
                {t.landing.features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="group p-4 rounded-xl bg-gradient-to-br from-card to-muted/30 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover-scale"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-snug">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-card via-muted/30 to-card border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl md:text-4xl font-bold bg-gradient-brand bg-clip-text text-transparent">
                        {t.landing.priceFrom}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t.landing.priceFor}
                    </p>
                  </div>
                </div>
                
                {/* Conditions List */}
                <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                  {t.landing.conditions.map((condition, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>{condition}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button 
                    variant="brand" 
                    size="lg"
                    className="w-full group hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                    onClick={() => useContactModal.getState().openModal()}
                  >
                    <span>{t.landing.ctaDiscuss}</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                  
                  <div className="text-center">
                    <button 
                      className="text-sm text-primary hover:text-primary/80 transition-colors duration-300 story-link"
                      onClick={() => {
                        const element = document.getElementById('case-studies');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {t.landing.ctaPortfolio}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-20 px-4">
        <div className="max-w-6xl mx-auto w-full min-w-0">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 reveal">
            {t.caseStudies.title}
          </h2>
          <div className="relative">
            {/* Mobile: Stack cards vertically */}
            <div className="md:hidden space-y-6">
              {[
                { image: aaabez, url: 'https://aaabez.ru' },
                { image: avtoshkolaFresh, url: 'https://avtoshkola-fresh.ru' },
                { image: prioritetOnline, url: 'https://prioritet-online.ru' },
                { image: headstonestore, url: 'https://headstonestore.com' },
                { image: udvorik, url: 'https://udvorik.com' }
              ].map((caseItem, index) => (
                <div key={index} className="relative">
                  <CaseCard
                    image={caseItem.image}
                    alt={`Case study ${index + 1}`}
                    description={t.caseStudies.cases[index]}
                  />
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(caseItem.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Посетить сайт
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Horizontal carousel */}
            <div className="hidden md:block">
              <div className="relative w-full overflow-hidden min-w-0">
                <div 
                  className="flex transition-transform duration-500 ease-in-out min-w-0"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {[
                    { image: aaabez, url: 'https://aaabez.ru' },
                    { image: avtoshkolaFresh, url: 'https://avtoshkola-fresh.ru' },
                    { image: prioritetOnline, url: 'https://prioritet-online.ru' },
                    { image: headstonestore, url: 'https://headstonestore.com' },
                    { image: udvorik, url: 'https://udvorik.com' }
                  ].map((caseItem, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4 min-w-0">
                      <div className="relative">
                        <DesktopCaseCard
                          image={caseItem.image}
                          alt={`Case study ${index + 1}`}
                          description={t.caseStudies.cases[index]}
                        />
                        <div className="mt-6 text-center">
                          <Button
                            variant="brand"
                            size="lg"
                            onClick={() => window.open(caseItem.url, '_blank')}
                            className="group hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                          >
                            <ExternalLink className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                            Посетить сайт
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Slide controls */}
              <div className="flex justify-center mt-8 gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentSlide(Math.min(4, currentSlide + 1))}
                  disabled={currentSlide === 4}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section id="process" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 reveal">
            {t.process.title}
          </h2>
          
          {/* Mobile: Simple stacked cards */}
          <div className="md:hidden space-y-6">
            {t.process.steps.map((step, index) => (
              <Card key={index} className="p-6 shadow-card reveal">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-brand text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </Card>
            ))}
          </div>

          {/* Desktop: Timeline */}
          <div className="hidden md:block relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"></div>
            <div className="space-y-12">
              {t.process.steps.map((step, index) => (
                <div key={index} className={`flex items-center reveal ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <Card className="p-6 shadow-card">
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-brand rounded-full border-4 border-background"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <CalculatorWizard language={language} />
        </div>
      </section>

      {/* Payment Section */}
      <section id="payment" className="bg-background">
        <PaymentSection language={language} />
      </section>

      {/* Lead Form Section */}
      <section id="contact" className="py-20 px-4 bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.form.title}</h2>
            <p className="text-lg text-muted-foreground">{t.form.subtitle}</p>
          </div>
          
          <Card className="p-8 shadow-card reveal">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.form.name}</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder={t.form.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.form.phone}</label>
                  <InputMask
                    mask="+7 (999) 999-99-99"
                    maskChar="_"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    children={(inputProps: any) => (
                      <Input
                        {...inputProps}
                        type="tel"
                        required
                        placeholder={t.form.phone}
                      />
                    )}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">{t.form.company}</label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder={t.form.company}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">{t.form.brief}</label>
                <Textarea
                  rows={4}
                  value={formData.brief}
                  onChange={(e) => setFormData(prev => ({ ...prev, brief: e.target.value }))}
                  placeholder={t.form.brief}
                />
              </div>
              
              <ConsentCheckbox
                isChecked={consentChecked}
                onChange={(checked) => {
                  setConsentChecked(checked);
                  if (checked) setConsentError('');
                }}
                language={language}
                error={consentError}
              />
              
              <Button 
                type="submit" 
                variant="brand" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting || !consentChecked}
              >
                {isSubmitting ? (language === 'en' ? 'Sending...' : 'Отправка...') : t.form.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-foreground text-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-semibold mb-4">{t.footer.navigation}</h3>
              <div className="space-y-2">
                <a href="#services" className="block hover:text-primary transition-colors">
                  {t.services.title}
                </a>
                <a href="#process" className="block hover:text-primary transition-colors">
                  {t.process.title}
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{t.footer.contact}</h3>
              <div className="space-y-2">
                <p>leanwebstudio@yandex.ru</p>
                <p>+7 (936) 500-13-33</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{t.footer.privacy}</h3>
              <div className="space-y-2">
                <a href="/privacy-policy" className="block hover:text-primary transition-colors">
                  {t.footer.privacy}
                </a>
              </div>
            </div>
          </div>
           
          <div className="border-t border-background/20 mt-8 pt-8 text-center">
            <p className="text-background/60">
              © 2024 Corporate Development Agency. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <HeroContactModal language={language} />
      
      {/* Calculator Contact Modal */}
      <CalculatorContactForm 
        isOpen={isCalculatorOpen} 
        onClose={closeCalculatorModal} 
        calculatorData={{
          projectType: '',
          complexity: '',
          timeline: '',
          features: []
        }}
        estimatedPrice={{ min: 0, max: 0 }}
        language={language}
      />
      
      {/* Toast notifications */}
      <Toaster />
      
      {/* Service Details Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
          <div className="bg-gradient-brand p-6 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <DialogTitle className="text-2xl sm:text-3xl font-bold mb-2 text-white">
                {selectedService && serviceDetails[language][selectedService]?.title}
              </DialogTitle>
              <p className="text-white/90 text-base sm:text-lg opacity-95">
                {selectedService && serviceDetails[language][selectedService]?.description}
              </p>
            </div>
          </div>
          
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h4 className="font-semibold mb-4 text-lg sm:text-xl text-foreground flex items-center">
                <div className="w-2 h-2 bg-gradient-brand rounded-full mr-3"></div>
                {language === 'en' ? 'Our expertise includes:' : 'Наши компетенции включают:'}
              </h4>
              <div className="space-y-3">
                {selectedService && serviceDetails[language][selectedService]?.subcategories.map((subcategory, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted/80 transition-all duration-200 hover:scale-[1.02] group"
                  >
                    <div className="bg-gradient-brand rounded-full p-1 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-200">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm sm:text-base leading-relaxed">{subcategory}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-border/50">
              <Button 
                onClick={() => {
                  setSelectedService(null);
                  openModal();
                }}
                variant="brand"
                size="lg"
                className="w-full text-base sm:text-lg py-3 sm:py-4 rounded-xl hover:scale-[1.02] transition-all duration-200"
              >
                <div className="flex items-center justify-center gap-2">
                  <span>{language === 'en' ? 'Get a quote' : 'Получить консультацию'}</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <PromoBanner />
    </div>
  );
};

export default Index;