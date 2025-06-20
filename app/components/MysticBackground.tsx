'use client'

import { useEffect, useRef } from 'react'

export function MysticBackground({ children }: { children?: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; color: string; alpha: number }[] = []

    // No longer using a random color array, each particle will have a gradient
    // const colors = ['#024959', '#03738C'] // This line will be commented/removed by the model

    for (let i = 0; i < 80; i++) { // Slightly fewer particles for subtlety
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1, // Slightly larger particles for visibility
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5 - 0.1,
        color: '', // Placeholder, color will be defined by gradient dynamically
        alpha: Math.random() * 0.2 + 0.8, // Revert to higher random opacity between 0.8 and 1.0
      })
    }

    function drawParticles() {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fef6f2'; // Explicitly set background to hero color
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'lighter'; // Revert to lighter blend mode for glowing effect

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

        // Create a linear gradient for each particle
        const gradient = ctx.createLinearGradient(
          particle.x - particle.size,
          particle.y,
          particle.x + particle.size,
          particle.y
        );
        gradient.addColorStop(0, '#024959'); // Start color
        gradient.addColorStop(1, '#03738C'); // End color

        ctx.fillStyle = gradient; // Apply the gradient
        ctx.globalAlpha = particle.alpha;
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
      });

      requestAnimationFrame(drawParticles);
    }

    drawParticles()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-[-1] opacity-100" />
      {children}
    </>
  )
}

