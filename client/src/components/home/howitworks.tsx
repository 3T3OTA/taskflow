import React from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/react";
import { Chip } from "@heroui/react";
import { howItWorksData } from "@/data";

function HowItWorks() {
  return (
    <section className="py-12 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary-600/10 to-blue-500/5 blur-[180px] -z-10"></div>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center backdrop-blur-sm py-4">
          <h2 className="text-3xl font-bold text-default-900 dark:text-white sm:text-4xl xl:text-5xl">
            {howItWorksData.title}
          </h2>
          <p className="max-w-md mx-auto mt-5 text-base font-normal text-default-600 dark:text-default-400">
            {howItWorksData.subtitle}
          </p>
        </div>
        <div className="flex flex-col items-center max-w-md mx-auto mt-8 lg:mt-20 lg:flex-row lg:max-w-none gap-4">          
          {howItWorksData.steps.map((step, index) => (
            <React.Fragment key={`step-${index}`}>
              {}
              <div className={`relative flex-1 w-full ${index > 0 ? "mt-8 lg:mt-0" : ""}`}>
                {}
                {index === 1 && (
                  <div className="absolute -inset-4">
                    <div
                      className="w-full h-full mx-auto rotate-180 opacity-20 blur-lg filter"
                      style={{
                        background:
                          "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
                      }}
                    />
                  </div>
                )}
                <Card className={`${index === 1 ? "relative" : ""} border-1 border-default-200 dark:border-default-100/20 shadow-lg dark:bg-gray-900`}>
                  <CardHeader className="pb-0 pt-6 px-6 flex items-center gap-2">
                    <div className={`inline-flex items-center justify-center w-10 h-10 text-base font-bold text-white rounded-xl ${
                      step.color === 'primary' ? 'bg-primary' : 
                      step.color === 'success' ? 'bg-success' :
                      step.color === 'warning' ? 'bg-warning' :
                      step.color === 'secondary' ? 'bg-secondary' : 'bg-primary'
                    }`}>
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-default-700">
                      {step.title}
                    </h3>
                  </CardHeader>
                  <CardBody className="py-4 px-6">
                    <p className="text-default-600">
                      {step.description}
                    </p>
                  </CardBody>
                  <CardFooter className="pt-0 pb-6 px-6">
                    <Chip color={step.color as "primary" | "success" | "warning" | "default" | "secondary" | "danger"} variant="flat" size="sm">{`${step.chipText}`}</Chip>
                  </CardFooter>
                </Card>
              </div>
              
              {}
              {index < howItWorksData.steps.length - 1 && (
                <div className="hidden lg:block lg:-mx-2">
                  <svg
                    className="w-auto h-4 text-default-400"
                    viewBox="0 0 81 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)"
                      stroke="currentColor"
                    />
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)"
                      stroke="currentColor"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks