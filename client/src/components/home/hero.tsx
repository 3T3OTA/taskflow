import { Link } from "@heroui/link";
import { Button, Chip, Spinner } from "@heroui/react";
import { title } from "../primitives";
import { heroData } from "@/data";
import { useAuth } from "@/context/AuthContext";
function Hero() {
  const { user, loading } = useAuth();
  return (    
    <section className="relative py-16 lg:py-20">
      {/* Glow background: خفيف جدًا */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-gradient-to-br from-primary-400/10 to-blue-400/10 blur-lg opacity-70 -z-10"></div>
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {}
          <div className="flex-1 text-center lg:text-left max-w-xl backdrop-blur-sm p-6 rounded-xl relative">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-500/60 to-transparent"></div>
            <Chip color="primary" variant="flat" className="border border-primary-600/50 mb-5" >New: Our Memberships Subscription</Chip>
            
            <h1 className={title({ size: "lg", className: "inline-block" })}>
              { heroData.title } 
              <span className="text-primary"> { heroData.spantitle }</span>
            </h1>            <p className="mt-5 text-base text-pretty text-default-500 sm:text-lg/relaxed">{ heroData.subtitle }</p>
            
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
              {}
              <Button
                as={Link}
                href={loading ? "#" : (user ? heroData.ctaPrimary.href : heroData.ctaPrimaryGuest.href)}
                color="primary"
                variant="shadow"
                size="lg"
                className={`font-medium ${loading ? "opacity-70 pointer-events-none" : ""}`}
              >
                {loading ? <Spinner color="white" size="sm" /> : (user ? heroData.ctaPrimary.label : heroData.ctaPrimaryGuest.label)}
              </Button>                <Button 
                as="a" 
                href={heroData.ctaSecondary.href}
                variant="bordered" 
                className={`border-1 border-default-200 dark:border-default-100/50 ${loading ? "opacity-70 pointer-events-none" : ""}`}
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  const featuresElement = document.getElementById('features');
                  if (featuresElement) {
                    const offset = featuresElement.getBoundingClientRect().top + window.scrollY - 80; 
                    const startPosition = window.pageYOffset;
                    const distance = offset - startPosition;
                    const duration = 1000; 
                    let start: number | null = null;
                    
                    function step(timestamp: number) {
                      if (!start) start = timestamp;
                      const progress = timestamp - start;
                      const percentage = Math.min(progress / duration, 1);
                      
                      const easeInOutCubic = (t: number) => 
                        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                      
                      window.scrollTo({
                        top: startPosition + distance * easeInOutCubic(percentage),
                        behavior: 'auto' 
                      });
                      
                      if (progress < duration) {
                        window.requestAnimationFrame(step);
                      }
                    }
                    
                    window.requestAnimationFrame(step);
                  }
                }}
              >
                {heroData.ctaSecondary.label}
              </Button>
            </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
              <div className="flex -space-x-3">
                {heroData.users.map((user, i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-default-900 overflow-hidden shadow-md"
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <p className="text-small text-default-500">
                <span className="font-semibold text-default-700">+2,500</span> happy users
              </p>
            </div>
          </div>
          
          {}
          <div className="flex-1 hidden lg:block relative">
            {/* خفف الخلفية الجانبية أيضًا */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-400/10 to-blue-400/10 rounded-3xl blur-md opacity-60 -z-10"></div>
            <div className="relative border-1 border-default-200/50 dark:border-default-100/20 bg-default-50/50 dark:bg-default-900/50 backdrop-blur-sm rounded-2xl p-1 shadow-xl">
              <img 
                src="https://i.ibb.co/TMLr6m7J/bg11.png" 
                alt="Discord Bot Dashboard" 
                className="w-full h-full object-cover rounded-xl"
              />
              
              {}
              <div className="absolute -top-3 -left-3 bg-success/10 backdrop-blur-md border border-success/20 px-2 py-1 rounded-lg text-xs font-medium text-success shadow-lg">
                { heroData.badgeLeft }
              </div>
              <div className="absolute -bottom-3 -right-3 bg-primary/10 backdrop-blur-md border border-primary/20 px-2 py-1 rounded-lg text-xs font-medium text-primary shadow-lg">
                { heroData.badgeRight }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;