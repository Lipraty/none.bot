import { useState, useEffect } from 'react';

const DEFAULT_TYPING_SPEED = 100;
const DEFAULT_DELETING_SPEED = 50;
const DEFAULT_PAUSE_DURATION = 1500;

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
    const currentPhrase = phrases[phraseIndex % phrases.length]; // Ensure phraseIndex is always valid

    if (isDeleting) {
      if (typedText.length > 0) {
        timer = setTimeout(() => {
          setTypedText(currentPhrase.substring(0, typedText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prevIndex) => (prevIndex + 1)); // No modulo here, let it grow
      }
    } else {
      if (typedText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setTypedText(currentPhrase.substring(0, typedText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  // Reset if phrases array changes to avoid issues with out-of-bounds index
  useEffect(() => {
    setPhraseIndex(0);
    setTypedText("");
    setIsDeleting(false);
  }, [phrases]);

  return typedText;
}
