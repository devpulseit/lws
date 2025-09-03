import { useState } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useHeaderSync } from "@/hooks/useHeaderSync";

export const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { headerOffset } = useHeaderSync();

  if (!isVisible) return null;

  return (
    <>
      <div 
        className="fixed left-2 right-2 z-40 max-w-2xl mx-auto sm:left-4 sm:right-4 transition-all duration-300 ease-in-out"
        style={{
          top: `${98 - headerOffset}px`
        }}
      >
        <div 
          className="relative bg-gradient-to-r from-brand-start via-brand-middle to-brand-end p-2 sm:p-3 rounded-lg shadow-lg animate-fade-in cursor-pointer hover:scale-[1.02] transition-all duration-200"
          onClick={() => setShowModal(true)}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-shrink-0">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <h3 className="text-xs sm:text-sm font-semibold text-white">
                  🎉 Специальное предложение!
                </h3>
                <span className="text-xs text-white/90">
                  Первым 15 клиентам — скидка 20%
                </span>
                <ArrowRight className="hidden sm:block h-4 w-4 text-white/80" />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0 h-6 w-6 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
              }}
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="sr-only">Закрыть</span>
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="w-[98%] max-w-md sm:max-w-lg left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          <DialogHeader className="text-center space-y-2">
            <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl justify-center">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary animate-pulse" />
              Специальное предложение!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 sm:space-y-6 px-1 sm:px-2">
            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-brand-start via-brand-middle to-brand-end text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-bold">
                🎉 Скидка 20%
              </div>
              <p className="text-muted-foreground mt-2 sm:mt-3 text-xs sm:text-sm">
                Первым <span className="font-bold text-primary">15 клиентам</span> на любой проект
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-secondary/50 to-muted/30 p-3 sm:p-4 rounded-xl border">
              <h3 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3 text-center">
                Что входит в предложение:
              </h3>
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg bg-background/50">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Веб-сайты и лендинги</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg bg-background/50">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Интернет-магазины</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg bg-background/50">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Веб-приложения</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg bg-background/50">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Мобильные приложения</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg bg-background/50">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Чат-боты для Telegram и WhatsApp</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              <div className="text-center p-2 sm:p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-xs sm:text-sm font-medium text-destructive">
                  ⏰ Предложение действует ограниченное время!
                </p>
              </div>
              
              <Button 
                size="lg"
                className="w-full text-sm sm:text-base py-3 sm:py-4 rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" 
                onClick={() => {
                  setShowModal(false);
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span>Заказать со скидкой</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};