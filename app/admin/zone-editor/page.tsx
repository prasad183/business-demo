'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';

interface Room {
  id: string;
  name: string;
  type: 'room' | 'chair';
  x: number;
  y: number;
  amenities: string[];
  capacity: number;
  genderOnly?: 'male' | 'female';
  cleaningBuffer: number;
}

export default function ZoneEditorPage() {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      name: 'Room 1',
      type: 'room',
      x: 100,
      y: 100,
      amenities: ['Steam', 'Music'],
      capacity: 1,
      cleaningBuffer: 15,
    },
    {
      id: '2',
      name: 'Chair 1',
      type: 'chair',
      x: 200,
      y: 100,
      amenities: [],
      capacity: 1,
      cleaningBuffer: 10,
    },
  ]);

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [amenitiesJson, setAmenitiesJson] = useState('');

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setAmenitiesJson(JSON.stringify(room.amenities, null, 2));
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Zones / Rooms / Chairs Editor</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas */}
          <div className="lg:col-span-2">
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Visual Editor</h2>
              <div className="relative h-[600px] bg-[var(--surface-light)] rounded-lg border-2 border-[var(--border)] overflow-hidden">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => handleRoomClick(room)}
                    className={`absolute cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      selectedRoom?.id === room.id
                        ? 'border-[var(--primary)] bg-[var(--primary)]/20'
                        : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50'
                    }`}
                    style={{
                      left: `${room.x}px`,
                      top: `${room.y}px`,
                      minWidth: room.type === 'room' ? '120px' : '80px',
                    }}
                  >
                    <p className="font-medium text-[var(--text-primary)] text-sm">{room.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{room.type}</p>
                  </div>
                ))}
                <p className="absolute bottom-4 left-4 text-sm text-[var(--text-muted)]">
                  Click and drag to place rooms/chairs
                </p>
              </div>
            </Card>

            {/* Usage View */}
            <Card variant="outlined" className="p-6 mt-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Usage View</h2>
              <div className="grid grid-cols-4 gap-4">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`p-4 rounded-lg border-2 ${
                      Math.random() > 0.5
                        ? 'border-[var(--success)] bg-[var(--success)]/10'
                        : 'border-[var(--error)] bg-[var(--error)]/10'
                    }`}
                  >
                    <p className="font-medium text-[var(--text-primary)] text-sm mb-1">{room.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {Math.random() > 0.5 ? 'Free' : 'Busy'}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Properties Panel */}
          <div>
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Properties</h2>
              {selectedRoom ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Name</label>
                    <input
                      type="text"
                      value={selectedRoom.name}
                      onChange={(e) => {
                        setSelectedRoom({ ...selectedRoom, name: e.target.value });
                        setRooms(rooms.map((r) => (r.id === selectedRoom.id ? { ...selectedRoom, name: e.target.value } : r)));
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Type</label>
                    <select
                      value={selectedRoom.type}
                      onChange={(e) => {
                        const updated = { ...selectedRoom, type: e.target.value as 'room' | 'chair' };
                        setSelectedRoom(updated);
                        setRooms(rooms.map((r) => (r.id === selectedRoom.id ? updated : r)));
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                    >
                      <option value="room">Room</option>
                      <option value="chair">Chair</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Capacity</label>
                    <input
                      type="number"
                      value={selectedRoom.capacity}
                      onChange={(e) => {
                        const updated = { ...selectedRoom, capacity: parseInt(e.target.value) };
                        setSelectedRoom(updated);
                        setRooms(rooms.map((r) => (r.id === selectedRoom.id ? updated : r)));
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Gender Only (Optional)
                    </label>
                    <select
                      value={selectedRoom.genderOnly || ''}
                      onChange={(e) => {
                        const updated = { ...selectedRoom, genderOnly: e.target.value as 'male' | 'female' | undefined };
                        setSelectedRoom(updated);
                        setRooms(rooms.map((r) => (r.id === selectedRoom.id ? updated : r)));
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                    >
                      <option value="">None</option>
                      <option value="male">Male Only</option>
                      <option value="female">Female Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Cleaning Buffer (minutes)
                    </label>
                    <input
                      type="number"
                      value={selectedRoom.cleaningBuffer}
                      onChange={(e) => {
                        const updated = { ...selectedRoom, cleaningBuffer: parseInt(e.target.value) };
                        setSelectedRoom(updated);
                        setRooms(rooms.map((r) => (r.id === selectedRoom.id ? updated : r)));
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Amenities (JSON)
                    </label>
                    <textarea
                      value={amenitiesJson}
                      onChange={(e) => {
                        setAmenitiesJson(e.target.value);
                        try {
                          const parsed = JSON.parse(e.target.value);
                          const updated = { ...selectedRoom, amenities: parsed };
                          setSelectedRoom(updated);
                          setRooms(rooms.map((r) => (r.id === selectedRoom.id ? updated : r)));
                        } catch (e) {
                          // Invalid JSON, keep as is
                        }
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[100px] font-mono text-sm"
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <p className="text-[var(--text-muted)]">Select a room or chair to edit properties</p>
              )}
            </Card>

            <Card variant="outlined" className="p-6 mt-6">
              <button
                type="button"
                className="w-full px-4 py-3 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-semibold hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
                onClick={() => {
                  const newRoom: Room = {
                    id: Date.now().toString(),
                    name: `Room ${rooms.length + 1}`,
                    type: 'room',
                    x: 50,
                    y: 50,
                    amenities: [],
                    capacity: 1,
                    cleaningBuffer: 15,
                  };
                  setRooms([...rooms, newRoom]);
                }}
              >
                Add Room/Chair
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

