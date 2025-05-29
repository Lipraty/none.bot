import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
}

interface PricingSectionProps {
  pricingPlans: PricingPlan[];
  isDark: boolean;
  onScrollDownClick: () => void;
}

export default function PricingSection({
  pricingPlans,
  isDark,
  onScrollDownClick,
}: PricingSectionProps) {
  return (
    <section
      id="pricing"
      className="relative h-screen flex items-center justify-center snap-start snap-always"
    >
      <div className="container mx-auto px-4 py-20 z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent inline-block">
            选择适合的方案
          </h2>
          <p className="text-xl opacity-80">灵活的定价，满足不同规模的需求</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-0 ${plan.popular ? "ring-2 ring-purple-500 scale-105" : ""} ${
                isDark ? "bg-white/10 backdrop-blur-sm" : "bg-white/70 backdrop-blur-sm"
              } hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:bg-opacity-100`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-red-600 text-white">
                  最受欢迎
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-lg opacity-60">{plan.period}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white"
                      : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                  } transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.name === "开源版" ? "免费开始" : "立即订阅"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button onClick={onScrollDownClick} aria-label="Scroll to projects">
          <ChevronDown className="w-8 h-8 opacity-70" />
        </button>
      </div>
    </section>
  );
}
