'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';

interface StaffProfile {
  id: string;
  name: string;
  skills: string[];
  rating: number;
  reviews: number;
  kycStatus: 'verified' | 'pending' | 'unverified';
  hourlyRate: number;
  location: string;
}

export default function StaffMarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');

  const staffProfiles: StaffProfile[] = [
    {
      id: '1',
      name: 'Priya Nair',
      skills: ['Hair Styling', 'Coloring', 'Haircut'],
      rating: 4.8,
      reviews: 45,
      kycStatus: 'verified',
      hourlyRate: 800,
      location: 'Mumbai',
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      skills: ['Massage', 'Spa Therapy'],
      rating: 4.6,
      reviews: 32,
      kycStatus: 'verified',
      hourlyRate: 600,
      location: 'Delhi',
    },
    {
      id: '3',
      name: 'Anita Desai',
      skills: ['Facial', 'Skincare'],
      rating: 4.9,
      reviews: 67,
      kycStatus: 'pending',
      hourlyRate: 700,
      location: 'Bangalore',
    },
  ];

  const skills = ['all', 'Hair Styling', 'Massage', 'Facial', 'Nail Care'];

  const filteredStaff = staffProfiles.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSkill = selectedSkill === 'all' || staff.skills.includes(selectedSkill);
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-[var(--surface)] px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Staff Marketplace</h1>

        {/* Search & Filters */}
        <Card variant="outlined" className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or skills..."
              className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
            />
            <div className="flex gap-2">
              {skills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => setSelectedSkill(skill)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors min-h-[44px] capitalize ${
                    selectedSkill === skill
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--surface-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Staff Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStaff.map((staff) => (
            <Card key={staff.id} variant="outlined" className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">{staff.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{staff.location}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    staff.kycStatus === 'verified'
                      ? 'bg-[var(--success)]/20 text-[var(--success)]'
                      : staff.kycStatus === 'pending'
                      ? 'bg-[var(--warning)]/20 text-[var(--warning)]'
                      : 'bg-[var(--error)]/20 text-[var(--error)]'
                  }`}
                >
                  {staff.kycStatus}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="font-semibold text-[var(--text-primary)]">{staff.rating}</span>
                  <span className="text-sm text-[var(--text-secondary)]">({staff.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {staff.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-full text-xs bg-[var(--primary)]/20 text-[var(--primary)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                <div>
                  <p className="text-xs text-[var(--text-secondary)]">Hourly Rate</p>
                  <p className="font-semibold text-[var(--text-primary)]">₹{staff.hourlyRate}/hr</p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
                >
                  View Profile
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

