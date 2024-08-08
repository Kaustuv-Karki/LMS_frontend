import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <h1 className="text-[3rem] ">This is the text</h1>
      <Button>Click here</Button>
    </main>
  );
}
