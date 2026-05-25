// Content script - Extracts last 6 messages from chat platforms
(function() {
  'use strict';

  // Configuration for different platforms
  const PLATFORMS = {
    whatsapp: {
      hostname: 'web.whatsapp.com',
      selectors: {
        messages: '[data-pre-plain-text], ._ao3e, .message-in, .message-out',
        messageText: 'span.selectable-text, ._ao3e'
      }
    },
    instagram: {
      hostname: 'www.instagram.com',
      selectors: {
        messages: '[role="row"] div[dir="auto"]',
        messageText: 'span'
      }
    },
    discord: {
      hostname: 'discord.com',
      selectors: {
        messages: '[class*="messageContent"], [class*="contents"]',
        messageText: 'div'
      }
    },
    telegram: {
      hostname: 'web.telegram.org',
      selectors: {
        messages: '.message, .Message',
        messageText: '.text, .message-text'
      }
    }
  };

  // Detect current platform
  function detectPlatform() {
    const hostname = window.location.hostname;
    for (const [platform, config] of Object.entries(PLATFORMS)) {
      if (hostname.includes(config.hostname)) {
        return config;
      }
    }
    return null;
  }

  // Extract messages from the page
  function extractMessages(platform) {
    try {
      const messageElements = document.querySelectorAll(platform.selectors.messages);
      const messages = [];
      
      // Get last 6 messages
      const startIndex = Math.max(0, messageElements.length - 6);
      
      for (let i = startIndex; i < messageElements.length; i++) {
        const element = messageElements[i];
        let text = '';
        
        // Try to extract text content
        if (platform.selectors.messageText) {
          const textElement = element.querySelector(platform.selectors.messageText);
          text = textElement ? textElement.textContent.trim() : element.textContent.trim();
        } else {
          text = element.textContent.trim();
        }
        
        if (text && text.length > 0) {
          // Clean up the text
          text = text.replace(/\s+/g, ' ').trim();
          messages.push(text);
        }
      }
      
      return messages.slice(-6); // Ensure only last 6
    } catch (error) {
      console.error('ReplyAI: Error extracting messages:', error);
      return [];
    }
  }

  // Main function to extract and store context
  function extractContext() {
    const platform = detectPlatform();
    
    if (!platform) {
      console.log('ReplyAI: No supported platform detected');
      window._replyai_context = null;
      return;
    }
    
    const messages = extractMessages(platform);
    
    if (messages.length > 0) {
      // Join messages with newlines
      const context = messages.join('\n');
      window._replyai_context = context;
      console.log(`ReplyAI: Extracted ${messages.length} messages`);
    } else {
      console.log('ReplyAI: No messages found');
      window._replyai_context = null;
    }
  }

  // Extract context on load
  extractContext();

  // Re-extract context when DOM changes (new messages)
  const observer = new MutationObserver(() => {
    extractContext();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('ReplyAI: Content script loaded');
})();
