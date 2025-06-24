
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Educational platform colors
				'kid-blue': '#4ECDC4',
				'kid-purple': '#9B59B6',
				'kid-orange': '#FF9F43',
				'kid-pink': '#FF6B9D',
				'kid-green': '#55E6C1',
				'kid-yellow': '#FEE168',
				'kid-red': '#FF6B6B',
				'kid-sky': '#74B9FF',
			},
			backgroundImage: {
				'rainbow-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'kids-gradient': 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
				'adventure-gradient': 'linear-gradient(135deg, #FA8072 0%, #FF6B9D 50%, #9B59B6 100%)',
				'story-gradient': 'linear-gradient(135deg, #FFE066 0%, #FF9F43 100%)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'bounce-gentle': {
					'0%, 100%': { 
						transform: 'translateY(0px)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
					},
					'50%': { 
						transform: 'translateY(-10px)',
						animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
					}
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'pulse-rainbow': {
					'0%, 100%': { 
						boxShadow: '0 0 0 0px rgba(78, 205, 196, 0.7)'
					},
					'50%': { 
						boxShadow: '0 0 0 20px rgba(78, 205, 196, 0)'
					}
				},
				'star-twinkle': {
					'0%, 100%': { 
						transform: 'scale(1) rotate(0deg)',
						opacity: '1'
					},
					'50%': { 
						transform: 'scale(1.2) rotate(180deg)',
						opacity: '0.8'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'bounce-gentle': 'bounce-gentle 2s infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'pulse-rainbow': 'pulse-rainbow 2s infinite',
				'star-twinkle': 'star-twinkle 2s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
