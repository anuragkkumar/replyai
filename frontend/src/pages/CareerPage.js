import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Lock, Briefcase, Clock, MapPin } from 'lucide-react';
import Footer from '../components/Footer';

const CareerPage = () => {
  const jobs = [
    {
      id: 1,
      title: '🚀 Full Stack Engineer',
      description: 'Build scalable web applications with modern tech stack. Work on both frontend and backend systems.',
      location: 'Remote',
      type: 'Full-time',
      experience: '0+ years (new grads ok)',
    },
    {
      id: 2,
      title: '🎨 UI/UX Designer',
      description: 'Design beautiful and intuitive user interfaces. Create engaging user experiences for our products.',
      location: 'Remote',
      type: 'Part-time',
      experience: '0+ years',
    },
    {
      id: 3,
      title: '📱 React Native Developer',
      description: 'Build cross-platform mobile applications. Work with cutting-edge mobile technologies.',
      location: 'Remote',
      type: 'Full-time',
      experience: '1+ years',
    },
    {
      id: 4,
      title: '📣 Marketing Intern',
      description: 'Help grow our brand presence. Work on content creation, social media, and growth strategies.',
      location: 'Remote',
      type: 'Part-time',
      experience: '0+ years (current students preferred)',
      note: 'Performance-based',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16 sm:py-20 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            We are hiring
          </h1>
          <p className="text-xl text-[var(--text-2)] max-w-2xl mx-auto">
            We are building the future of AI-powered communication. Join us!
          </p>
        </div>

        {/* Open Positions Section */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pb-20">
          <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
          
          <div className="grid gap-6">
            {jobs.map((job) => (
              <Card 
                key={job.id}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 hover:border-[var(--primary)]/50 transition-all"
                data-testid={`job-card-${job.id}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
                    <p className="text-[var(--text-2)] mb-4">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center gap-1.5 text-[var(--text-3)]">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[var(--text-3)]">
                        <Clock className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[var(--text-3)]">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.experience}</span>
                      </div>
                    </div>
                    
                    {job.note && (
                      <div className="mt-2">
                        <span className="inline-block px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-xs rounded-full">
                          {job.note}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="lg:ml-6">
                    <Button
                      disabled
                      className="w-full lg:w-auto bg-[var(--surface-2)] text-[var(--text-3)] cursor-not-allowed opacity-60"
                      data-testid={`apply-button-${job.id}`}
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Coming Soon 🔒
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CareerPage;
