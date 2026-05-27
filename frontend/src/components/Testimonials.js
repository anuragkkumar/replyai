import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Marketing Manager',
    text: 'ReplyAI saved me hours on LinkedIn. The professional mode is perfect for networking!',
    avatar: '👩‍💼'
  },
  {
    name: 'Raj Patel',
    role: 'College Student',
    text: 'The flirty mode is a game-changer for dating apps. My matches actually respond now 😂',
    avatar: '👨‍🎓'
  },
  {
    name: 'Emily Chen',
    role: 'Content Creator',
    text: 'I use the funny mode for Instagram DMs. My engagement is through the roof!',
    avatar: '👩‍🎨'
  }
];

const Testimonials = () => {
  const navigate = useNavigate();

  return (
    <div className="py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        Loved by thousands of users
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">{testimonial.avatar}</div>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-xs text-[var(--text-3)]">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-sm text-[var(--text-2)]">{testimonial.text}</p>
          </Card>
        ))}
      </div>
      
      {/* Try it Now Button */}
      <div className="text-center mt-12">
        <Button
          onClick={() => navigate('/generator')}
          className="h-14 px-8 bg-[var(--primary)] text-[var(--primary-contrast)] hover:bg-[var(--primary-hover)] text-lg font-semibold rounded-[12px]"
          data-testid="try-now-button"
        >
          Try it Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Testimonials;
