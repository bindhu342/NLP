import { motion } from "framer-motion";
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Repeat2 } from "lucide-react";

export function SidebarContentComponent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Sidebar>
      <SidebarHeader className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg mb-4">
        <h2 className="text-lg font-display font-bold gradient-purple-orange-text">SavePaw</h2>
      </SidebarHeader>

      <SidebarContent>
        {/* Goals Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-bold">
            🎯 Savings Goals
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { goal: "Grooming & Accessories Fund", target: "₹5,000", saved: "₹3,200", icon: "✨", progress: 64 },
                { goal: "Emergency Fund", target: "₹50,000", saved: "₹35,000", icon: "🚨", progress: 70 },
                { goal: "Education", target: "₹1,00,000", saved: "₹45,000", icon: "📚", progress: 45 },
                { goal: "Vacation", target: "₹75,000", saved: "₹28,000", icon: "✈️", progress: 37 },
                { goal: "Tech Gadget", target: "₹30,000", saved: "₹22,500", icon: "📱", progress: 75 },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-4 bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-smooth"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold truncate">{item.goal}</h3>
                      <p className="text-xs text-muted-foreground">{item.saved} / {item.target}</p>
                    </div>
                  </div>
                  <motion.div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-gradient-purple-orange h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                  <p className="text-right mt-2 text-xs font-semibold text-primary">{item.progress}% Complete</p>
                </motion.div>
              ))}
            </motion.div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Roundup Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-bold">
            🔄 Automated Round-Up
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="p-4 bg-white rounded-lg border border-border shadow-sm">
                <h3 className="text-sm font-semibold mb-4">How It Works</h3>
                <div className="space-y-3">
                  {[
                    { step: 1, desc: "You spend ₹99 on coffee", icon: "☕" },
                    { step: 2, desc: "We round it up to ₹100", icon: "📈" },
                    { step: 3, desc: "₹1 goes to your savings", icon: "💰" },
                    { step: 4, desc: "Your pet gets fed! 🐾", icon: "🎉" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="text-xl">{item.icon}</div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold">Step {item.step}</p>
                        <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border shadow-sm">
                <h3 className="text-sm font-semibold mb-4">Your Stats</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-br from-purple-50 to-orange-50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Total Rounded Up</p>
                    <motion.p
                      className="text-2xl font-display font-bold gradient-purple-orange-text"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ₹2,450
                    </motion.p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-purple-50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Transactions</p>
                      <p className="text-lg font-bold text-primary">245</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Avg Round-Up</p>
                      <p className="text-lg font-bold text-accent">₹10</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full bg-gradient-purple-orange hover:opacity-90 text-white font-bold py-2 text-sm">
                  <Repeat2 className="mr-2 w-4 h-4" /> Enable Round-Up
                </Button>
              </motion.div>
            </motion.div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
