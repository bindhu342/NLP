import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface PetAdoptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdoptSuccess?: (petData: { name: string; type: string; image: string }) => void;
  initialPetId?: number;
}

export const PETS = [
  { id: 1, name: "Puppy", image: "/images/pet.png", color: "from-amber-400 to-orange-500" },
  { id: 2, name: "Kitten", image: "/images/kitten.png", color: "from-pink-400 to-rose-500" },
  { id: 3, name: "Birdie", image: "/images/birdie.png", color: "from-green-400 to-teal-500" },
  { id: 4, name: "Bunny", image: "/images/rabbit.png", color: "from-purple-400 to-pink-500" },
  { id: 5, name: "Hamster", image: "/images/hamster.png", color: "from-yellow-400 to-amber-500" },
  { id: 6, name: "Turtle", image: "/images/turtle.png", color: "from-emerald-400 to-green-500" },
];

export function PetAdoptionModal({ isOpen, onClose, onAdoptSuccess, initialPetId }: PetAdoptionModalProps) {
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [petName, setPetName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [adopted, setAdopted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialPetId) {
        setSelectedPet(initialPetId);
        const index = PETS.findIndex(p => p.id === initialPetId);
        if (index !== -1) setCurrentIndex(index);
      } else {
        setSelectedPet(PETS[0].id);
        setCurrentIndex(0);
      }
    }
  }, [isOpen, initialPetId]);

  const handleAdopt = () => {
    if (selectedPet && petName) {
      setShowConfetti(true);
      setAdopted(true);
      const adoptedPet = PETS.find((p) => p.id === selectedPet);
      if (adoptedPet && onAdoptSuccess) {
        onAdoptSuccess({ name: petName, type: adoptedPet.name, image: adoptedPet.image });
      }
      setTimeout(() => {
        onClose();
        setSelectedPet(null);
        setPetName("");
        setAdopted(false);
        setShowConfetti(false);
      }, 3000);
    }
  };

  const nextPet = () => {
    setCurrentIndex((prev) => (prev + 1) % PETS.length);
    setSelectedPet(PETS[(currentIndex + 1) % PETS.length].id);
  };

  const prevPet = () => {
    setCurrentIndex((prev) => (prev - 1 + PETS.length) % PETS.length);
    setSelectedPet(PETS[(currentIndex - 1 + PETS.length) % PETS.length].id);
  };

  const visiblePets = [
    PETS[(currentIndex - 1 + PETS.length) % PETS.length],
    PETS[currentIndex],
    PETS[(currentIndex + 1) % PETS.length],
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Confetti Animation */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: "-10px",
                    background: ["#6B4FFF", "#FF9500", "#FF6B9D", "#1ECDC4"][Math.floor(Math.random() * 4)],
                  }}
                  animate={{
                    y: window.innerHeight + 100,
                    x: (Math.random() - 0.5) * 300,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 1,
                    ease: "easeIn",
                  }}
                />
              ))}
            </div>
          )}

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-smooth"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {!adopted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-4xl font-display font-bold mb-2 gradient-purple-orange-text text-center">
                  Choose Your Pet! 🐾
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                  Pick your companion and start your savings journey
                </p>

                {/* Pet Carousel */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <motion.button
                      onClick={prevPet}
                      className="p-3 bg-gradient-purple-orange rounded-full text-white hover:opacity-90"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </motion.button>

                    <div className="flex gap-4 justify-center items-center">
                      {visiblePets.map((pet, idx) => (
                        <motion.div
                          key={pet.id}
                          className={`cursor-pointer transition-all ${
                            idx === 1 ? "scale-125" : "scale-75 opacity-50"
                          }`}
                          onClick={() => {
                            setSelectedPet(pet.id);
                            const newIndex = PETS.findIndex(p => p.id === pet.id);
                            if (newIndex !== -1) setCurrentIndex(newIndex);
                          }}
                          whileHover={{ scale: idx === 1 ? 1.3 : 0.8 }}
                          animate={{
                            scale: idx === 1 && selectedPet === pet.id ? 1.35 : idx === 1 ? 1.25 : 0.75,
                            filter:
                              idx === 1
                                ? "drop-shadow(0 10px 30px rgba(107, 79, 255, 0.4))"
                                : "drop-shadow(0 0 0px rgba(0, 0, 0, 0))",
                          }}
                        >
                          <motion.div
                            className={`p-2 rounded-2xl bg-gradient-to-br ${pet.color} flex items-center justify-center w-24 h-24 overflow-hidden`}
                            animate={
                              idx === 1 && selectedPet === pet.id
                                ? { y: [0, -10, 0], rotate: [0, 5, -5, 0] }
                                : {}
                            }
                            transition={{ duration: 0.6, repeat: Infinity }}
                          >
                            <img src={pet.image} alt={pet.name} className="w-full h-full object-contain" />
                          </motion.div>
                          <p className="text-center mt-2 font-semibold text-sm">{pet.name}</p>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      onClick={nextPet}
                      className="p-3 bg-gradient-purple-orange rounded-full text-white hover:opacity-90"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.button>
                  </div>

                  {/* Pet Name Input */}
                  {selectedPet && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-semibold mb-2">Name Your Pet</label>
                        <input
                          type="text"
                          placeholder="e.g., Buddy, Whiskers, Tweety..."
                          value={petName}
                          onChange={(e) => setPetName(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && selectedPet && petName.trim()) {
                              handleAdopt();
                            }
                          }}
                          className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-primary transition-smooth"
                          autoFocus
                        />
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Button
                          onClick={handleAdopt}
                          disabled={!selectedPet || !petName.trim()}
                          className="w-full bg-gradient-purple-orange hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg text-lg transition-smooth"
                        >
                          🎉 Adopt {PETS.find((p) => p.id === selectedPet)?.name}!
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </div>

                {/* Pet Stats */}
                {selectedPet && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl p-4 border border-purple-200"
                  >
                    <h3 className="font-semibold mb-3">Your Pet's Stats</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold gradient-purple-orange-text">100</p>
                        <p className="text-xs text-gray-600">Health</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold gradient-purple-orange-text">0</p>
                        <p className="text-xs text-gray-600">Level</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold gradient-purple-orange-text">₹0</p>
                        <p className="text-xs text-gray-600">Savings</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.8 }}
                  className="mb-6 inline-block h-48 w-48 overflow-hidden rounded-full bg-gradient-to-br from-purple-100 to-orange-100 p-4"
                >
                  <img src={PETS.find((p) => p.id === selectedPet)?.image} alt="Adopted Pet" className="w-full h-full object-contain" />
                </motion.div>
                <h3 className="text-3xl font-display font-bold mb-2 gradient-purple-orange-text">
                  Welcome {petName}! 🎉
                </h3>
                <p className="text-gray-600 mb-6">
                  Your new companion is ready to help you save!
                </p>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-2xl font-semibold text-purple-600"
                >
                  Let's start saving together! 💜
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
