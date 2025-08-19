import { Button, Chip, Card } from "@heroui/react";
import { ChevronRight, Users, Sparkles, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <section className="relative py-16">
      {}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-primary-600/20 to-purple-500/10 blur-[150px] -z-10"></div>
      <div className="absolute -bottom-10 right-0 w-40 h-40 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <Card className="border-1 border-default-200 dark:border-default-100/20 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-500/60 to-transparent"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {}
            <div className="p-6 sm:p-8 lg:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Chip color="primary" variant="flat" className="mb-4">Start Now</Chip>
                <h2 className="text-3xl sm:text-4xl font-bold text-default-900 dark:text-white mb-4">
                  Ready to Transform Your <span className="text-primary">Workflow</span>?
                </h2>
                <p className="text-default-600 mb-8 max-w-lg">
                  Join thousands of teams who have already streamlined their processes, improved collaboration, and boosted productivity with our platform.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-primary" />
                    <span className="text-sm text-default-600">10K+ Active Users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-primary" />
                    <span className="text-sm text-default-600">Free Updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={18} className="text-primary" />
                    <span className="text-sm text-default-600">Secure Platform</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button 
                    as={Link} 
                    to="/register"
                    color="primary"
                    size="lg"
                    className="font-semibold"
                    endContent={<ChevronRight size={16} />}
                  >
                    Sign up for free
                  </Button>
                  <Button 
                    as={Link}
                    to="/login"
                    variant="flat" 
                    color="default" 
                    size="lg"
                    className="font-medium"
                  >
                    Log in
                  </Button>
                </div>
              </motion.div>
            </div>
            
            {}
            <div className="relative bg-gradient-to-br from-primary-600/10 to-primary-800/5 hidden lg:flex items-center justify-center p-10">
              <div className="relative w-full max-w-[320px]">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary-500/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 left-10 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"></div>
                
                {}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="relative z-10"
                >
                  <Card className="border-1 border-default-200 dark:border-default-100/20 bg-default-50/80 backdrop-blur-md shadow-xl">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                          <Sparkles size={20} className="text-primary-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-default-900">Premium Features</h4>
                          <p className="text-xs text-default-500">Unlock all capabilities</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="h-2 w-full bg-default-200/50 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-primary-500 to-blue-500 w-[75%]"></div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-default-600">Free plan</span>
                          <span className="text-primary-500 font-medium">Premium plan</span>
                        </div>
                      </div>
                      
                      <Button 
                        color="primary"
                        size="sm" 
                        className="w-full font-medium"
                      >
                        Upgrade now
                      </Button>
                    </div>
                  </Card>
                  
                  <div className="absolute -bottom-6 -right-6">
                    <Card className="border-1 border-default-200 dark:border-default-100/20 bg-default-50/80 backdrop-blur-md shadow-md">
                      <div className="p-3 flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className={`h-6 w-6 rounded-full border-2 border-white bg-default-${i*100}`}></div>
                          ))}
                        </div>
                        <span className="text-xs font-medium">+2.5k this week</span>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default CallToAction;