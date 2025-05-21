interface Message {
  text: string;
  isUser: boolean;
}

const suggestions = [
  'How can I track my order?',
  'Tell me about your products',
  'What are your business hours?',
  'Do you offer international shipping?',
  'Can I get a refund?',
  'What payment methods do you accept?',
  'How do I contact customer support?',
  'Are there any ongoing promotions?',
  'How can I change my delivery address?',
  'What\'s your privacy policy?',
  'Can I modify my order?',
  'Do you have a loyalty program?',
  'What\'s your return policy?',
  'How do I create an account?',
  'What\'s new in your fashion collection?',
  'Tell me about your food menu',
  'Do you offer interior design services?',
  'What\'s trending in home decor?',
  'Are there any seasonal fashion deals?',
  'What cuisines do you specialize in?',
  'Can you help with room styling?',
  'Do you have sustainable fashion options?'
];

const predefinedResponses: { [key: string]: string } = {
  "track": "Simply head to your account dashboard and click on the \"Orders\" tab to see live updates on your package location and estimated delivery time.",
  "product": "We've got an amazing selection waiting for you! From cutting-edge electronics to trendy fashion and stylish home essentials - what catches your interest?",
  "hours": "Need help? Our support team is here 24/7! Store locations welcome you Monday-Friday (9 AM-8 PM) and weekends (10 AM-6 PM).",
  "shipping": "Great news! We deliver worldwide to over 100 countries. Delivery fees and timelines are calculated based on your location.",
  "refund": "No worries! Returns are hassle-free within 30 days - just keep items unused in original packaging. Your refund will be processed in 5-7 business days after we receive it.",
  "payment": "Shopping made easy! Use any major card (Visa, MasterCard, AmEx), PayPal, or Apple Pay. Want to split payments? Try our Klarna option!",
  "contact": "We're just a message away! Drop us an email at support@example.com, call 1-800-123-4567, or chat with us right here.",
  "promotion": "Don't miss out! Enjoy 20% off electronics, free shipping on $50+ orders, plus exclusive newcomer discounts!",
  "fashion": "Step into style! Browse our designer collection featuring everything from casual cool to formal elegance, available in sizes XS to XXL.",
  "food": "Savor the flavors! From authentic Italian pasta to innovative Asian fusion, we craft each dish with fresh, locally-sourced ingredients.",
  "interior": "Transform your space! Our design experts offer personalized consultation, stunning 3D previews, and complete styling solutions for any aesthetic.",
  "decor": "Make your space uniquely yours! Discover our curated collection of modern art, designer furniture, and custom-made pieces that reflect your style.",
  "sustainable": "Look good, feel good! Our eco-friendly fashion features organic cotton and recycled materials, proving style can be sustainable.",
  "cuisine": "Experience culinary excellence! Our expert chefs craft authentic Mediterranean, Asian, and Continental dishes using premium ingredients.",
  "room": "Create your dream space! We'll help with everything from color schemes to furniture layout, lighting design, and those perfect finishing touches."
};

class ChatApp {
  private chatContainer: HTMLElement;
  private suggestionsContainer: HTMLElement;
  private messageInput: HTMLInputElement;
  private sendButton: HTMLElement;
  private messages: Message[] = [];

  constructor() {
    this.chatContainer = document.getElementById('chatContainer') as HTMLElement;
    this.suggestionsContainer = document.getElementById('suggestions') as HTMLElement;
    this.messageInput = document.getElementById('messageInput') as HTMLInputElement;
    this.sendButton = document.getElementById('sendButton') as HTMLElement;
    this.initialize();
  }

  private initialize() {
    this.renderSuggestions();
    this.setupEventListeners();
  }

  private updateSuggestions(newSuggestions: string[]) {
    this.renderSuggestions(newSuggestions);
  }

  private setupEventListeners() {
    this.sendButton.addEventListener('click', () => this.handleSend());
    this.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSend();
    });
  }

  private renderSuggestions(customSuggestions?: string[]) {
    this.suggestionsContainer.innerHTML = '';
    (customSuggestions || suggestions).forEach(suggestion => {
      const chip = document.createElement('div');
      chip.className = 'suggestion-chip';
      chip.textContent = suggestion;
      chip.addEventListener('click', () => {
        this.messageInput.value = suggestion;
      });
      this.suggestionsContainer.appendChild(chip);
    });
  }

  private async handleSend() {
    const input = this.messageInput.value.trim();
    if (!input) return;

    this.addMessage({ text: input, isUser: true });
    this.messageInput.value = '';

    let responseText = 'I understand your query. Let me help you with that...';
let followUpSuggestions: string[] = [];
    const lowercaseInput = input.toLowerCase();
    
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowercaseInput.includes(keyword)) {
        responseText = response;
        break;
      }
    }

    this.addMessage({ text: responseText, isUser: false });

    // Add contextual follow-up suggestions based on the current query
    if (lowercaseInput.includes('track')) {
      followUpSuggestions = ['Can I modify my delivery address?', 'What\'s the estimated delivery time?'];
    } else if (lowercaseInput.includes('product')) {
      followUpSuggestions = ['What\'s your return policy?', 'Do you offer warranties?'];
    } else if (lowercaseInput.includes('refund')) {
      followUpSuggestions = ['How long does the refund process take?', 'Can I exchange instead of refund?'];
    } else if (lowercaseInput.includes('fashion')) {
      followUpSuggestions = ['Do you have sustainable fashion options?', 'Are there any seasonal fashion deals?'];
    } else if (lowercaseInput.includes('food') || lowercaseInput.includes('cuisine')) {
      followUpSuggestions = ['What cuisines do you specialize in?', 'Do you have dietary options?'];
    } else if (lowercaseInput.includes('interior') || lowercaseInput.includes('decor')) {
      followUpSuggestions = ['Can you help with room styling?', 'Do you offer design consultation?'];
    }

    if (followUpSuggestions.length > 0) {
      this.updateSuggestions(followUpSuggestions);
    }
  }

  private addMessage(message: Message) {
    this.messages.push(message);
    this.renderMessage(message);
    this.scrollToBottom();
  }

  private renderMessage(message: Message) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${message.isUser ? 'user' : ''}`;

    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = message.text;

    messageElement.appendChild(content);
    this.chatContainer.appendChild(messageElement);
  }

  private scrollToBottom() {
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }
}

// Initialize the chat application
new ChatApp();
