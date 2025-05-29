import { useState, useEffect } from 'react';

const DEFAULT_TYPING_SPEED = 100; // Represents max delay for a single char
const DEFAULT_DELETING_SPEED = 50; // Represents max delay for a single char
const DEFAULT_PAUSE_DURATION = 1500;

// New constants for dynamic speed calculation
const TARGET_PHRASE_TYPING_DURATION = 2000; // ms
const TARGET_PHRASE_DELETING_DURATION = 1000; // ms
const MIN_CHAR_TYPING_DELAY = 30; // ms, fastest speed for typing a char
const MIN_CHAR_DELETING_DELAY = 20; // ms, fastest speed for deleting a char

export function useTypewriter(
  phrases: string[],
  typingSpeed = DEFAULT_TYPING_SPEED,
  deletingSpeed = DEFAULT_DELETING_SPEED,
  pauseDuration = DEFAULT_PAUSE_DURATION
) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) {
      setTypedText("");
      return;
    }

    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIndex];

    const L = currentPhrase ? currentPhrase.length : 0;
    let actualTypingDelay = typingSpeed; 
    let actualDeletingDelay = deletingSpeed;

    if (L > 0) {
      const calculatedTypingDelay = TARGET_PHRASE_TYPING_DURATION / L;
      actualTypingDelay = Math.max(MIN_CHAR_TYPING_DELAY, Math.min(typingSpeed, calculatedTypingDelay));

      const calculatedDeletingDelay = TARGET_PHRASE_DELETING_DURATION / L;
      actualDeletingDelay = Math.max(MIN_CHAR_DELETING_DELAY, Math.min(deletingSpeed, calculatedDeletingDelay));
    }

    if (isDeleting) {
      // Handle deleting
      if (typedText.length > 0) {
        timer = setTimeout(() => {
          // Ensure currentPhrase is defined before calling substring
          setTypedText(currentPhrase ? currentPhrase.substring(0, typedText.length - 1) : "");
        }, actualDeletingDelay); // Use calculated deleting delay
      } else {
        // Finished deleting
        setIsDeleting(false);
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    } else {
      // Handle typing
      // Ensure currentPhrase is defined before calling substring or checking length
      if (currentPhrase && typedText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setTypedText(currentPhrase.substring(0, typedText.length + 1));
        }, actualTypingDelay); // Use calculated typing delay
      } else {
        // Finished typing, pause then start deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]); // Keep extended dependencies for now, but applied core logic from old version

  return typedText;
}
