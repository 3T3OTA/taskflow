import {Card, CardFooter, Image, Button} from "@heroui/react";
import { motion } from "framer-motion";


const trusted = [
  {
    name: "Discord",
    icon: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/26a0ae115491607.604faec7193cb.png",
  },
  {
    name: "GitHub",
    icon: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F4e0d816kuzyu700pdbjn.png",
  },
  {
    name: "Discord",
    icon: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/26a0ae115491607.604faec7193cb.png",
  },
  {
    name: "GitHub",
    icon: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F4e0d816kuzyu700pdbjn.png",
  },
  {
    name: "Discord",
    icon: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/26a0ae115491607.604faec7193cb.png",
  },
  {
    name: "GitHub",
    icon: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F4e0d816kuzyu700pdbjn.png",
  },
  {
    name: "Discord",
    icon: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/26a0ae115491607.604faec7193cb.png",
  },
  {
    name: "GitHub",
    icon: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F4e0d816kuzyu700pdbjn.png",
  },
  {
    name: "Discord",
    icon: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/26a0ae115491607.604faec7193cb.png",
  },
  {
    name: "GitHub",
    icon: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F4e0d816kuzyu700pdbjn.png",
  },
];

function Trusted() {
  const duplicatedTrusted = [...trusted, ...trusted, ...trusted];

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-purple-500/10 blur-[80px] -z-10"></div>
      <p className="text-sm text-default-500 font-medium text-center py-6 mb-5">TRUSTED BY OVER <span className="text-default-700">100</span> PARTNER, INCLUDING</p>
      
    <div className="relative overflow-hidden pb-16 max-w-[1000px] mx-auto">        
        <motion.div 
          className="flex gap-6"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 6,
              ease: "linear"
            }
          }}
        >
          {duplicatedTrusted.map((item, index) => (            
            <motion.div
              key={`${item.name}-${index}`}              
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 20 }}
              transition={{ 
                delay: index * 0.01,
                duration: 0.2,
                ease: "easeOut"
              }}
            >              
            <Card 
                isFooterBlurred 
                className="border-none backdrop-blur-sm bg-black/5 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300" 
                radius="lg" 
                style={{ width: '150px' }}
              >
                <Image
                  alt={`${item.name} logo`}
                  className="object-cover"
                  height={120}
                  src={item.icon}
                  width={150}
                />
                <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <Button
                    className="text-tiny text-white bg-black/20"
                    color="default"
                    radius="lg"
                    size="sm"
                    variant="flat"
                  >
                    {item.name}
                  </Button>
                </CardFooter>        
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Trusted