import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, HelpCircle } from "lucide-react";
import { useContactModal } from "@/hooks/useContactModal";

interface PaymentSectionProps {
  language: 'en' | 'ru';
}

export const PaymentSection = ({ language }: PaymentSectionProps) => {
  const { openModal } = useContactModal();

  const texts = {
    en: {
      title: "Stage Payment — 0% Markup, No Banks",
      subtitle: "Pay for your project in parts without markup. Direct contract with our studio, price fixed for the entire duration of work. We customize conditions individually for each task and budget.",
      badges: [
        "0% markup",
        "No banks or applications", 
        "Individual conditions",
        "Fixed price in contract",
        "Early repayment — no fees"
      ],
      howItWorks: {
        title: "How it works",
        steps: [
          { title: "Application", desc: "briefly describe your task" },
          { title: "Quote & conditions", desc: "we fix the cost and convenient payment schedule" },
          { title: "Start work", desc: "first payment, begin development" }
        ]
      },
      examples: {
        title: "Payment schedule examples:",
        schedules: ["50/50", "40/30/30", "25/25/25/25"],
        note: "(We choose together, based on timeline and budget.)"
      },
      faq: {
        title: "FAQ",
        items: [
          { q: "Are there any markups?", a: "No, 0%." },
          { q: "Do I need banks or documents?", a: "No, direct contract with us." },
          { q: "Can I pay early?", a: "Yes, without fees." },
          { q: "Payment term?", a: "Project duration or by agreement." }
        ]
      },
      cta: "Discuss conditions",
      disclaimer: "Stage payment parameters (term, amount and payment dates) are agreed individually and fixed in the contract."
    },
    ru: {
      title: "Оплата по этапам — 0% переплат, без банков",
      subtitle: "Оплачивайте проект частями без переплат. Договор напрямую с нашей студией, цена фиксируется на весь срок работ. Условия подбираем индивидуально под задачу и бюджет.",
      badges: [
        "0% переплат",
        "Без банков и заявок",
        "Индивидуальные условия", 
        "Фиксированная цена в договоре",
        "Досрочное погашение — без комиссий"
      ],
      howItWorks: {
        title: "Как это работает",
        steps: [
          { title: "Заявка", desc: "кратко описываете задачу" },
          { title: "Смета и условия", desc: "фиксируем стоимость и удобный график платежей" },
          { title: "Старт работ", desc: "первый платёж, начинаем разработку" }
        ]
      },
      examples: {
        title: "Примеры графика платежей:",
        schedules: ["50/50", "40/30/30", "25/25/25/25"],
        note: "(Подбираем вместе, исходя из сроков и бюджета.)"
      },
      faq: {
        title: "FAQ",
        items: [
          { q: "Есть ли переплаты?", a: "Нет, 0%." },
          { q: "Нужны ли банки или справки?", a: "Нет, договор напрямую с нами." },
          { q: "Можно закрыть раньше?", a: "Да, без комиссий." },
          { q: "Срок рассрочки?", a: "Индивидуальное условие для каждого." }
        ]
      },
      cta: "Обсудить условия",
      disclaimer: "Параметры оплаты по этапам (срок, размер и даты платежей) согласуются индивидуально и фиксируются в договоре."
    }
  };

  const t = texts[language];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
            {t.subtitle}
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal" style={{ animationDelay: '200ms' }}>
          {t.badges.map((badge, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="px-4 py-2 text-sm font-medium hover-scale bg-gradient-brand/20 text-foreground border-primary/20"
              style={{ animationDelay: `${300 + index * 50}ms` }}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {badge}
            </Badge>
          ))}
        </div>

        {/* How it works */}
        <Card className="mb-12 shadow-card reveal" style={{ animationDelay: '400ms' }}>
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-6 text-center">{t.howItWorks.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.howItWorks.steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-brand text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Examples and FAQ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Payment examples */}
          <Card className="shadow-card reveal hover-scale" style={{ animationDelay: '500ms' }}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">{t.examples.title}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {t.examples.schedules.map((schedule, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {schedule}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic">{t.examples.note}</p>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="shadow-card reveal hover-scale" style={{ animationDelay: '600ms' }}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">{t.faq.title}</h3>
              <div className="space-y-3">
                {t.faq.items.map((item, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium text-foreground">— {item.q}</p>
                    <p className="text-muted-foreground ml-2">{item.a}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center reveal" style={{ animationDelay: '700ms' }}>
          <Button 
            variant="brand" 
            size="lg" 
            onClick={openModal}
            className="mb-4"
          >
            {t.cta}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};