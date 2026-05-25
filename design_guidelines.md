{
  "product": {
    "name": "ReplyAI",
    "type": "saas_app_dashboard",
    "audience": ["students", "professionals", "dating app users", "social media users"],
    "brand_attributes": ["fast", "confident", "witty", "trustworthy", "minimal", "judge-impressing"],
    "north_star_action": "Paste conversation → choose tone → generate → copy"
  },
  "visual_personality": {
    "style": ["modern minimal", "flat", "dark theme"],
    "do_not_use": ["gradients", "glassmorphism", "transparent surfaces"],
    "accent_strategy": "Purple is a precision tool: primary CTA, selected mode, focus ring, small highlights only. Everything else stays neutral."
  },
  "design_tokens": {
    "css_custom_properties": {
      "instructions": "Define these in /app/frontend/src/index.css under :root and .dark. Use Tailwind + CSS vars. Keep surfaces opaque (no alpha backgrounds).",
      "colors": {
        "--bg": "#0B0B10",
        "--bg-2": "#0F0F16",
        "--surface": "#141423",
        "--surface-2": "#19192B",
        "--border": "#26263A",
        "--text": "#F4F4F7",
        "--text-2": "#B7B7C9",
        "--text-3": "#8B8BA3",
        "--primary": "#534AB7",
        "--primary-hover": "#6259D6",
        "--primary-pressed": "#463FA0",
        "--primary-contrast": "#FFFFFF",
        "--focus": "#7A72E8",
        "--success": "#2FBF71",
        "--warning": "#F0B429",
        "--danger": "#E5484D",
        "--info": "#3B82F6"
      },
      "typography": {
        "--font-sans": "\"Space Grotesk\", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        "--font-mono": "\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\"",
        "--tracking-tight": "-0.02em",
        "--tracking-normal": "0em",
        "--leading-tight": "1.15",
        "--leading-normal": "1.5"
      },
      "radii": {
        "--radius-sm": "10px",
        "--radius-md": "14px",
        "--radius-lg": "18px"
      },
      "shadows": {
        "--shadow-1": "0 1px 0 rgba(255,255,255,0.04)",
        "--shadow-2": "0 10px 30px rgba(0,0,0,0.45)"
      },
      "spacing": {
        "--space-1": "4px",
        "--space-2": "8px",
        "--space-3": "12px",
        "--space-4": "16px",
        "--space-5": "24px",
        "--space-6": "32px",
        "--space-7": "48px"
      }
    },
    "tailwind_mapping": {
      "instructions": "Use Tailwind for layout/spacing; use CSS vars for colors via arbitrary values (e.g., bg-[var(--bg)]). Avoid opacity-based backgrounds.",
      "examples": {
        "page_bg": "bg-[var(--bg)] text-[var(--text)]",
        "card": "bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-2)]",
        "muted_text": "text-[var(--text-2)]",
        "hairline": "border-[var(--border)]"
      }
    }
  },
  "typography": {
    "font_pairing": {
      "heading": "Space Grotesk (600/700)",
      "body": "Space Grotesk (400/500)",
      "mono": "JetBrains Mono (for counters, rate limit, code-like snippets)"
    },
    "google_fonts_import": {
      "instructions": "Add to /app/frontend/public/index.html <head> (or equivalent) for .js React app.",
      "links": [
        "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
      ]
    },
    "text_size_hierarchy": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.02em]",
      "h2": "text-base md:text-lg text-[var(--text-2)]",
      "section_title": "text-lg font-semibold",
      "body": "text-sm md:text-base leading-[1.5]",
      "small": "text-xs text-[var(--text-3)]"
    }
  },
  "layout": {
    "grid_and_width": {
      "max_width": "max-w-5xl",
      "page_padding": "px-4 sm:px-6 lg:px-8",
      "vertical_rhythm": "Use 24–48px gaps between major blocks; 12–16px inside cards.",
      "structure": "Mobile-first single column. On lg: two-column generator (input left, output right) with sticky output header actions."
    },
    "page_shell": {
      "navbar": {
        "height": "h-16",
        "style": "Opaque dark bar with bottom border; no blur.",
        "classes": "sticky top-0 z-50 bg-[var(--bg)]/100 border-b border-[var(--border)]",
        "content": ["Logo left", "Nav links right", "Primary CTA optional on desktop: Get Extension"]
      },
      "footer": {
        "style": "Small, quiet privacy note; keep it visible but not loud.",
        "classes": "border-t border-[var(--border)] py-8 text-xs text-[var(--text-3)]"
      }
    }
  },
  "components": {
    "component_path": {
      "primary": "/app/frontend/src/components/ui",
      "note": "Even though problem statement says shadcn not needed, this repo already includes shadcn/ui in .jsx. Prefer these for speed + accessibility."
    },
    "shadcn_components_to_use": {
      "navigation": ["navigation-menu.jsx OR simple <nav> with Button + Link"],
      "buttons": ["button.jsx"],
      "inputs": ["textarea.jsx", "input.jsx", "label.jsx"],
      "feedback": ["sonner.jsx (toasts)", "alert.jsx (inline errors)", "progress.jsx (rate limit bar)", "skeleton.jsx (loading placeholder)", "tooltip.jsx (mode descriptions)", "badge.jsx (mode tags)", "card.jsx", "separator.jsx", "tabs.jsx (optional for pages on mobile)"]
    },
    "key_ui_patterns": {
      "mode_selector": {
        "pattern": "6-option segmented grid (2 columns on mobile, 3 on md+) using Button variant=secondary for unselected and custom 'selected' style.",
        "selected_style": "bg-[var(--primary)] text-[var(--primary-contrast)] border-[var(--primary)]",
        "unselected_style": "bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--text-3)]",
        "microcopy": "Add one-line helper under grid: 'Pick a tone. Custom lets you describe your vibe.'"
      },
      "conversation_input": {
        "pattern": "Large textarea card with header row: label left, counter right (mono).",
        "counter": "text-xs font-mono text-[var(--text-3)]",
        "limit_behavior": "At >1800 chars, counter turns warning color; at limit disable Generate and show inline Alert."
      },
      "reply_output": {
        "pattern": "Output card with top action row: Copy (primary), Regenerate (secondary). Reply text in readable block with comfortable line-height.",
        "copy_feedback": "Use sonner toast: 'Copied to clipboard'. Also change Copy button label to 'Copied' for 1.2s."
      },
      "rate_limit": {
        "pattern": "Compact status strip under Generate button: 'Requests left: 7/10' + Progress bar.",
        "classes": "mt-3 flex items-center justify-between gap-3 text-xs text-[var(--text-3)]",
        "progress": "Use progress.jsx with value=(used/limit*100). Keep bar height 6px, rounded."
      }
    }
  },
  "buttons": {
    "selection": "Professional / Corporate",
    "tokens": {
      "--btn-radius": "12px",
      "--btn-height": "44px",
      "--btn-font": "500",
      "--btn-shadow": "none (flat)",
      "--btn-motion": "transition-colors duration-150"
    },
    "variants": {
      "primary": {
        "classes": "bg-[var(--primary)] text-[var(--primary-contrast)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-pressed)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        "data_testid_examples": ["generate-reply-button", "copy-reply-button", "download-extension-button"]
      },
      "secondary": {
        "classes": "bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--text-3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        "data_testid_examples": ["regenerate-reply-button", "mode-select-button"]
      },
      "ghost": {
        "classes": "bg-transparent text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        "data_testid_examples": ["navbar-how-it-works-link", "navbar-get-extension-link"]
      }
    }
  },
  "page_blueprints": {
    "home_generator": {
      "hero": {
        "headline": "Reply smarter. Every time.",
        "subhead": "Paste a conversation, pick a tone, get a reply you can send in seconds.",
        "layout": "Hero left-aligned; keep it compact (no huge marketing blocks)."
      },
      "main": {
        "desktop_layout": "lg:grid lg:grid-cols-2 lg:gap-6",
        "left_column": ["Conversation input card", "Mode selector", "Custom tone input (conditional)", "Generate button + rate limit"],
        "right_column": ["Reply output card (empty state → loading → result)"]
      },
      "empty_state": {
        "copy": "Paste a chat to get started.",
        "style": "Muted text + subtle border-dashed container inside output card. No illustrations needed."
      },
      "loading_state": {
        "pattern": "Disable inputs + show Skeleton lines in output + small spinner inside Generate button.",
        "note": "Keep motion minimal; prefer opacity pulse on skeleton."
      },
      "errors": {
        "pattern": "Inline Alert above Generate button + toast for transient errors.",
        "friendly_messages": [
          "That’s a bit too long—trim the chat to 2000 characters.",
          "We hit the rate limit. Try again in a moment.",
          "Something went wrong generating a reply. Please retry."
        ]
      }
    },
    "how_it_works": {
      "layout": "Centered container but left-aligned text blocks. Use 3 cards in a column (mobile) → 3 columns (md+).",
      "steps": [
        {"title": "Paste your chat", "desc": "Drop the conversation you want to reply to."},
        {"title": "Pick your mode", "desc": "Flirty, funny, professional—or define your own tone."},
        {"title": "Copy your reply", "desc": "One click to copy. Regenerate if you want options."}
      ],
      "icons": {
        "library": "lucide-react",
        "suggested": ["Clipboard", "Sparkles", "Copy"]
      }
    },
    "get_extension": {
      "layout": "Two blocks: (1) Download CTA card, (2) Step-by-step install list.",
      "download_card": "Primary button + small note about permissions + privacy.",
      "steps_component": "Use ordered list inside Card; optionally Accordion for troubleshooting.",
      "steps": [
        "Download the extension (.zip).",
        "Open Chrome → chrome://extensions.",
        "Enable Developer mode.",
        "Click 'Load unpacked' and select the folder.",
        "Pin ReplyAI for quick access."
      ]
    }
  },
  "micro_interactions": {
    "rules": [
      "No complex animations; keep it snappy.",
      "Use transition-colors only (no transition: all).",
      "Buttons: active scale-\"[0.98]\" optional but keep subtle.",
      "Mode buttons: selected state snaps instantly; hover only changes border + text color.",
      "Copy: toast + temporary label change."
    ],
    "tailwind_snippets": {
      "button_motion": "transition-colors duration-150",
      "press": "active:translate-y-[1px]",
      "focus": "focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
    }
  },
  "accessibility": {
    "contrast": "Ensure text-[var(--text)] on bg/surface meets WCAG AA. Keep muted text only for secondary info.",
    "focus_states": "Always visible focus ring using --focus; never rely on color alone.",
    "keyboard": "Mode selector must be keyboard reachable; Enter triggers Generate when textarea focused (optional).",
    "aria": "Add aria-labels for icon-only buttons; announce copy success via toast."
  },
  "testing_attributes": {
    "rule": "All interactive and key informational elements MUST include data-testid in kebab-case.",
    "required_examples": [
      "data-testid=\"conversation-textarea\"",
      "data-testid=\"conversation-char-counter\"",
      "data-testid=\"mode-flirty-button\"",
      "data-testid=\"mode-custom-input\"",
      "data-testid=\"generate-reply-button\"",
      "data-testid=\"reply-output\"",
      "data-testid=\"copy-reply-button\"",
      "data-testid=\"regenerate-reply-button\"",
      "data-testid=\"rate-limit-remaining\"",
      "data-testid=\"error-alert\""
    ]
  },
  "image_urls": {
    "note": "This product can be image-free for speed and minimalism. If you want one visual, use a single tiny logo mark or a simple SVG icon—no photos required.",
    "categories": []
  },
  "libraries": {
    "recommended": [
      {
        "name": "lucide-react",
        "why": "Clean icons for steps + buttons; avoids emoji icons.",
        "install": "npm i lucide-react",
        "usage": "import { Sparkles, Copy, Clipboard } from 'lucide-react'"
      },
      {
        "name": "sonner",
        "why": "Toasts for copy + errors (already present via shadcn sonner component).",
        "install": "(already in repo if /components/ui/sonner.jsx exists)",
        "usage": "import { toast } from 'sonner'"
      }
    ]
  },
  "instructions_to_main_agent": [
    "Implement dark theme by default: add class 'dark' on <html> or <body> and set tokens accordingly.",
    "Remove CRA default centered header styles from App.css; do not center the whole app.",
    "Use shadcn/ui .jsx components already in /src/components/ui for Button/Input/Textarea/Card/Alert/Progress/Skeleton/Sonner.",
    "Replace emoji mode labels with text + lucide icons (no emoji icons per guidelines). Keep tone names: Flirty, Funny, Professional, Roast, Savage, Custom.",
    "No gradients, no glassmorphism, no transparent surfaces. Borders + spacing create structure.",
    "Every interactive element must include data-testid (kebab-case).",
    "Keep pages lightweight: no heavy animation libs required."
  ],
  "general_ui_ux_design_guidelines_appendix": "<General UI UX Design Guidelines>  \n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}
