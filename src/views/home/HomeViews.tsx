'use client'

import GridViewDocsList from '@/components/GridViewDocsList/GridViewDocsList';
import { PublicService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

function HomeViews() {

  const documents = useQuery(["documents"], () => PublicService.Documents.getAll({
    isArchived: false,
    limit: 1000,
    page: 1,
    title: "",
    isNotify: false
  }))

  return (
    <div className='bg-gray-200 dark:bg-gray-700 dark:text-white pt-4 pb-16 min-h-screen'>
      <h1 className='text-center text-2xl font-light mb-8'>Daftar Dokumen Terpublikasi</h1>
      <GridViewDocsList documents={documents?.data?.data} />
    </div>
  );
}

export default HomeViews;