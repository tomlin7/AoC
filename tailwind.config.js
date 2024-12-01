/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		typography: {
  			invert: {
  				css: {
  					'--tw-prose-body': 'var(--tw-prose-invert-body)',
  					'--tw-prose-headings': 'var(--tw-prose-invert-headings)',
  					'--tw-prose-links': 'var(--tw-prose-invert-links)',
  					'--tw-prose-links-hover': 'var(--tw-prose-invert-links-hover)',
  					'--tw-prose-underline': 'var(--tw-prose-invert-underline)',
  					'--tw-prose-underline-hover': 'var(--tw-prose-invert-underline-hover)',
  					'--tw-prose-bold': 'var(--tw-prose-invert-bold)',
  					'--tw-prose-counters': 'var(--tw-prose-invert-counters)',
  					'--tw-prose-bullets': 'var(--tw-prose-invert-bullets)',
  					'--tw-prose-hr': 'var(--tw-prose-invert-hr)',
  					'--tw-prose-quote-borders': 'var(--tw-prose-invert-quote-borders)',
  					'--tw-prose-captions': 'var(--tw-prose-invert-captions)',
  					'--tw-prose-code': 'var(--tw-prose-invert-code)',
  					'--tw-prose-code-bg': 'var(--tw-prose-invert-code-bg)',
  					'--tw-prose-pre-code': 'var(--tw-prose-invert-pre-code)',
  					'--tw-prose-pre-bg': 'var(--tw-prose-invert-pre-bg)',
  					'--tw-prose-pre-border': 'var(--tw-prose-invert-pre-border)',
  					'--tw-prose-th-borders': 'var(--tw-prose-invert-th-borders)',
  					'--tw-prose-td-borders': 'var(--tw-prose-invert-td-borders)'
  				}
  			},
  			DEFAULT: {
  				css: {
  					'code::before': {
  						content: '"'
  					},
  					'code::after': {
  						content: '"'
  					}
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
