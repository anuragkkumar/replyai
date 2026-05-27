import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Lock, Clock } from 'lucide-react';
import Footer from '../components/Footer';

const BlogPage = () => {
  const posts = [
    {
      id: 1,
      title: 'How AI is changing the way we communicate',
      excerpt: 'Explore how artificial intelligence is revolutionizing digital communication and transforming the way we interact online.',
      readTime: '5 min read',
      date: 'Dec 15, 2025',
    },
    {
      id: 2,
      title: 'The psychology behind perfect replies',
      excerpt: 'Discover the science and psychology that makes certain replies more effective and engaging than others.',
      readTime: '3 min read',
      date: 'Dec 10, 2025',
    },
    {
      id: 3,
      title: 'Building ReplyAI — our story',
      excerpt: 'Learn about our journey building ReplyAI, the challenges we faced, and the lessons we learned along the way.',
      readTime: '7 min read',
      date: 'Dec 5, 2025',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-xl text-[var(--text-2)] max-w-2xl mx-auto">
            Thoughts on AI, communication, and technology
          </p>
        </div>

        {/* Blog Posts Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card 
                key={post.id}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 hover:border-[var(--primary)]/50 transition-all flex flex-col"
                data-testid={`blog-card-${post.id}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-3)] mb-3">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-[var(--text-2)] text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
                
                <Button
                  disabled
                  className="w-full bg-[var(--surface-2)] text-[var(--text-3)] cursor-not-allowed opacity-60 mt-auto"
                  data-testid={`read-button-${post.id}`}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Coming Soon 🔒
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
