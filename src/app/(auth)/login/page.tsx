'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { toast } from 'sonner';

const page = () => {
  const handleClick = () => {
    toast('Hello, world!');
    // You can also add other logic here
  };
  return (
    <div className="text-secondary">
      <Button type="button" onClick={handleClick}>
        Login
      </Button>
    </div>
  );
};

export default page;
