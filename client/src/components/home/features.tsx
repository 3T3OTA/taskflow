import { Card, CardBody, CardHeader, Image, Chip } from "@heroui/react";
import { featuresData } from "@/data";

function Features() {
  return (    
  <section id="features" className="relative py-12">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-primary-500/5 blur-[180px] -z-10"></div>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-6">
        <div className="text-center backdrop-blur-sm py-4 mb-10">
          <h2 className="text-3xl font-bold text-default-900 dark:text-white sm:text-4xl xl:text-5xl">
            {featuresData.title}
          </h2>
          <p className="max-w-md mx-auto mt-4 text-base font-normal text-default-600 dark:text-default-400">
            {featuresData.subtitle}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {}
          <div className="md:w-2/5 lg:w-1/3 mb-6 md:mb-0">
            <Card className="border-1 border-default-200 dark:border-default-100/20 p-2 shadow-lg dark:bg-gray-900">
              <Image
                isZoomed
                isBlurred
                className="w-full h-full object-cover rounded-xl"
                src={featuresData.image}
                alt="Features showcase"
                radius="lg"
              />
            </Card>
          </div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            { featuresData.features.map((feature, index) => (
            <Card key={index} className="border-1 border-default-200 dark:border-default-100/20 shadow-md dark:bg-gray-900">
              <CardHeader className="pb-0 pt-5 px-5 flex items-center gap-2">
                <Chip color={feature.color as "primary" | "success" | "danger" | "secondary" | "default" | "warning"} variant="flat" size="sm">{ feature.chipText }</Chip>
                <h3 className="text-lg font-semibold text-default-700">
                  {feature.title}
                </h3>
              </CardHeader>
              <CardBody className="py-3 px-5">
                <p className="text-default-600 text-sm">
                  {feature.description}

                </p>
              </CardBody>
            </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;